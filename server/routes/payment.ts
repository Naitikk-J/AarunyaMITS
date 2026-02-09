import express, { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import transporter from '../config/mailer';
import { generateRegistrationEmail } from '../utils/emailTemplate';

const router = express.Router();

// Initialize Razorpay only if keys are available
let razorpay: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

router.post('/create-order', async (req: Request, res: Response) => {
    try {
        if (!razorpay) {
            return res.status(503).json({ message: 'Payment service not configured' });
        }

        const { amount, currency } = req.body;
        const options = { amount, currency, receipt: `receipt_order_${Date.now()}` };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
});

router.post('/verify-payment', async (req: Request, res: Response) => {
    try {
        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(503).json({ message: 'Payment service not configured' });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest === razorpay_signature) {
            // @ts-ignore
            const user = req.user;

            // Send email
            try {
                const { htmlContent, textContent } = generateRegistrationEmail(user.name, user.aarunyaId);

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                    to: user.email,
                    subject: 'Welcome to AARUNYA - Payment Successful!',
                    text: textContent,
                    html: htmlContent,
                });
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }

            res.json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failure', message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ message: 'Payment verification failed' });
    }
});

export default router;
