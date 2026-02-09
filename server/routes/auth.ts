import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { generateAarunyaId, isEmailOrAarunyaId, isValidEmail } from '../utils/idGenerator';
import { generateRegistrationEmail } from '../utils/emailTemplate';
import transporter from '../config/mailer';

const router = express.Router();

// Mock database - in production, use a real database
interface User {
    // Common fields
    id: string;
    name: string;
    email: string;
    aarunyaId: string;
    mobileNumber: string;
    createdAt: Date;

    // Student fields
    collegeName?: string;
    collegeId?: string;
    course?: string;
    yearOfStudy?: string;

    // Alumni fields
    graduationYear?: string;
    department?: string;
    organization?: string;
    position?: string;

    category: 'student' | 'alumni' | 'event';
    city?: string;
}

let users: User[] = [];

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const {
            name, email, mobileNumber,
            category, // 'student' | 'alumni'
            // Student specific
            collegeName, collegeId, course, yearOfStudy,
            // Alumni specific
            graduationYear, department, organization, position,
            // Optional
            city
        } = req.body;

        // Basic Validation
        if (!name || !email || !mobileNumber || !category) {
            return res.status(400).json({ message: 'Name, email, mobile number, and category are required' });
        }

        // Category specific validation
        if (category === 'student') {
            if (!collegeName || !collegeId || !course || !yearOfStudy) {
                return res.status(400).json({ message: 'All student fields are required' });
            }
        } else if (category === 'alumni') {
            if (!graduationYear || !department) {
                return res.status(400).json({ message: 'Graduation year and department are required' });
            }
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Generate AARUNYA ID
        const aarunyaId = generateAarunyaId();

        // Create user
        const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            aarunyaId,
            mobileNumber,
            category,
            createdAt: new Date(),

            // Optional fields based on category
            collegeName,
            collegeId,
            course,
            yearOfStudy,
            graduationYear,
            department,
            organization,
            position,
            city
        };

        users.push(newUser);

        // Send email
        try {
            const { htmlContent, textContent } = generateRegistrationEmail(name, aarunyaId);

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                to: email,
                subject: 'Welcome to AARUNYA - Registration Successful!',
                text: textContent,
                html: htmlContent,
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the registration if email fails, just log it
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, aarunyaId: newUser.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Registration successful. Check your email for confirmation.',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                aarunyaId: newUser.aarunyaId,
                category: newUser.category,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/auth/login - OTP-based login (no password)
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { identifier } = req.body;

        if (!identifier) {
            return res.status(400).json({ message: 'Email or AARUNYA ID is required' });
        }

        // Determine if identifier is email or AARUNYA ID
        const identifierType = isEmailOrAarunyaId(identifier);

        if (!identifierType) {
            return res.status(400).json({ message: 'Invalid email or AARUNYA ID format' });
        }

        // Find user
        let user: User | undefined;
        if (identifierType === 'email') {
            user = users.find((u) => u.email === identifier);
        } else {
            user = users.find((u) => u.aarunyaId === identifier);
        }

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Generate OTP and send via email
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP temporarily (in production, use Redis or similar)
        // For now, we'll include it in the response for testing
        // In production, send OTP via email
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                to: user.email,
                subject: 'AARUNYA - Your Login OTP',
                text: `Your OTP for login is: ${otp}. It will expire in 10 minutes.`,
                html: `<h2>Your AARUNYA Login OTP</h2><p>Your OTP is: <strong>${otp}</strong></p><p>This OTP will expire in 10 minutes.</p>`,
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            return res.status(500).json({ message: 'Failed to send OTP' });
        }

        res.status(200).json({
            message: 'OTP sent to your email',
            userId: user.id,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/auth/verify-otp - Verify OTP and complete login
router.post('/verify-otp', async (req: Request, res: Response) => {
    try {
        const { userId, otp } = req.body;

        if (!userId || !otp) {
            return res.status(400).json({ message: 'User ID and OTP are required' });
        }

        // Find user
        const user = users.find((u) => u.id === userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        // In production, verify OTP from Redis/DB
        // For now, we'll accept any 6-digit OTP for testing
        if (otp.length !== 6) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, aarunyaId: user.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                aarunyaId: user.aarunyaId,
                category: user.category,
            },
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/auth/google - For Google OAuth integration
router.post('/google', async (req: Request, res: Response) => {
    try {
        const { googleId, email, name } = req.body;

        if (!googleId || !email) {
            return res.status(400).json({ message: 'Google ID and email are required' });
        }

        // Check if user exists
        let user = users.find((u) => u.email === email);

        if (!user) {
            // Create new user for Google registration
            const aarunyaId = generateAarunyaId();
            user = {
                id: `user_${Date.now()}`,
                name: name || email.split('@')[0],
                email,
                aarunyaId,
                mobileNumber: '',
                category: 'student', // Default to student
                createdAt: new Date(),
            };

            users.push(user);

            // Send welcome email
            try {
                const { htmlContent, textContent } = generateRegistrationEmail(user.name, aarunyaId);

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || 'noreply@aarunya.in',
                    to: email,
                    subject: 'Welcome to AARUNYA - Google Registration Successful!',
                    text: textContent,
                    html: htmlContent,
                });
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, aarunyaId: user.aarunyaId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Google authentication successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                aarunyaId: user.aarunyaId,
                category: user.category,
            },
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
