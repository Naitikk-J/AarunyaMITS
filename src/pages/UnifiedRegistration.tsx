
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
import { eventApi, eventRegistrationApi, authApi } from '@/lib/api';
import { User } from '@/hooks/useAuth';

interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface Registration {
    eventId: string;
    _id?: string;
    id?: string;
}

interface EventAPIResponse {
    id?: string;
    _id?: string;
    name?: string;
    club?: string;
    description?: string;
    category?: string;
    date?: string;
    venue?: string;
    fee?: number;
    requiresPayment?: boolean;
    maxParticipants?: number;
    currentRegistrations?: number;
    isTeamEvent?: boolean;
    teamSize?: {
        min: number;
        max: number;
    };
    registrationCloseTime?: string;
    isActive?: boolean;
    prizePool?: string;
    contactEmail?: string;
    contactPhone?: string;
    createdBy?: string;
}

interface Event {
    id: string;
    _id?: string;
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
    registrationCloseTime?: string;
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
const [result, setResult] = useState<unknown>(null);
    const [registration, setRegistration] = useState<unknown>(null);

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
        backgroundColor: '#120830',
        borderColor: '#44ddff',
        boxShadow: '0 0 6px rgba(0,255,255,0.15)',
        color: '#ffffff'
    };

    // Load events on component mount with retry logic
    useEffect(() => {
        const fetchEvents = async (retries = 3) => {
            try {
                setLoading(true);
                const response = await eventApi.getEvents();
                // API returns { success, message, data: { events: [...] } }
                // axios wraps body in response.data, so events are at response.data.data.events
                const eventsData = response.data?.data?.events || response.data?.events || response.data || [];
                const mappedEvents = Array.isArray(eventsData) ? eventsData.map((e: EventAPIResponse) => ({
                    ...e,
                    id: e.id || e._id || 'unknown',
                    name: e.name || 'Untitled Event',
                    club: e.club || 'Aarunya',
                    description: e.description || '',
                    category: e.category || 'Event',
                    date: e.date || 'TBA',
                    venue: e.venue || 'TBA',
                    fee: typeof e.fee === 'number' ? e.fee : 0,
                    requiresPayment: e.requiresPayment || false,
                    currentRegistrations: e.currentRegistrations || 0,
                    isTeamEvent: e.isTeamEvent || false,
                    teamSize: e.teamSize || { min: 1, max: 1 },
                    isActive: e.isActive !== undefined ? e.isActive : true,
                    maxParticipants: e.maxParticipants || 100,
                    prizePool: e.prizePool || '',
                    contactEmail: e.contactEmail || '',
                    contactPhone: e.contactPhone || '',
                    createdBy: e.createdBy || '',
                    registrationCloseTime: e.registrationCloseTime || '',
                })) : [];
                setEvents(mappedEvents);
                if (mappedEvents.length === 0 && retries > 0) {
                    setTimeout(() => fetchEvents(retries - 1), 1500);
                }
            } catch (error: unknown) {
                console.error('Error fetching events:', error);
                if (retries > 0) {
                    setTimeout(() => fetchEvents(retries - 1), 1500);
                } else {
                    toast.error('Failed to fetch events. Please refresh the page.');
                    setEvents([]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Handle post-authentication redirect
    useEffect(() => {
        if (user) {
            if (step === 'auth' || step === 'otp') {
                toast.success('Sign in successful!');
                setStep('dashboard');
            }
            // Load user data from DB
            const loadUserData = async () => {
                if (!user?.id) return;
                try {
                    const response = await eventRegistrationApi.getMyEventRegistrations({
                        participantId: user.id,
                        participantType: user.category || 'CollegeStudent'
                    });
                    const registrations = response.data?.data?.registrations || response.data?.registrations || response.data || [];
                    setRegisteredEventIds(Array.isArray(registrations) ? registrations.map((r: Registration) => r.eventId) : []);
                } catch (err) {
                    // Error loading user data - silently continue
                }
            };
            loadUserData();
        }
    }, [user, step]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendOTP = async () => {
        setLoading(true);
        setError(null);
        const emailToUse = authMode === 'register' ? signUpData.email : otpEmail;
        if (!emailToUse || !isValidEmail(emailToUse)) {
            toast.error('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const data = await signInWithOTP(emailToUse);
            toast.success('OTP Sent Successfully');
            setOtpSent(true);
            setOtpEmail(emailToUse);
            setResult(data);
        } catch (err: unknown) {
            console.error('Error sending OTP:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
            const msg = (err instanceof Error && 'response' in err) ? (err as any).response?.data?.message || errorMessage : errorMessage;
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndRegister = async () => {
        if (!otpToken || otpToken.length < 4) {
            toast.error('Please enter a valid OTP');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const userData = await verifyOTP(
                otpEmail,
                otpToken,
                authMode === 'register' ? signUpData : {}
            );

            // If requiresOnboarding, user has no participant record yet — create one
            if (userData?.requiresOnboarding) {
                if (authMode === 'register') {
                    toast.info('Creating your account...');
                    // Call register endpoint to create the CollegeStudent record
                    const regData = {
                        ...signUpData,
                        email: otpEmail,
                    };
                    const registeredUser = await signUp(regData);
                    toast.success('Account created! Welcome to Aarunya!');
                    setResult(registeredUser);
                    setStep('dashboard');
                } else {
                    // Login mode but user doesn't have a participant record
                    toast.error('No account found. Please switch to REGISTER to create your account.');
                    setError('No account found for this email. Please register first.');
                    return;
                }
            } else {
                toast.success('Access Granted');
                setResult(userData);
                setStep('dashboard');
            }
        } catch (err: unknown) {
            console.error('Error verifying OTP:', err);
            const errorMessage = err instanceof Error ? err.message : 'Verification failed';
            const msg = (err instanceof Error && 'response' in err) ? (err as any).response?.data?.message || errorMessage : errorMessage;
            setError(msg);
            toast.error(msg);
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
        } catch (err: unknown) {
            console.error('Error signing up:', err);
            const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
            setError(errorMessage);
            toast.error('Sign up failed: ' + errorMessage);
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
            if (!user.id) {
                toast.error('Your account is incomplete. Please log out and register again.');
                throw new Error('No participant ID found. Please log out and re-register with all your details.');
            }

            if (!selectedEventId) throw new Error('No event selected');
            const selectedEventData = events.find(e => e.id === selectedEventId);
            if (!selectedEventData) throw new Error('Event not found');

            const totalAmount = selectedEventData.fee;

            if (totalAmount === 0) {
                // Free events - register directly
                await handleRegistration(selectedEventId);
                toast.success('Registration successful!');
                setStep('success');
            } else {
                // Paid events - Register and get payment details from backend
                const participantType = user.category || 'CollegeStudent';
                const regResponse = await eventRegistrationApi.registerForEvent({
                    eventId: selectedEventId,
                    participantId: user.id,
                    participantType
                });

                const responseData = regResponse.data?.data || regResponse.data;
                const regData = responseData?.registration;
                const paymentDetails = responseData?.payment;
                setRegistration(regData);

                if (paymentDetails?.orderId) {
                    // Backend created the order, open payment modal
                    await openPaymentModal(
                        paymentDetails.orderId,
                        totalAmount,
                        paymentDetails.currency || 'INR',
                        'Aarunya MITS',
                        `Payment for ${selectedEventData.name}`,
                        async (response: RazorpayResponse) => {
                            try {
                                const verifyResponse = await eventRegistrationApi.verifyPayment({
                                    registrationId: regData?._id || regData?.id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                });

                                const finalReg = verifyResponse.data?.data?.registration || verifyResponse.data?.registration || verifyResponse.data;
                                setRegistration(finalReg);

                                // Generate QR code data for the session
                                const qrData = {
                                    enrollment_no: user.enrollment_no || 'NA',
                                    email: user.email,
                                    uid: user.id,
                                    registered_events: [selectedEventId],
                                    payment_status: 'confirmed',
                                    timestamp: new Date().toISOString()
                                };

                                const qrCodeDataURL = await generateQRCode(qrData);
                                setQrCodeData(qrCodeDataURL);
                                setEpassUrl(qrCodeDataURL);
                                setRegisteredEventIds(prev => [...new Set([...prev, selectedEventId])]);

                                toast.success('Payment verified! Registration confirmed.');
                                setStep('success');
                            } catch (err: unknown) {
                                console.error('Error verifying payment:', err);
                                const errMsg = (err instanceof Error && 'response' in err) ? (err as any).response?.data?.message : (err instanceof Error ? err.message : 'Payment verification failed');
                                setError(errMsg);
                                toast.error(errMsg);
                            }
                        }
                    );
                } else {
                    // No payment details returned, registration is already confirmed
                    toast.success('Registration successful!');
                    setStep('success');
                }
            }
        } catch (err: unknown) {
            console.error('Error processing payment/registration:', err);
            const backendMsg = (err instanceof Error && 'response' in err) ? (err as any).response?.data?.message || (err as any).response?.data?.error || err.message : (err instanceof Error ? err.message : 'Process failed');
            setError(backendMsg);
            toast.error('Process failed: ' + backendMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = async (eventId: string) => {
        if (!user) throw new Error('User not authenticated');

        try {
            const participantType = user.category || 'CollegeStudent';
            // Register for event in DB
            await eventRegistrationApi.registerForEvent({
                eventId,
                participantId: user.id,
                participantType
            });

            // Generate QR code data for the session
            const qrData = {
                enrollment_no: user.enrollment_no || 'NA',
                email: user.email,
                uid: user.id,
                registered_events: [eventId],
                payment_status: 'confirmed',
                timestamp: new Date().toISOString()
            };

            // Generate QR code
            const qrCodeDataURL = await generateQRCode(qrData);
            setQrCodeData(qrCodeDataURL);
            setEpassUrl(qrCodeDataURL);

            // Refresh registered events list locally for UI
            setRegisteredEventIds(prev => [...new Set([...prev, eventId])]);

            toast.success('Registration completed!');
        }
            catch (err: unknown) {
            console.error('Error registering for event:', err);
            const msg = (err instanceof Error && 'response' in err) ? (err as any).response?.data?.message : (err instanceof Error ? err.message : 'Registration failed');
            toast.error(msg);
            throw err;
        }
    };

    const sendEpassEmail = async (userData: User, eventIds: string[], qrCodeDataURL: string) => {
        try {
            const selectedEventsData = events.filter(e => eventIds.includes(e.id));

            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (err: unknown) {
            console.error('Error sending epass email:', err);
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
        } catch (err: unknown) {
            console.error('Error logging out:', err);
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            setError(errorMessage);
            toast.error('Logout failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
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
                                <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4" style={{
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
                                                <div className="text-xs text-white/50 uppercase tracking-widest">Explorer</div>
                                                <div className="text-base font-bold text-[#00ffff]">{user.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <RetroButton
                                                variant={step === 'dashboard' ? 'default' : 'white'}
                                                onClick={() => setStep('dashboard')}
                                                className="w-full justify-start text-sm"
                                            >
                                                Event Catalog
                                            </RetroButton>
                                            {epassUrl && (
                                                <RetroButton
                                                    variant={step === 'success' ? 'default' : 'white'}
                                                    onClick={() => setStep('success')}
                                                    className="w-full justify-start text-sm"
                                                >
                                                    Your E-Pass
                                                </RetroButton>
                                            )}
                                            <RetroButton
                                                variant="white"
                                                onClick={handleLogout}
                                                className="w-full justify-start text-sm opacity-70 hover:opacity-100"
                                            >
                                                Sign Out
                                            </RetroButton>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm sm:text-base font-vt323 leading-relaxed tracking-wider text-[#00ffff]">
                                        // LOGIN TO REGISTER FOR COMPETITIONS
                                    </p>
                                )}
                            </div>

                            {/* System Status */}
                            <div className="hidden lg:block mt-auto pt-8 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="font-vt323 text-xs uppercase tracking-widest text-white/40">Status:</span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" />
                                        <span className="font-vt323 text-xs font-bold tracking-widest text-[#00ff00]">SECURE_LINK_ACTIVE</span>
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
                                    className="relative p-6 sm:p-8 w-full rounded-2xl"
                                    style={{
                                        background: 'linear-gradient(145deg, #1a0a2e 0%, #120830 50%, #0d0520 100%)',
                                        border: '1.5px solid rgba(255,0,255,0.5)',
                                        boxShadow: '0 0 30px rgba(255,0,255,0.15), 0 0 60px rgba(0,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
                                    }}
                                >
                                    {/* Corner indicators */}
                                    <span className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                    <span className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                    <span className="absolute top-0 right-0 w-4 h-[1.5px] bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                    <span className="absolute top-0 right-0 w-[1.5px] h-4 bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                    <span className="absolute bottom-0 left-0 w-4 h-[1.5px] bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                    <span className="absolute bottom-0 left-0 w-[1.5px] h-4 bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                    <span className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                    <span className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />

                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
                                        backgroundSize: '4px 4px'
                                    }} />

                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-4" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                color: '#fff5ff',
                                                textShadow: '0 0 15px #8a6c8a, 2px 2px 0 #880088'
                                            }}>
                                                <GlitchText text="AARUNYA 2.0" />
                                            </h1>
                                            <div className="flex justify-center mb-6">
                                                <div className="inline-flex border-2 border-[#ff00ff] rounded-full p-1 bg-black/40">
                                                    <button
                                                        onClick={() => { setAuthMode('login'); setOtpSent(false); }}
                                                        className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all ${authMode === 'login' ? 'bg-[#ff00ff] text-white shadow-[0_0_10px_#ff00ff]' : 'text-white/50 hover:text-white'}`}
                                                    >
                                                        LOGIN
                                                    </button>
                                                    <button
                                                        onClick={() => { setAuthMode('register'); setOtpSent(false); }}
                                                        className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all ${authMode === 'register' ? 'bg-[#ff00ff] text-white shadow-[0_0_10px_#ff00ff]' : 'text-white/50 hover:text-white'}`}
                                                    >
                                                        REGISTER
                                                    </button>
                                                </div>
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '14px',
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
                                            <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm font-vt323">
                                                {error}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {authMode === 'login' ? (
                                                <div className="space-y-1">
                                                    <div className="flex gap-2 items-center">
                                                        <Input
                                                            type="email"
                                                            value={otpEmail}
                                                            onChange={(e) => setOtpEmail(e.target.value)}
                                                            placeholder="Enter your email"
                                                            className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={handleSendOTP}
                                                            disabled={loading || !isValidEmail(otpEmail)}
                                                            className="h-12 px-6 rounded-full text-xs font-bold whitespace-nowrap shrink-0 uppercase tracking-widest"
                                                            style={{
                                                                background: isValidEmail(otpEmail) ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#333',
                                                                boxShadow: isValidEmail(otpEmail) ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
                                                                border: 'none',
                                                                fontFamily: '"Press Start 2P", cursive',
                                                                fontSize: '10px'
                                                            }}
                                                        >
                                                            {loading ? '...' : otpSent ? 'RESEND' : 'GET OTP'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex gap-3">
                                                        <Input
                                                            value={signUpData.enrollment_no}
                                                            onChange={(e) => setSignUpData({ ...signUpData, enrollment_no: e.target.value })}
                                                            placeholder="Enrollment No."
                                                            className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                        <Input
                                                            value={signUpData.name}
                                                            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                                                            placeholder="Full Name"
                                                            className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
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
                                                                className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                                style={inputStyle}
                                                                required
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={handleSendOTP}
                                                                disabled={loading || !isValidEmail(signUpData.email)}
                                                                className="h-12 px-6 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
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
                                                            className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
                                                            style={inputStyle}
                                                            required
                                                        />
                                                        <Input
                                                            value={signUpData.branch}
                                                            onChange={(e) => setSignUpData({ ...signUpData, branch: e.target.value })}
                                                            placeholder="Branch"
                                                            className="border-2 font-vt323 text-base h-12 transition-all placeholder:text-white/30 rounded-full px-5 flex-1"
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
                                                    className="border-2 font-vt323 text-base h-12 transition-all text-center tracking-[1em] placeholder:tracking-normal placeholder:text-white/30 rounded-full px-5"
                                                    style={inputStyle}
                                                    disabled={!otpSent}
                                                    maxLength={6}
                                                />
                                            </div>

                                            <Button
                                                onClick={handleVerifyAndRegister}
                                                disabled={loading || !otpSent || otpToken.length < 4}
                                                className="relative w-full border border-[#ff00ff]/60 text-white font-bold mt-2 uppercase tracking-wider disabled:opacity-50 h-12 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
                                                style={{
                                                    background: 'linear-gradient(135deg, #e600e6, #b300b3)',
                                                    boxShadow: '0 0 20px rgba(255,0,255,0.3)',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                {loading ? 'VERIFYING...' : authMode === 'login' ? 'VERIFY & LOGIN' : 'VERIFY & SIGN UP'}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'dashboard' && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative p-6 sm:p-8 rounded-2xl"
                                    style={{
                                        background: 'linear-gradient(145deg, #1a0a2e 0%, #120830 50%, #0d0520 100%)',
                                        border: '1.5px solid rgba(255,0,255,0.5)',
                                        boxShadow: '0 0 30px rgba(255,0,255,0.15), 0 0 60px rgba(0,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <div className="relative z-10">
                                        {/* Corner indicators */}
                                        <span className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                        <span className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                        <span className="absolute top-0 right-0 w-4 h-[1.5px] bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                        <span className="absolute top-0 right-0 w-[1.5px] h-4 bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                        <span className="absolute bottom-0 left-0 w-4 h-[1.5px] bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                        <span className="absolute bottom-0 left-0 w-[1.5px] h-4 bg-[#ff00ff] rounded-full" style={{ boxShadow: '0 0 8px #ff00ff' }} />
                                        <span className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />
                                        <span className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#00ffff] rounded-full" style={{ boxShadow: '0 0 8px #00ffff' }} />

                                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
                                            backgroundSize: '4px 4px'
                                        }} />

                                        {/* User Info Header */}
                                        <div className="mb-8 px-6 py-5 bg-gradient-to-r from-indigo-950/40 via-purple-900/20 to-indigo-950/40 border border-[#ff00ff]/30 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-[0_0_20px_rgba(255,0,255,0.1)] relative backdrop-blur-md">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff00ff] to-[#8a2be2] flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(255,0,255,0.4)] transform hover:rotate-6 transition-transform">
                                                    👤
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-indigo-300 uppercase tracking-[0.3em] font-black mb-0.5">Player Statistics</div>
                                                    <div className="text-xl font-black text-white flex items-center gap-2">
                                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-white">{user?.name || 'Explorer'}</span>
                                                        <span className="text-[10px] py-0.5 px-2 bg-[#00ffff]/20 text-[#00ffff] rounded-full border border-[#00ffff]/30">LVL 42</span>
                                                    </div>
                                                    <div className="text-xs text-white/40 font-vt323 tracking-widest uppercase mt-0.5">MITS-SYSTEMS IDENTIFIED</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                {epassUrl && (
                                                    <Button
                                                        onClick={() => setStep('success')}
                                                        className="h-10 rounded-xl text-xs bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/40 px-5 font-black uppercase tracking-wider backdrop-blur-sm shadow-[0_4px_15px_-3px_rgba(34,197,94,0.2)]"
                                                    >
                                                        OPEN E-PASS
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={handleLogout}
                                                    variant="outline"
                                                    className="h-10 rounded-xl text-xs border-[#ff00ff]/50 bg-black/40 hover:bg-[#ff00ff]/20 hover:border-[#ff00ff] text-white transition-all shadow-[0_4px_15px_-3px_rgba(255,0,255,0.2)] font-black tracking-widest px-5 uppercase"
                                                >
                                                    LOGOUT
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-center mb-10">
                                            <div className="inline-block relative">
                                                <h2 className="mb-4 tracking-tighter uppercase px-8" style={{
                                                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                    fontSize: 'clamp(14px, 4vw, 20px)',
                                                    color: '#fff',
                                                    textShadow: '0 0 10px #ff00ff, 0 0 20px #8a2be2'
                                                }}>
                                                    COMMAND CENTER
                                                </h2>
                                                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent shadow-[0_0_10px_#00ffff]" />
                                            </div>
                                            <p className="text-xs text-[#00ffff] uppercase tracking-[0.4em] mt-6 font-black opacity-80">Initialize protocol: Select one event to proceed</p>
                                        </div>

                                        {!user && (
                                            <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl">
                                                <p className="text-yellow-500 text-sm mb-2 font-vt323">Session incomplete. Please re-authenticate for full access.</p>
                                                <Button onClick={handleLogout} size="sm" variant="outline" className="h-8 text-[10px] border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                                                    RE-LOGIN
                                                </Button>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar p-2">
                                            {events.length === 0 && (
                                                <div className="col-span-full text-center py-16 flex flex-col items-center gap-4">
                                                    <div className="w-16 h-16 border-4 border-[#ff00ff]/20 border-t-[#ff00ff] rounded-full animate-spin" />
                                                    <p className="text-white/40 text-sm font-vt323 tracking-widest uppercase">{loading ? 'Accessing Secure Database...' : 'No active events found.'}</p>
                                                </div>
                                            )}
                                            {events.map((event) => {
                                                const isRegistered = registeredEventIds.includes(event.id);
                                                const isSelected = selectedEventId === event.id;
                                                return (
                                                    <motion.div
                                                        key={event.id}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className={`group relative overflow-hidden border-2 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 h-full flex flex-col ${isRegistered
                                                            ? 'border-green-500/30 bg-green-500/5 cursor-not-allowed grayscale-[0.6] opacity-80'
                                                            : isSelected
                                                                ? 'border-[#00ffff] bg-gradient-to-br from-[#00ffff]/10 to-indigo-900/40 shadow-[0_0_40px_rgba(0,255,255,0.2)]'
                                                                : 'border-white/10 bg-black/40 hover:border-[#ff00ff]/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,0,255,0.1)]'
                                                            }`}
                                                        onClick={() => !isRegistered && handleEventSelection(event.id)}
                                                    >
                                                        {isRegistered && (
                                                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[1px] pointer-events-none">
                                                                <div className="bg-green-500 text-black font-black text-[10px] py-1 px-4 rounded-full uppercase tracking-widest shadow-[0_0_15px_#22c55e]">
                                                                    Already Registered
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="absolute top-0 right-0 px-5 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 text-white/40 border-l border-b border-white/10">
                                                            {event.category}
                                                        </div>

                                                        <div className="flex flex-col gap-4 h-full relative z-0">
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-start gap-4">
                                                                    <div className="flex-1">
                                                                        <h3 className="text-lg sm:text-xl font-black tracking-tighter text-white leading-tight mb-1 group-hover:text-[#00ffff] transition-colors">
                                                                            {event.name}
                                                                        </h3>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff00ff] shadow-[0_0_5px_#ff00ff]" />
                                                                            <p className="text-[10px] text-[#ff00ff]/80 font-black uppercase tracking-widest">{event.club}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className={`text-2xl font-black ${event.fee === 0 ? 'text-green-400' : 'text-white'}`}>
                                                                            {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                                                                        </div>
                                                                        {event.prizePool && (
                                                                            <div className="text-[9px] bg-yellow-400/20 text-yellow-400 px-2.5 py-1 rounded-lg font-black border border-yellow-400/30 whitespace-nowrap mt-1">
                                                                                🏆 {event.prizePool}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-medium">
                                                                    {event.description}
                                                                </p>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-white/5">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                                                                    <span className="text-sm opacity-60">📅</span> {event.date}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                                                                    <span className="text-sm opacity-60">📍</span> {event.venue}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider truncate">
                                                                    <span className="text-sm opacity-60">👥</span> {event.isTeamEvent ? `TEAM (${event.teamSize?.min}-${event.teamSize?.max})` : 'SOLO'}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                                                                    <span className="text-sm opacity-60">🎫</span> {event.currentRegistrations}/{event.maxParticipants}
                                                                </div>
                                                            </div>

                                                            <div className="mt-2">
                                                                {isRegistered ? (
                                                                    <div className="w-full py-2.5 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2">
                                                                        <span className="text-xs">✓</span> ENROLLED SUCCESS
                                                                    </div>
                                                                ) : (
                                                                    <div className={`w-full py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center transition-all ${isSelected ? 'bg-gradient-to-r from-[#00ffff] to-[#0088ff] text-black shadow-[0_0_20px_rgba(0,255,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/10'}`}>
                                                                        {isSelected ? 'ACCESS GRANTED' : 'SELECT PROTOCOL'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
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
                                                        <h3 className="text-base font-black text-[#00ffff] uppercase tracking-widest mb-1">Payment Strategy</h3>
                                                        <p className="text-xs text-white/50">{events.find(e => e.id === selectedEventId)?.name}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl font-black text-white">₹{events.find(e => e.id === selectedEventId)?.fee}</div>
                                                        <div className="text-xs text-[#ff00ff] font-bold uppercase">Total Payable</div>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleProceedToPayment}
                                                    disabled={loading}
                                                    className="w-full h-12 rounded-full font-black text-sm uppercase tracking-widest border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all hover:scale-[1.02] active:scale-95"
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
                                    className="relative p-6 sm:p-8 rounded-2xl w-full max-w-2xl mx-auto"
                                    style={{
                                        background: 'linear-gradient(145deg, #1a0a2e 0%, #120830 50%, #0d0520 100%)',
                                        border: '2px solid rgba(0,255,0,0.5)',
                                        boxShadow: '0 0 50px rgba(0,255,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="text-center mb-8">
                                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500 shadow-[0_0_30px_#22c55e]">
                                                <span className="text-4xl text-green-500">✓</span>
                                            </div>
                                            <h2 className="mb-4 tracking-tighter uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: 'clamp(12px, 3vw, 18px)',
                                                color: '#22c55e',
                                                textShadow: '0 0 10px rgba(34,197,94,0.5)'
                                            }}>
                                                REGISTRATION CONFIRMED
                                            </h2>
                                            <div className="h-1 w-full relative overflow-hidden rounded-full bg-green-950/30">
                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                    className="absolute inset-0 w-1/3 bg-green-500 shadow-[0_0_15px_#22c55e]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">E-Pass Token</span>
                                                    <span className="text-[10px] py-1 px-3 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 font-black">VALIDATED</span>
                                                </div>

                                                {qrCodeData && (
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="p-6 bg-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                                            <QRCode
                                                                value={qrCodeData}
                                                                size={180}
                                                                level="H"
                                                            />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-xs text-white/70 mb-6 max-w-xs uppercase tracking-wider leading-relaxed">
                                                                Present this QR code at the venue entry for immediate access to Aarunya 2026.
                                                            </p>
                                                            <Button
                                                                onClick={() => downloadQRCode(qrCodeData, `aarunya-epass-${user.enrollment_no}.png`)}
                                                                className="w-full h-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-[#00ffff] hover:text-black transition-all shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)]"
                                                            >
                                                                DOWNLOAD DIGITAL PASS
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-center mt-6">
                                                <p className="text-sm font-black uppercase tracking-[0.2em]" style={{
                                                    color: '#00ffff',
                                                    textShadow: '0 0 10px rgba(0,255,255,0.5)'
                                                }}>
                                                    YOU WILL GET YOUR PASS AT THE VENUE
                                                </p>
                                            </div>

                                            <div className="flex justify-center mt-8">
                                                <Button
                                                    onClick={handleLogout}
                                                    variant="ghost"
                                                    className="h-12 px-8 rounded-2xl text-white/40 font-black uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                                                >
                                                    TERMINATE SESSION
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