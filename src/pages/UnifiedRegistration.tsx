import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRazorpay } from '@/hooks/useRazorpay';
import { generateQRCode, downloadQRCode } from '@/utils/qrCode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { RetroButton } from '@/components/ui/retro-button';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '@/lib/supabase-service';
import { Event } from '@/lib/supabase';
import QRCode from 'react-qr-code';

export default function UnifiedRegistration() {
    const { user, loading: authLoading, signInWithGoogle, signInWithOTP, verifyOTP, signUp, signOut, error: authError } = useAuth();
    const { createOrder, verifyPayment, openPaymentModal, loading: paymentLoading } = useRazorpay();
    const navigate = useNavigate();
    const location = useLocation();

    // State management
    const [step, setStep] = useState<'login' | 'otp' | 'dashboard' | 'events' | 'payment' | 'success'>('login');
    const [otpEmail, setOtpEmail] = useState('');
    const [otpToken, setOtpToken] = useState('');
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        enrollment_no: ''
    });
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrCodeData, setQrCodeData] = useState<string>('');
    const [epassUrl, setEpassUrl] = useState<string>('');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const inputStyle = {
        backgroundColor: '#0d0520',
        borderColor: '#00ffff',
        boxShadow: 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'
    };

    // Load events on component mount
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await db.events.getAll();
                setEvents(eventsData);
            } catch (err) {
                console.error('Error loading events:', err);
                setError('Failed to load events');
            }
        };
        loadEvents();
    }, []);

    // Handle post-authentication redirect
    useEffect(() => {
        if (user && step === 'login') {
            setStep('dashboard');
        }
    }, [user, step]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOTPLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithOTP(otpEmail);
            setStep('otp');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerification = async () => {
        setLoading(true);
        setError(null);
        try {
            await verifyOTP(otpEmail, otpToken);
            setStep('dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        try {
            await signUp(signUpData);
            setStep('dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEventSelection = (eventId: string) => {
        setSelectedEvents(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const handleProceedToPayment = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!user) throw new Error('User not authenticated');

            const selectedEventsData = events.filter(e => selectedEvents.includes(e.id));
            const totalAmount = selectedEventsData.reduce((sum, event) => sum + event.fee, 0);

            if (totalAmount === 0) {
                // Free events - register directly
                await handleRegistration(selectedEvents);
                setStep('success');
            } else {
                // Paid events - create order and proceed to payment
                const orderData = await createOrder(totalAmount, user.id, selectedEvents);
                await openPaymentModal(
                    orderData.id,
                    totalAmount,
                    'INR',
                    'Aarunya MITS',
                    `Payment for ${selectedEventsData.length} events`,
                    async (response: any) => {
                        try {
                            await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                            await handleRegistration(selectedEvents);
                            setStep('success');
                        } catch (err: any) {
                            setError('Payment verification failed');
                        }
                    }
                );
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = async (eventIds: string[]) => {
        if (!user) throw new Error('User not authenticated');

        try {
            // Create registrations
            for (const eventId of eventIds) {
                await db.registrations.create({
                    user_id: user.id,
                    event_id: eventId,
                    payment_status: 'confirmed'
                });
            }

            // Generate QR code data
            const qrData = {
                enrollment_no: user.enrollment_no,
                email: user.email,
                uid: user.uid,
                registered_events: eventIds,
                payment_status: 'confirmed',
                timestamp: new Date().toISOString()
            };

            // Generate QR code
            const qrCodeDataURL = await generateQRCode(qrData);
            setQrCodeData(qrCodeDataURL);

            // Create e-pass
            const epass = await db.epasses.create({
                user_id: user.id,
                qr_data: qrData,
                pass_url: qrCodeDataURL
            });

            setEpassUrl(epass.pass_url);

            // Send email
            await sendEpassEmail(user, eventIds, qrCodeDataURL);
        } catch (err) {
            console.error('Error during registration:', err);
            throw err;
        }
    };

    const sendEpassEmail = async (user: any, eventIds: string[], qrCodeDataURL: string) => {
        try {
            const selectedEventsData = events.filter(e => eventIds.includes(e.id));

            const response = await fetch(import.meta.env.VITE_EMAIL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_EMAIL_API_KEY}`
                },
                body: JSON.stringify({
                    to: user.email,
                    subject: 'Your Aarunya E-Pass',
                    template: 'epass',
                    data: {
                        name: user.name,
                        enrollment_no: user.enrollment_no,
                        events: selectedEventsData,
                        qr_code: qrCodeDataURL
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }
        } catch (err) {
            console.error('Error sending email:', err);
            // Don't throw error as registration was successful
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut();
            setStep('login');
            setSelectedEvents([]);
            setQrCodeData('');
            setEpassUrl('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return <div className="min-h-screen bg-[#05010D] flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-[#ff00ff] selection:text-black overflow-x-hidden">
            <div className="content-scale">
                <main className="min-h-[calc(100vh-100px)] flex flex-col lg:flex-row">
                    {/* LEFT SIDEBAR - NAVIGATION */}
                    <div className="lg:w-1/3 flex flex-col justify-start items-center lg:items-start pt-20 lg:pt-32 px-4 sm:px-8">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full flex flex-col gap-4"
                        >
                            <div className="text-center lg:text-left mb-6">
                                <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-4" style={{
                                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                                    color: '#fff5ff',
                                    textShadow: '0 0 15px #8a6c8a, 2px 2px 0 #880088'
                                }}>
                                    <GlitchText text="AARUNYA REGISTRATION" />
                                </h1>
                                <div className="h-0.5 w-16 mb-4" style={{
                                    background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                    boxShadow: '0 0 15px #ff00ff, 0 0 10px #00ffff'
                                }} />
                                <p className="text-[10px] sm:text-xs font-vt323 leading-relaxed tracking-wider" style={{
                                    color: '#00ffff',
                                    textShadow: '1px 1px 0 #003333'
                                }}>
                                    // SECURE EVENT & COMPETITION REGISTRATION
                                </p>
                            </div>

                            {/* STEP INDICATORS - Hidden on mobile */}
                            <div className="hidden sm:flex flex-col gap-2">
                                <div className="text-xs font-vt323 text-[#00ffff] uppercase tracking-wider mb-2">PROGRESS</div>
                                <div className="space-y-2">
                                    <RetroButton
                                        variant={step === 'login' ? 'default' : 'white'}
                                        onClick={() => setStep('login')}
                                        className="w-full justify-start text-left text-xs"
                                        disabled={user ? true : false}
                                    >
                                        1. Authentication
                                    </RetroButton>
                                    <RetroButton
                                        variant={step === 'dashboard' ? 'default' : 'white'}
                                        onClick={() => user && setStep('dashboard')}
                                        className="w-full justify-start text-left text-xs"
                                        disabled={!user}
                                    >
                                        2. Dashboard
                                    </RetroButton>
                                    <RetroButton
                                        variant={step === 'events' ? 'default' : 'white'}
                                        onClick={() => user && setStep('events')}
                                        className="w-full justify-start text-left text-xs"
                                        disabled={!user}
                                    >
                                        3. Events Selection
                                    </RetroButton>
                                    <RetroButton
                                        variant={step === 'payment' ? 'default' : 'white'}
                                        onClick={() => user && selectedEvents.length > 0 && setStep('payment')}
                                        className="w-full justify-start text-left text-xs"
                                        disabled={!user || selectedEvents.length === 0}
                                    >
                                        4. Payment
                                    </RetroButton>
                                    <RetroButton
                                        variant={step === 'success' ? 'default' : 'white'}
                                        onClick={() => user && step === 'success' && setStep('success')}
                                        className="w-full justify-start text-left text-xs"
                                        disabled={!user || step !== 'success'}
                                    >
                                        5. E-Pass Generated
                                    </RetroButton>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE - CONTENT */}
                    <div className="lg:w-2/3 flex items-start justify-center pt-12 lg:pt-32 px-4 sm:px-6 pb-20">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-lg"
                        >
                            {step === 'login' && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                🔐
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                AUTHENTICATION REQUIRED
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                            <p className="font-vt323 text-xs mt-3 uppercase tracking-wider" style={{
                                                color: '#00ffff',
                                                textShadow: '1px 1px 0 #003333'
                                            }}>
                                                MITS Students Only - @mitsgwl.ac.in Required
                                            </p>
                                        </div>

                                        {user ? (
                                            <div className="text-center">
                                                <div className="mb-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
                                                    <p className="text-green-400 font-vt323 text-sm">✅ Logged in as {user.name}</p>
                                                    <p className="text-white/70 text-xs">{user.email}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={() => setStep('dashboard')} className="flex-1">
                                                        Continue to Dashboard
                                                    </Button>
                                                    <Button onClick={handleLogout} variant="outline" className="flex-1">
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {error && (
                                                    <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs font-vt323">
                                                        {error}
                                                    </div>
                                                )}

                                                {/* Google Login */}
                                                <div>
                                                    <Label className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                        color: '#00ffff',
                                                        textShadow: '1px 1px 0 #003333'
                                                    }}>
                                                        Continue with Google (MITS Domain Required)
                                                    </Label>
                                                    <Button
                                                        onClick={handleGoogleLogin}
                                                        disabled={loading}
                                                        className="w-full bg-red-600 hover:bg-red-700 border-2 border-red-400"
                                                    >
                                                        {loading ? 'Loading...' : 'Sign in with Google'}
                                                    </Button>
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <span className="w-full border-t border-white/20" />
                                                    </div>
                                                    <div className="relative flex justify-center text-xs uppercase">
                                                        <span className="bg-[#0d0520] px-2 text-white/50" style={{
                                                            color: '#00ffff',
                                                            textShadow: '1px 1px 0 #003333'
                                                        }}>
                                                            or
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* OTP Login */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <Label className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                            color: '#00ffff',
                                                            textShadow: '1px 1px 0 #003333'
                                                        }}>
                                                            Email OTP Login
                                                        </Label>
                                                        <Input
                                                            type="email"
                                                            value={otpEmail}
                                                            onChange={(e) => setOtpEmail(e.target.value)}
                                                            placeholder="your-email@mitsgwl.ac.in"
                                                            style={inputStyle}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                        />
                                                        <p className="text-xs text-white/50 mt-1">Must be a valid @mitsgwl.ac.in email</p>
                                                    </div>
                                                    <div>
                                                        <Label className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                            color: '#00ffff',
                                                            textShadow: '1px 1px 0 #003333'
                                                        }}>
                                                            Enrollment Number
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            value={signUpData.enrollment_no}
                                                            onChange={(e) => setSignUpData({...signUpData, enrollment_no: e.target.value})}
                                                            placeholder="e.g., 2023UCA1739"
                                                            style={inputStyle}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                        />
                                                        <p className="text-xs text-white/50 mt-1">Enter your MITS enrollment number</p>
                                                    </div>
                                                    <Button
                                                        onClick={handleOTPLogin}
                                                        disabled={loading || !otpEmail.endsWith('@mitsgwl.ac.in') || !signUpData.enrollment_no.trim()}
                                                        className="w-full"
                                                    >
                                                        {loading ? 'Sending OTP...' : 'Send OTP'}
                                                    </Button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 'otp' && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                📧
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                VERIFY OTP
                                            </h2>
                                            <p className="font-vt323 text-xs mt-3 uppercase tracking-wider" style={{
                                                color: '#00ffff',
                                                textShadow: '1px 1px 0 #003333'
                                            }}>
                                                Check your email for the OTP
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {error && (
                                                <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs font-vt323">
                                                    {error}
                                                </div>
                                            )}

                                            <Input
                                                placeholder="Enter OTP"
                                                value={otpToken}
                                                onChange={(e) => setOtpToken(e.target.value)}
                                                style={inputStyle}
                                            />
                                            <div className="flex gap-2">
                                                <Button onClick={handleOTPVerification} disabled={loading} className="flex-1">
                                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                                </Button>
                                                <Button onClick={() => setStep('login')} variant="outline" className="flex-1">
                                                    Back
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'dashboard' && user && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                👤
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                DASHBOARD
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-white/5 border border-white/20 rounded-lg">
                                                <h3 className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                    color: '#00ffff',
                                                    textShadow: '1px 1px 0 #003333'
                                                }}>
                                                    Student Information
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div><span className="text-white/50">Name:</span> {user.name}</div>
                                                    <div><span className="text-white/50">UID:</span> {user.uid}</div>
                                                    <div><span className="text-white/50">Email:</span> {user.email}</div>
                                                    <div><span className="text-white/50">Enrollment:</span> {user.enrollment_no}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button onClick={() => setStep('events')} className="flex-1">
                                                    Select Events
                                                </Button>
                                                <Button onClick={handleLogout} variant="outline" className="flex-1">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'events' && user && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                📋
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                EVENT SELECTION
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                        </div>

                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedEvents.includes(event.id)
                                                        ? 'border-[#00ffff] bg-white/5'
                                                        : 'border-white/20 hover:border-white/40'
                                                        }`}
                                                    onClick={() => handleEventSelection(event.id)}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-sm" style={{ color: '#00ffff' }}>
                                                                {event.event_name}
                                                            </h3>
                                                            <p className="text-xs text-white/70">{event.club_name}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className={`text-xs font-bold ${event.is_free ? 'text-green-400' : 'text-red-400'
                                                                }`}>
                                                                {event.is_free ? 'FREE' : `₹${event.fee}`}
                                                            </div>
                                                            <div className="text-xs text-white/50">
                                                                {selectedEvents.includes(event.id) ? 'Selected' : 'Click to Select'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedEvents.includes(event.id)}
                                                            onChange={() => handleEventSelection(event.id)}
                                                            className="w-4 h-4"
                                                        />
                                                        <span className="text-xs text-white/70">Select this event</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {selectedEvents.length > 0 && (
                                            <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                                                <h3 className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                    color: '#00ffff',
                                                    textShadow: '1px 1px 0 #003333'
                                                }}>
                                                    Summary
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div><span className="text-white/50">Events Selected:</span> {selectedEvents.length}</div>
                                                    <div><span className="text-white/50">Total Amount:</span> ₹{events.filter(e => selectedEvents.includes(e.id)).reduce((sum, e) => sum + e.fee, 0)}</div>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <Button onClick={handleProceedToPayment} disabled={loading} className="flex-1">
                                                        {loading ? 'Processing...' : 'Proceed to Payment'}
                                                    </Button>
                                                    <Button onClick={() => setStep('dashboard')} variant="outline" className="flex-1">
                                                        Back
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && user && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                ✅
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                REGISTRATION COMPLETE
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-4 bg-green-900/20 border border-green-500 rounded-lg">
                                                <h3 className="font-vt323 text-xs uppercase tracking-wider mb-2" style={{
                                                    color: '#00ffff',
                                                    textShadow: '1px 1px 0 #003333'
                                                }}>
                                                    E-Pass Generated Successfully
                                                </h3>
                                                <p className="text-green-400 text-xs">Your e-pass has been sent to your MITS email</p>
                                            </div>

                                            {qrCodeData && (
                                                <div className="text-center">
                                                    <div className="mb-4 p-4 bg-white/5 border border-white/20 rounded-lg inline-block">
                                                        <QRCode
                                                            value={qrCodeData}
                                                            size={200}
                                                            level="H"
                                                        />
                                                    </div>
                                                    <div className="text-xs text-white/70 mb-4">
                                                        Scan this QR code at the event venue
                                                    </div>
                                                    <Button
                                                        onClick={() => downloadQRCode(qrCodeData, `aarunya-epass-${user.enrollment_no}.png`)}
                                                        className="w-full"
                                                    >
                                                        Download E-Pass
                                                    </Button>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <Button onClick={() => setStep('dashboard')} className="flex-1">
                                                    Back to Dashboard
                                                </Button>
                                                <Button onClick={handleLogout} variant="outline" className="flex-1">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}