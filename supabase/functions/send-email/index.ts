import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface EmailRequest {
    to: string;
    subject: string;
    template: string;
    data: {
        name: string;
        enrollment_no: string;
        events: any[];
        qr_code: string;
    };
}

serve(async (req: Request) => {
    try {
        // Get the request body
        const body: EmailRequest = await req.json();

        // Validate required fields
        if (!body.to || !body.subject || !body.template || !body.data) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Email template for e-pass
        const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Aarunya E-Pass</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            background: #05010D;
            color: #fff;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(to bottom, #1a0a2e, #0d0520);
            border: 2px solid #ff00ff;
            box-shadow: inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff;
            padding: 30px;
            position: relative;
            overflow: hidden;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px dashed #ff00ff;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff;
            font-size: 24px;
            margin: 0;
            text-transform: uppercase;
          }
          .content {
            line-height: 1.6;
            font-size: 14px;
          }
          .highlight {
            color: #ff00ff;
            font-weight: bold;
            text-shadow: 0 0 10px #ff00ff;
          }
          .qr-section {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid #00ffff;
            border-radius: 8px;
          }
          .qr-code {
            max-width: 200px;
            margin: 0 auto;
            background: white;
            padding: 10px;
          }
          .events-list {
            background: rgba(255, 0, 255, 0.1);
            border: 1px solid #ff00ff;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #00ffff;
            text-align: center;
            border-top: 1px dashed #ff00ff;
            padding-top: 20px;
          }
          .scan-note {
            font-size: 12px;
            color: #ff00ff;
            text-align: center;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Aarunya MITS E-Pass</h1>
            <p style="color: #00ffff; margin: 0;">Your Registration is Complete!</p>
          </div>
          
          <div class="content">
            <p>Hello <span class="highlight">${body.data.name}</span>,</p>
            
            <p>Congratulations! You have successfully registered for Aarunya MITS events. Your enrollment number is <span class="highlight">${body.data.enrollment_no}</span>.</p>
            
            <div class="events-list">
              <h3 style="color: #00ffff; margin-top: 0;">Events Registered:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${body.data.events.map(event => `<li>${event.event_name} by ${event.club_name}</li>`).join('')}
              </ul>
            </div>
            
            <div class="qr-section">
              <h3 style="color: #00ffff;">Your E-Pass QR Code</h3>
              <div class="qr-code">
                <img src="${body.data.qr_code}" alt="E-Pass QR Code" style="width: 100%; height: auto;" />
              </div>
              <p class="scan-note">Scan this QR code at the event venue for entry</p>
            </div>
            
            <p><strong>Important Instructions:</strong></p>
            <ul>
              <li>Keep this email for your records</li>
              <li>Present your QR code at the event registration desk</li>
              <li>Arrive at least 15 minutes before your event starts</li>
              <li>Carry your MITS ID card for verification</li>
            </ul>
            
            <p style="color: #00ffff;">We look forward to seeing you at Aarunya MITS!</p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Aarunya MITS Team</p>
            <p style="font-size: 10px; color: #666;">This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Configure Nodemailer with Google OAuth2
        const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
        const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
        const refreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');
        const userEmail = Deno.env.get('GOOGLE_EMAIL');

        if (!clientId || !clientSecret || !refreshToken || !userEmail) {
            return new Response(
                JSON.stringify({
                    error: 'Email service not configured properly',
                    details: 'Missing Google OAuth credentials'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Create OAuth2 access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return new Response(
                JSON.stringify({
                    error: 'Failed to obtain OAuth2 access token',
                    details: tokenData
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Send email using Gmail API
        const emailData = {
            to: body.to,
            from: userEmail,
            subject: body.subject,
            html: emailTemplate,
            attachments: [
                {
                    filename: `aarunya-epass-${body.data.enrollment_no}.png`,
                    content: body.data.qr_code.replace(/^data:image\/\w+;base64,/, ''),
                    encoding: 'base64'
                }
            ]
        };

        // Create RFC 2822 compliant email message
        const message = [
            `To: ${emailData.to}`,
            `From: ${userEmail}`,
            `Subject: ${emailData.subject}`,
            'Content-Type: multipart/mixed; boundary="boundary123"',
            '',
            '--boundary123',
            'Content-Type: text/html; charset="UTF-8"',
            'Content-Transfer-Encoding: 7bit',
            '',
            emailData.html,
            '--boundary123',
            `Content-Type: image/png; name="aarunya-epass-${body.data.enrollment_no}.png"`,
            'Content-Transfer-Encoding: base64',
            `Content-Disposition: attachment; filename="aarunya-epass-${body.data.enrollment_no}.png"`,
            '',
            emailData.attachments[0].content,
            '--boundary123--'
        ].join('\r\n');

        // Encode message to base64
        const encodedMessage = btoa(message);

        // Send email via Gmail API
        const gmailResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/messages/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodedMessage
            })
        });

        const gmailResult = await gmailResponse.json();

        if (!gmailResponse.ok) {
            return new Response(
                JSON.stringify({
                    error: 'Failed to send email via Gmail API',
                    details: gmailResult
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Email sent successfully',
                email: body.to,
                subject: body.subject,
                messageId: gmailResult.id
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error processing email request:', error);

        return new Response(
            JSON.stringify({
                error: 'Failed to process email request',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
});
