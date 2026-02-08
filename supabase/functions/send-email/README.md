# Email Service Edge Function

This is a Supabase Edge Function that handles sending emails for the Aarunya MITS registration system.

## Deployment Instructions

1. **Deploy to Supabase:**
   ```bash
   cd supabase/functions/send-email
   supabase functions deploy send-email
   ```

2. **Set Environment Variables in Supabase:**
   - Go to your Supabase dashboard
   - Navigate to Settings > Config
   - Add the following environment variables:
     - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
     - `GOOGLE_REFRESH_TOKEN`: Your Google OAuth refresh token
     - `GOOGLE_EMAIL`: Your Gmail address for sending emails

3. **Configure Google OAuth:**
   - Go to Google Cloud Console
   - Create a new project or select existing one
   - Enable Gmail API
   - Create OAuth 2.0 credentials
   - Set authorized redirect URI to your Supabase project
   - Generate refresh token using OAuth 2.0 Playground

4. **Update Frontend .env:**
   - Update `VITE_EMAIL_API_URL` with your deployed function URL
   - Update `VITE_EMAIL_API_KEY` with your Supabase anon key

## Email Services Integration

To integrate with a real email service, replace the placeholder logic in the function with one of these options:

### Option 1: SendGrid
```typescript
import { sendgrid } from 'https://deno.land/x/sendgrid/mod.ts';

const response = await sendgrid.send({
  to: body.to,
  from: 'noreply@aarunyamits.com',
  subject: body.subject,
  html: emailTemplate
});
```

### Option 2: Nodemailer with SMTP
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: Deno.env.get('SMTP_HOST'),
  port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
  secure: false,
  auth: {
    user: Deno.env.get('SMTP_USER'),
    pass: Deno.env.get('SMTP_PASS')
  }
});

await transporter.sendMail({
  from: Deno.env.get('FROM_EMAIL'),
  to: body.to,
  subject: body.subject,
  html: emailTemplate
});
```

### Option 3: AWS SES
```typescript
import { SESClient, SendEmailCommand } from 'https://deno.land/x/aws_sdk@v3.528.0/client-ses/mod.ts';

const ses = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID')!,
    secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!
  }
});

const command = new SendEmailCommand({
  Source: Deno.env.get('FROM_EMAIL'),
  Destination: { ToAddresses: [body.to] },
  Message: {
    Subject: { Data: body.subject },
    Body: { Html: { Data: emailTemplate } }
  }
});

await ses.send(command);
```

## API Usage

```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/send-email' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your-anon-key' \
  -d '{
    "to": "user@mitsgwl.ac.in",
    "subject": "Your Aarunya E-Pass",
    "template": "epass",
    "data": {
      "name": "John Doe",
      "enrollment_no": "MITS/2024/001",
      "events": [
        {"event_name": "Tech Symposium", "club_name": "Computer Science Club"},
        {"event_name": "Coding Competition", "club_name": "Programming Club"}
      ],
      "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    }
  }'
```

## Security Notes

- Always use environment variables for sensitive data
- Validate all input data
- Use proper CORS settings
- Implement rate limiting if needed
- Monitor function usage and costs