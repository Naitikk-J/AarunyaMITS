
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRazorpay } from '@/hooks/useRazorpay';
import { generateQRCode, downloadQRCode } from '@/utils/qrCode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { RetroButton } from '@/components/ui/retro-button';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';

interface Event {
    id: string;
    name: string;
    club: string;
    description?: string;
    category: string;
    date: string;
    venue: string;
    fee: number;
    requiresPayment: boolean;
    maxParticipants?: number;
    currentRegistrations: number;
    isTeamEvent: boolean;
    teamSize?: {
        min: number;
        max: number;
    };
    registrationCloseTime: string;
    isActive: boolean;
    prizePool?: string;
    contactEmail?: string;
    contactPhone?: string;
    createdBy: string;
}

export default function UnifiedRegistration() {
    const { user, loading: authLoading, signInWithGoogle, signInWithOTP, verifyOTP, signUp, signOut, error: authError } = useAuth();
    const { createOrder, verifyPayment, openPaymentModal, loading: paymentLoading } = useRazorpay();
    const navigate = useNavigate();
    const location = useLocation();

    // State management
    const [step, setStep] = useState<'auth' | 'otp' | 'dashboard' | 'payment' | 'success'>('auth');
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [otpEmail, setOtpEmail] = useState('');
    const [otpToken, setOtpToken] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [signUpData, setSignUpData] = useState({
        enrollment_no: '',
        name: '',
        email: '',
        phone: '',
        branch: '',
        year: ''
    });
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrCodeData, setQrCodeData] = useState<string>('');
    const [epassUrl, setEpassUrl] = useState<string>('');
    const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

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

    // Load events on component mount (Mock)
    useEffect(() => {
        const loadEvents = async () => {
            // Mock Data
            const MOCK_EVENTS: Event[] = [
                {
                    id: '1',
                    name: 'Code Marathon',
                    club: 'CSI',
                    description: 'A 24-hour coding challenge to solve real-world problems.',
                    category: 'Technical',
                    date: '2026-02-21',
                    venue: 'SAC Hall',
                    fee: 0,
                    requiresPayment: false,
                    maxParticipants: 100,
                    currentRegistrations: 45,
                    isTeamEvent: true,
                    teamSize: { min: 2, max: 4 },
                    registrationCloseTime: new Date(Date.now() + 86400000 * 5).toISOString(),
                    isActive: true,
                    prizePool: '₹50,000',
                    contactEmail: 'csi@mitsgwl.ac.in',
                    contactPhone: '9876543210',
                    createdBy: 'admin-1'
                },
                {
                    id: '2',
                    name: 'Robo Race',
                    club: 'Robotics Club',
                    description: 'Fast-paced robot racing event on a challenging track.',
                    category: 'Technical',
                    date: '2026-02-22',
                    venue: 'Open Auditorium',
                    fee: 200,
                    requiresPayment: true,
                    maxParticipants: 50,
                    currentRegistrations: 20,
                    isTeamEvent: false,
                    registrationCloseTime: new Date(Date.now() + 86400000 * 3).toISOString(),
                    isActive: true,
                    prizePool: '₹20,000',
                    contactEmail: 'robotics@mitsgwl.ac.in',
                    contactPhone: '9876543211',
                    createdBy: 'admin-2'
                },
                {
                    id: '3',
                    name: 'Design Derby',
                    club: 'Design Club',
                    description: 'UI/UX design competition focused on creativity and accessibility.',
                    category: 'Creative',
                    date: '2026-02-23',
                    venue: 'SH-4',
                    fee: 100,
                    requiresPayment: true,
                    maxParticipants: 80,
                    currentRegistrations: 35,
                    isTeamEvent: false,
                    registrationCloseTime: new Date(Date.now() + 86400000 * 4).toISOString(),
                    isActive: true,
                    prizePool: '₹15,000',
                    contactEmail: 'design@mitsgwl.ac.in',
                    contactPhone: '9876543212',
                    createdBy: 'admin-3'
                },
            ];
            setEvents(MOCK_EVENTS);
            console.log('Events loaded (Mock):', MOCK_EVENTS.length, 'events');
        };
        loadEvents();
    }, []);

    // Handle post-authentication redirect
    useEffect(() => {
        if (user) {
            if (step === 'auth' || step === 'otp') {
                toast.success('Sign in successful!');
                setStep('dashboard');
            }
            // Load user data (Mock)
            const loadUserData = async () => {
                // Mock existing registrations/epass check
                console.log("Loading mock user data");
                setRegisteredEventIds([]); // Assume no prior registrations
                setQrCodeData('');
                setEpassUrl('');
            };
            loadUserData();
        }
    }, [user, step]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message);
            toast.error('Sign in not successful: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const isValidEmail = (email: string) => {
        return email.endsWith('@mitsgwl.ac.in') || email.endsWith('@mitsgwalior.in');
    };

    const handleSendOTP = async () => {
        setLoading(true);
        setError(null);
        const emailToUse = authMode === 'register' ? signUpData.email : otpEmail;
        if (!emailToUse || !isValidEmail(emailToUse)) {
            toast.error('Please enter a valid MITS email');
            return;
        }
        try {
            console.log('Sending OTP to:', emailToUse);
            await signInWithOTP(emailToUse);
            console.log('OTP sent successfully');
            setOtpSent(true);
            setOtpEmail(emailToUse);
            // Show success message
            toast.success('OTP sent! Please check your email (including spam folder)');
        } catch (err: any) {
            console.error('OTP Error:', err);
            setError(err.message);
            toast.error('Failed to send OTP: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            await verifyOTP(otpEmail, otpToken);
            toast.success('Auth successful!');
            setStep('dashboard');
        } catch (err: any) {
            setError(err.message);
            toast.error('Verification failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        try {
            await signUp(signUpData);
            toast.success('Sign up successful!');
            setStep('dashboard');
        } catch (err: any) {
            setError(err.message);
            toast.error('Sign up failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEventSelection = (eventId: string) => {
        setSelectedEventId(prev => prev === eventId ? null : eventId);
    };

    const handleProceedToPayment = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!user) throw new Error('User not authenticated');

            if (!selectedEventId) throw new Error('No event selected');
            const selectedEventData = events.find(e => e.id === selectedEventId);
            if (!selectedEventData) throw new Error('Event not found');

            const totalAmount = selectedEventData.fee;

            if (totalAmount === 0) {
                // Free events - register directly
                await handleRegistration([selectedEventId]);
                toast.success('Registration successful!');
                setStep('success');
            } else {
                // Paid events - create order and proceed to payment
                const orderData = await createOrder(totalAmount, user.id, [selectedEventId]);
                await openPaymentModal(
                    orderData.id,
                    totalAmount,
                    'INR',
                    'Aarunya MITS',
                    `Payment for ${selectedEventData.name}`,
                    async (response: any) => {
                        try {
                            await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                            await handleRegistration([selectedEventId]);
                            toast.success('Registration and payment successful!');
                            setStep('success');
                        } catch (err: any) {
                            setError('Payment verification failed');
                            toast.error('Payment verification failed');
                        }
                    }
                );
            }
        } catch (err: any) {
            setError(err.message);
            toast.error('Payment process failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = async (eventIds: string[]) => {
        if (!user) throw new Error('User not authenticated');

        try {
            // Mock Registration
            console.log('Registering for events:', eventIds);

            // Artificial delay
            await new Promise(resolve => setTimeout(resolve, 1000));

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
            setEpassUrl(qrCodeDataURL); // Use same URL for mock

            // Send email (Mock)
            await sendEpassEmail(user, eventIds, qrCodeDataURL);
        } catch (err) {
            console.error('Error during registration:', err);
            throw err;
        }
    };

    const sendEpassEmail = async (user: any, eventIds: string[], qrCodeDataURL: string) => {
        try {
            const selectedEventsData = events.filter(e => eventIds.includes(e.id));

            console.log('Mock sending email to:', user.email);
            console.log('Events:', selectedEventsData);
            // console.log('QR Code:', qrCodeDataURL);

            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (err) {
            console.error('Error sending email:', err);
            // Don't throw error as registration was successful
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut();
            setStep('auth');
            setAuthMode('login');
            setQrCodeData('');
            setEpassUrl('');
            toast.success('Logged out successfully');
        } catch (err: any) {
            setError(err.message);
            toast.error('Logout failed: ' + err.message);
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
                    {/* LEFT SIDEBAR - NAVIGATION/STATUS */}
                    <div className="lg:w-1/3 flex flex-col justify-start items-center lg:items-start pt-20 lg:pt-32 px-4 sm:px-8 bg-black/20 backdrop-blur-sm border-r border-white/5">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full flex flex-col gap-6"
                        >
                            <div className="text-center lg:text-left">
                                <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-4" style={{
                                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                                    color: '#fff5ff',
                                    textShadow: '0 0 15px #8a6c8a, 2px 2px 0 #880088'
                                }}>
                                    <GlitchText text="EVENTS" />
                                </h1>
                                <div className="h-0.5 w-16 mb-6 mx-auto lg:mx-0" style={{
                                    background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                    boxShadow: '0 0 15px #ff00ff, 0 0 10px #00ffff'
                                }} />

                                {user ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/5 border border-[#ff00ff]/30 rounded-2xl flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#ff00ff] flex items-center justify-center text-xl shadow-[0_0_10px_#ff00ff]">👤</div>
                                            <div>
                                                <div className="text-[10px] text-white/50 uppercase tracking-widest">Explorer</div>
                                                <div className="text-sm font-bold text-[#00ffff]">{user.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <RetroButton
                                                variant={step === 'dashboard' ? 'default' : 'white'}
                                                onClick={() => setStep('dashboard')}
                                                className="w-full justify-start text-xs"
                                            >
                                                Event Catalog
                                            </RetroButton>
                                            {epassUrl && (
                                                <RetroButton
                                                    variant={step === 'success' ? 'default' : 'white'}
                                                    onClick={() => setStep('success')}
                                                    className="w-full justify-start text-xs"
                                                >
                                                    Your E-Pass
                                                </RetroButton>
                                            )}
                                            <RetroButton
                                                variant="white"
                                                onClick={handleLogout}
                                                className="w-full justify-start text-xs opacity-70 hover:opacity-100"
                                            >
                                                Sign Out
                                            </RetroButton>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[10px] sm:text-xs font-vt323 leading-relaxed tracking-wider text-[#00ffff]">
                                        // LOGIN TO REGISTER FOR COMPETITIONS
                                    </p>
                                )}
                            </div>

                            {/* System Status */}
                            <div className="hidden lg:block mt-auto pt-8 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="font-vt323 text-[10px] uppercase tracking-widest text-white/40">Status:</span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" />
                                        <span className="font-vt323 text-[10px] font-bold tracking-widest text-[#00ff00]">SECURE_LINK_ACTIVE</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT CONTENT AREA */}
                    <div className="lg:w-2/3 flex items-start justify-center pt-12 lg:pt-32 px-4 sm:px-6 pb-20 overflow-y-auto">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-6xl"
                        >
                            {step === 'auth' && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8 w-full"
                                    style={{
                                        background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                                        border: '2px solid #ff00ff',
                                        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff'
                                    }}
                                >
                                    {/* Corner indicators */}
                                    <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff' }} />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff' }} />
                                    <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff' }} />
                                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff' }} />

                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
                                        backgroundSize: '4px 4px'
                                    }} />

                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <h1 className="text-xl md:text-2xl font-black tracking-tighter mb-4" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                color: '#fff5ff',
                                                textShadow: '0 0 15px #8a6c8a, 2px 2px 0 #880088'
                                            }}>
                                                <GlitchText text="AARUNYA 6.0" />
                                            </h1>
                                            <div className="flex justify-center mb-6">
                                                <div className="inline-flex border-2 border-[#ff00ff] rounded-full p-1 bg-black/40">
                                                    <button
                                                        onClick={() => { setAuthMode('login'); setOtpSent(false); }}
                                                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${authMode === 'login' ? 'bg-[#ff00ff] text-white shadow-[0_0_10px_#ff00ff]' : 'text-white/50 hover:text-white'}`}
                                                    >
                                                        LOGIN
                                                    </button>
                                                    <button
                                                        onClick={() => { setAuthMode('register'); setOtpSent(false); }}
                                                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${authMode === 'register' ? 'bg-[#ff00ff] text-white shadow-[0_0_10px_#ff00ff]' : 'text-white/50 hover:text-white'}`}
                                                    >
                                                        REGISTER
                                                    </button>
                                                </div>
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                {authMode === 'login' ? 'ACCESS DASHBOARD' : 'SIGN UP FOR AARUNYA'}
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                        </div>

                                        {error && (
                                            <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs font-vt323">
                                                {error}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {authMode === 'login' ? (
                                                <div className="space-y-4">
                                                    <div className="space-y-1">
                                                        <div className="flex gap-2 items-center">
                                                            <Input
                                                                type="email"
                                                                value={otpEmail}
                                                                onChange={(e) => setOtpEmail(e.target.value)}
                                                                placeholder="Email (@mitsgwl.ac.in)"
                                                                className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                                style={inputStyle}
                                                                required
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={handleSendOTP}
                                                                disabled={loading || !isValidEmail(otpEmail)}
                                                                className="h-11 px-6 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                                                                style={{
                                                                    background: isValidEmail(otpEmail) ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#333',
                                                                    boxShadow: isValidEmail(otpEmail) ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
                                                                    border: 'none'
                                                                }}
                                                            >
                                                                {loading ? '...' : otpSent ? 'RESEND' : 'SEND OTP'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex gap-3">
                                                        <Input
                                                            value={signUpData.enrollment_no}
                                                            onChange={(e) => setSignUpData({ ...signUpData, enrollment_no: e.target.value })}
                                                            placeholder="Enrollment No."
                                                            className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                        <Input
                                                            value={signUpData.name}
                                                            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                                                            placeholder="Full Name"
                                                            className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex gap-2 items-center">
                                                            <Input
                                                                type="email"
                                                                value={signUpData.email}
                                                                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                                                placeholder="MITS Email"
                                                                className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                                style={inputStyle}
                                                                required
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={handleSendOTP}
                                                                disabled={loading || !isValidEmail(signUpData.email)}
                                                                className="h-11 px-6 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                                                                style={{
                                                                    background: isValidEmail(signUpData.email) ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#333',
                                                                    boxShadow: isValidEmail(signUpData.email) ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
                                                                    border: 'none'
                                                                }}
                                                            >
                                                                {loading ? '...' : otpSent ? 'RESEND' : 'SEND OTP'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <Input
                                                            type="tel"
                                                            value={signUpData.phone}
                                                            onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                                                            placeholder="Phone"
                                                            className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                        <Input
                                                            value={signUpData.branch}
                                                            onChange={(e) => setSignUpData({ ...signUpData, branch: e.target.value })}
                                                            placeholder="Branch"
                                                            className="border-2 font-vt323 text-sm h-11 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-1">
                                                <Input
                                                    value={otpToken}
                                                    onChange={(e) => setOtpToken(e.target.value)}
                                                    placeholder="Enter 6-digit OTP"
                                                    className="border-2 font-vt323 text-sm h-11 transition-all text-center tracking-[1em] placeholder:tracking-normal placeholder:text-white/30 rounded-full px-5"
                                                    style={inputStyle}
                                                    disabled={!otpSent}
                                                    maxLength={6}
                                                />
                                            </div>

                                            <Button
                                                onClick={handleVerifyAndRegister}
                                                disabled={loading || !otpSent || otpToken.length < 6}
                                                className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-2 uppercase tracking-wider disabled:opacity-50 h-11 rounded-full"
                                                style={{
                                                    background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)',
                                                    boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff',
                                                    fontSize: '11px'
                                                }}
                                            >
                                                {loading ? 'VERIFYING...' : authMode === 'login' ? 'LOGIN TO DASHBOARD' : 'COMPLETE REGISTRATION'}
                                            </Button>
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
                                        {/* Corner indicators */}
                                        <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff' }} />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff' }} />
                                        <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff' }} />
                                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff' }} />

                                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
                                            backgroundSize: '4px 4px'
                                        }} />

                                        {/* User Info Header */}
                                        <div className="mb-8 px-5 py-4 bg-white/5 border border-[#ff00ff]/30 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_15px_rgba(255,0,255,0.1)] relative">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#ff00ff] flex items-center justify-center text-xl shadow-[0_0_10px_#ff00ff]">
                                                    👤
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-white/50 uppercase tracking-widest">Aarunya Explorer</div>
                                                    <div className="text-sm font-bold text-[#00ffff]">{user.name}</div>
                                                </div>
                                            </div>

                                            <div className="absolute -top-12 right-0 flex gap-2">
                                                {epassUrl && (
                                                    <Button onClick={() => setStep('success')} size="sm" variant="secondary" className="h-8 rounded-full text-[10px] bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 px-4">
                                                        VIEW E-PASS
                                                    </Button>
                                                )}
                                                <Button onClick={handleLogout} size="sm" variant="outline" className="h-9 rounded-full text-[10px] border-[#ff00ff] bg-black/60 hover:bg-[#ff00ff] hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)] font-black tracking-widest px-6">
                                                    SIGN OUT
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-center mb-8">
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '14px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff'
                                            }}>
                                                SELECT YOUR EVENTS
                                            </h2>
                                            <p className="text-[10px] text-[#00ffff] uppercase tracking-[0.2em] mb-4">Pick one event to continue</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar p-2">
                                            {events.map((event) => {
                                                const isRegistered = registeredEventIds.includes(event.id);
                                                const isSelected = selectedEventId === event.id;
                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={`relative overflow-hidden border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${isRegistered
                                                            ? 'border-green-500/50 bg-green-500/5 cursor-default'
                                                            : isSelected
                                                                ? 'border-[#00ffff] bg-[#00ffff]/5 shadow-[0_0_20px_rgba(0,255,255,0.2)]'
                                                                : 'border-white/10 bg-black/40 hover:border-[#ff00ff]/50'
                                                            }`}
                                                        onClick={() => !isRegistered && handleEventSelection(event.id)}
                                                    >
                                                        {/* Category Badge */}
                                                        <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white/70">
                                                            {event.category}
                                                        </div>

                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-1">
                                                                    <h3 className="text-lg font-black tracking-tight text-white mb-0.5">
                                                                        {event.name}
                                                                    </h3>
                                                                    <p className="text-[10px] text-[#ff00ff] font-bold uppercase mb-2">Hosted by {event.club}</p>
                                                                    <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed">
                                                                        {event.description}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right flex flex-col items-end">
                                                                    <div className={`text-xl font-black mb-1 ${event.fee === 0 ? 'text-green-400' : 'text-white'}`}>
                                                                        {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                                                                    </div>
                                                                    {event.prizePool && (
                                                                        <div className="text-[9px] bg-[#ffea00]/20 text-[#ffea00] px-2 py-0.5 rounded-full font-bold">
                                                                            🏆 {event.prizePool} PRIZE
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/5 pt-3">
                                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                                    <span className="text-sm">📅</span> {event.date}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                                    <span className="text-sm">📍</span> {event.venue}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                                    <span className="text-sm">👥</span> {event.isTeamEvent ? `Team (${event.teamSize?.min}-${event.teamSize?.max})` : 'Individual'}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                                    <span className="text-sm">📞</span> {event.contactPhone}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                                    <span className="text-sm">📧</span> {event.contactEmail}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] text-white/30 truncate">
                                                                    <span className="text-sm">⏰</span> Closes: {new Date(event.registrationCloseTime).toLocaleDateString()}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-2 h-2 rounded-full ${event.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                                    <span className="text-[9px] text-white/40 uppercase tracking-widest">
                                                                        {event.currentRegistrations}/{event.maxParticipants} Registered
                                                                    </span>
                                                                </div>

                                                                {isRegistered ? (
                                                                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1">
                                                                        ✓ ENROLLED
                                                                    </span>
                                                                ) : (
                                                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${isSelected ? 'bg-[#00ffff] text-black shadow-[0_0_10px_#00ffff]' : 'bg-white/10 text-white'}`}>
                                                                        {isSelected ? 'SELECTED' : 'SELECT EVENT'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {selectedEventId && (
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="mt-8 p-6 bg-gradient-to-br from-[#ff00ff]/10 to-[#00ffff]/10 border-2 border-[#ff00ff]/40 rounded-3xl backdrop-blur-md shadow-[0_0_30px_rgba(255,0,255,0.1)] sticky bottom-0 z-20"
                                            >
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <h3 className="text-sm font-black text-[#00ffff] uppercase tracking-widest mb-1">Payment Strategy</h3>
                                                        <p className="text-[10px] text-white/50">{events.find(e => e.id === selectedEventId)?.name}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-white">₹{events.find(e => e.id === selectedEventId)?.fee}</div>
                                                        <div className="text-[10px] text-[#ff00ff] font-bold uppercase">Total Payable</div>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleProceedToPayment}
                                                    disabled={loading}
                                                    className="w-full h-12 rounded-full font-black text-xs uppercase tracking-widest border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all hover:scale-[1.02] active:scale-95"
                                                    style={{
                                                        background: 'linear-gradient(to right, #ff00ff, #8a2be2)',
                                                    }}
                                                >
                                                    {loading ? 'PROCESSING SECURE PAYMENT...' : `PAY ₹${events.find(e => e.id === selectedEventId)?.fee} & REGISTER NOW`}
                                                </Button>
                                            </motion.div>
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
                                                    Back to Selection
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