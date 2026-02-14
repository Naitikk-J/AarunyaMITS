import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { RetroButton } from '@/components/ui/retro-button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '@/lib/api';



interface StudentFormData {
    name: string;
    email: string;
    mobileNumber: string;
    enrollmentNo: string;
    collegeName: string;
    city: string;
    state: string;
    collegeId: string;
    referralCode?: string;
    quantity: number;
}


import { useRazorpay } from '@/hooks/useRazorpay';
import { paymentApi } from '@/lib/api';

export default function Register() {
    const [registrationType, setRegistrationType] = useState<'student' | 'event'>('student');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [participantId, setParticipantId] = useState('');
    const [paymentDetails, setPaymentDetails] = useState<any>(null);
    const [generatedReferralCode, setGeneratedReferralCode] = useState('');
    const navigate = useNavigate();
    const { openPaymentModal } = useRazorpay();

    // Student form state
    const [studentForm, setStudentForm] = useState<StudentFormData>({
        name: '',
        email: '',
        mobileNumber: '',
        enrollmentNo: '',
        collegeName: '',
        city: '',
        state: '',
        collegeId: '',
        referralCode: '',
        quantity: 1
    });


    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const inputStyle = {
        backgroundColor: '#120830',
        borderColor: '#44ddff',
        boxShadow: '0 0 6px rgba(0,255,255,0.15)',
        color: '#ffffff'
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,255,0.3), 0 0 20px rgba(255,0,255,0.15)';
        e.currentTarget.style.borderColor = '#ff55ff';
        e.currentTarget.style.backgroundColor = '#1a0c40';
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.boxShadow = '0 0 6px rgba(0,255,255,0.15)';
        e.currentTarget.style.borderColor = '#44ddff';
        e.currentTarget.style.backgroundColor = '#120830';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (2MB = 2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error('File size too large. Maximum size is 2MB.');
            e.target.value = ''; // Reset input
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setStudentForm(prev => ({ ...prev, collegeId: base64String }));
            toast.success('College ID uploaded and processed.');
        };
        reader.readAsDataURL(file);
    };



    const handleStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Prepare data from studentForm state
        const payload: any = {
            email: studentForm.email,
            name: studentForm.name,
            phone: studentForm.mobileNumber,
            college: studentForm.collegeName,
            enrollmentNumber: studentForm.enrollmentNo,
            collegeIdBase64: studentForm.collegeId,
            city: studentForm.city,
            state: studentForm.state,
            category: 'external'
        };

        if (studentForm.referralCode) {
            payload.referralCode = studentForm.referralCode;
        }

        try {
            const response = await authApi.onboardExternalParticipant(payload);
            const data = response.data.data?.participant || response.data.data || response.data;
            const pId = data._id || data.id;

            setParticipantId(pId);
            toast.success('Registration successful!');

            if (studentForm.referralCode) {
                setStep(5);
                toast.info('Registration via referral code. Payment skipped.');
            } else {
                setStep(2);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Onboarding failed.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePayment = async () => {
        setLoading(true);
        try {
            const response = await paymentApi.createPaymentLink({
                participantId,
                participantType: 'ExternalParticipant',
                paymentType: 'pass',
                quantity: studentForm.quantity,
            });

            const paymentData = response.data.data || response.data;
            setPaymentDetails(paymentData);
            toast.success('Payment order created!');
            setStep(3);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Payment creation failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!paymentDetails) return;

        setLoading(true);
        try {
            await openPaymentModal(
                paymentDetails.orderId,
                paymentDetails.amount / 100, // already in paise from backend usually, but snippet says /100?
                paymentDetails.currency || 'INR',
                "Aarunya '24",
                `Payment for ${studentForm.quantity} Pass(es)`,
                async (response: any) => {
                    try {
                        const verifyResponse = await paymentApi.verifyPaymentExternal({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            participantId,
                        });

                        const vData = verifyResponse.data.data || verifyResponse.data;
                        if (vData.referralCode) {
                            setGeneratedReferralCode(vData.referralCode);
                        }

                        toast.success('Payment verified successfully!');
                        setStep(4);
                    } catch (error: any) {
                        toast.error(error.response?.data?.message || 'Payment verification failed');
                    }
                }
            );
        } catch (error: any) {
            toast.error('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-[#ff00ff] selection:text-black overflow-x-hidden">
            <MainNavigation />

            <div className="content-scale">
                {/* MAIN LAYOUT */}
                <main className="min-h-[calc(100vh-100px)] flex flex-col lg:flex-row">
                    {/* LEFT SIDEBAR - BUTTONS */}
                    <div className="lg:w-1/3 flex flex-col justify-start items-center lg:items-start pt-20 lg:pt-32 px-4 sm:px-8">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full flex flex-col gap-4"
                        >
                            <div className="text-center lg:text-left mb-6">
                                <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4" style={{
                                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                                    color: '#fff5ff',
                                    textShadow: '0 0 15px #8a6c8a, 2px 2px 0 #880088'
                                }}>
                                    <GlitchText text="REGISTER" />
                                </h1>
                                <div className="h-0.5 w-16 mb-4" style={{
                                    background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                    boxShadow: '0 0 15px #ff00ff, 0 0 10px #00ffff'
                                }} />
                                <p className="text-sm sm:text-base font-vt323 leading-relaxed tracking-wider" style={{
                                    color: '#00ffff',
                                    textShadow: '1px 1px 0 #003333'
                                }}>
                                    // INSERT CREDENTIALS TO JOIN THE AARUNYA NETWORK
                                </p>
                            </div>

                            {/* REGISTRATION TYPE BUTTONS - STACKED */}
                            <div className="flex flex-col gap-4 w-full sm:max-w-xs lg:max-w-none">
                                <RetroButton
                                    variant={registrationType === 'student' ? 'default' : 'white'}
                                    onClick={() => setRegistrationType('student')}
                                    className="w-full justify-start text-left "
                                >
                                    Non-MITS Students
                                </RetroButton>
                                <RetroButton
                                    variant="white"
                                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScJVxRKU2EBzHgLrhTcMS1d7IqE8UhUGyX_CWCR9gIqSFCDeA/viewform?usp=preview', '_blank')}
                                    className="w-full justify-start text-left"
                                >
                                    MITS Alumni
                                </RetroButton>
                                <RetroButton
                                    variant={registrationType === 'event' ? 'default' : 'white'}
                                    onClick={() => {
                                        // Redirect to the new unified registration system
                                        navigate('/unified-registration');
                                    }}
                                    className="w-full justify-start text-left"
                                >
                                    Event/Competition Registrations
                                </RetroButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE - FORM */}
                    <div className="lg:w-2/3 flex items-start justify-center pt-12 lg:pt-32 px-4 sm:px-6 pb-20">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-lg"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="relative p-6 sm:p-8 rounded-2xl"
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
                                    {/* TITLE */}
                                    <div className="text-center mb-6">
                                        <div className="text-3xl sm:text-4xl mb-4" style={{
                                            color: '#00ffff',
                                            textShadow: '0 0 10px #00ffff'
                                        }}>
                                            🎮
                                        </div>

                                        <h2 className="mb-2 tracking-tight uppercase" style={{
                                            fontFamily: '"Press Start 2P", "Courier New", monospace',
                                            fontSize: '14px',
                                            color: '#ff00ff',
                                            textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                        }}>
                                            PLAYER REGISTRATION
                                        </h2>

                                        <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                            background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                            boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                        }} />

                                        <p className="font-vt323 text-sm sm:text-base mt-3 uppercase tracking-wider" style={{
                                            color: '#00ffff',
                                            textShadow: '1px 1px 0 #003333'
                                        }}>
                                            Initialize your account to access exclusive features.
                                        </p>
                                    </div>

                                    {/* Error Display */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm font-vt323">
                                            {error}
                                        </div>
                                    )}

                                    {/* STUDENT FORM STEPS */}
                                    {registrationType === 'student' && (
                                        <div className="space-y-4">
                                            {step === 1 && (
                                                <form className="space-y-4" onSubmit={handleStudentSubmit}>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Full Name
                                                        </Label>
                                                        <Input
                                                            name="name"
                                                            value={studentForm.name}
                                                            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="Your Full Name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Email Address
                                                        </Label>
                                                        <Input
                                                            name="email"
                                                            type="email"
                                                            value={studentForm.email}
                                                            onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="student@college.com"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Mobile Number
                                                        </Label>
                                                        <Input
                                                            name="mobileNumber"
                                                            type="tel"
                                                            value={studentForm.mobileNumber}
                                                            onChange={(e) => setStudentForm({ ...studentForm, mobileNumber: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="+91 1234567890"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Enrollment Number
                                                        </Label>
                                                        <Input
                                                            name="enrollmentNo"
                                                            value={studentForm.enrollmentNo}
                                                            onChange={(e) => setStudentForm({ ...studentForm, enrollmentNo: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="Your Enrollment No."
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            College Name
                                                        </Label>
                                                        <Input
                                                            name="collegeName"
                                                            value={studentForm.collegeName}
                                                            onChange={(e) => setStudentForm({ ...studentForm, collegeName: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="Your College Name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5 group">
                                                            <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                                City
                                                            </Label>
                                                            <Input
                                                                name="city"
                                                                value={studentForm.city}
                                                                onChange={(e) => setStudentForm({ ...studentForm, city: e.target.value })}
                                                                className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                                style={inputStyle}
                                                                onFocus={handleInputFocus}
                                                                onBlur={handleInputBlur}
                                                                placeholder="City"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5 group">
                                                            <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                                State
                                                            </Label>
                                                            <Input
                                                                name="state"
                                                                value={studentForm.state}
                                                                onChange={(e) => setStudentForm({ ...studentForm, state: e.target.value })}
                                                                className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                                style={inputStyle}
                                                                onFocus={handleInputFocus}
                                                                onBlur={handleInputBlur}
                                                                placeholder="State"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Referral Code (Optional)
                                                        </Label>
                                                        <Input
                                                            name="referralCode"
                                                            value={studentForm.referralCode}
                                                            onChange={(e) => setStudentForm({ ...studentForm, referralCode: e.target.value })}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all placeholder:text-white/30"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            placeholder="TEAM-XXXX"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff66ff] transition-colors uppercase tracking-widest" style={{ color: '#33ffff', textShadow: '0 0 6px rgba(0,255,255,0.3)' }}>
                                                            Upload College ID (Max 2MB)
                                                        </Label>
                                                        <Input
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={handleFileChange}
                                                            className="border-2 font-vt323 text-sm sm:text-base h-11 rounded-md transition-all file:bg-transparent file:text-white file:border-0 file:font-vt323 file:mr-4 cursor-pointer"
                                                            style={inputStyle}
                                                            onFocus={handleInputFocus}
                                                            onBlur={handleInputBlur}
                                                            required
                                                        />
                                                        {studentForm.collegeId && (
                                                            <p className="text-xs text-green-400 mt-1 uppercase">ID Uploaded ✓</p>
                                                        )}
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="relative w-full border border-[#ff00ff]/60 text-white font-bold mt-4 uppercase tracking-wider disabled:opacity-50 h-12 rounded-xl hover:scale-[1.02] active:scale-95 transition-all"
                                                        style={{ background: 'linear-gradient(135deg, #e600e6, #b300b3)', boxShadow: '0 0 20px rgba(255,0,255,0.3)', fontSize: '14px' }}
                                                    >
                                                        {loading ? 'PROCESSING...' : 'INITIALIZE ONBOARDING'}
                                                    </Button>
                                                </form>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-6 pt-4 text-center">
                                                    <h3 className="text-xl font-bold text-[#00ffff]">STEP 2: SELECT PASS QUANTITY</h3>
                                                    <div className="space-y-1.5 text-left group">
                                                        <Label className="font-vt323 text-sm sm:text-base group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                            Quantity (Bulk Purchase)
                                                        </Label>
                                                        <select
                                                            className="w-full h-12 px-4 border-2 font-vt323 text-base rounded-full bg-[#0d0520] text-white border-[#00ffff] focus:border-[#ff00ff] transition-all outline-none"
                                                            value={studentForm.quantity}
                                                            onChange={(e) => setStudentForm({ ...studentForm, quantity: Number(e.target.value) })}
                                                        >
                                                            <option value={1}>1 Pass - ₹{import.meta.env.VITE_EXTERNAL_PASS_PRICE || 2000}</option>
                                                            <option value={2}>2 Passes - ₹{(import.meta.env.VITE_EXTERNAL_PASS_BULK_2_PRICE || 1500) * 2} (₹{import.meta.env.VITE_EXTERNAL_PASS_BULK_2_PRICE || 1500} each)</option>
                                                            <option value={3}>3 Passes - ₹{(import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000) * 3} (₹{import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000} each)</option>
                                                            <option value={4}>4 Passes - ₹{(import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000) * 4} (₹{import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000} each)</option>
                                                            <option value={5}>5 Passes - ₹{(import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000) * 5} (₹{import.meta.env.VITE_EXTERNAL_PASS_BULK_3_PLUS_PRICE || 1000} each)</option>
                                                        </select>
                                                    </div>
                                                    <Button
                                                        onClick={handleCreatePayment}
                                                        disabled={loading}
                                                        className="relative w-full border border-[#ff00ff]/60 text-white font-bold uppercase tracking-wider disabled:opacity-50 h-12 rounded-xl hover:scale-[1.02] active:scale-95 transition-all"
                                                        style={{ background: 'linear-gradient(135deg, #e600e6, #b300b3)', boxShadow: '0 0 20px rgba(255,0,255,0.3)', fontSize: '14px' }}
                                                    >
                                                        {loading ? 'CREATING ORDER...' : 'CREATE PAYMENT ORDER'}
                                                    </Button>
                                                </div>
                                            )}

                                            {step === 3 && paymentDetails && (
                                                <div className="space-y-6 pt-4 text-center">
                                                    <h3 className="text-xl font-bold text-[#00ffff]">STEP 3: COMPLETE PAYMENT</h3>
                                                    <div className="p-4 bg-white/5 border border-[#ff00ff]/30 rounded-xl space-y-2">
                                                        <p className="text-base text-white/50 uppercase tracking-widest">Order Summary</p>
                                                        <p className="text-2xl font-bold text-[#ff00ff]">₹{paymentDetails.amount / 100}</p>
                                                        <p className="text-sm text-[#00ffff]">{studentForm.quantity} Pass(es) for {studentForm.name}</p>
                                                    </div>
                                                    <Button
                                                        onClick={handlePayment}
                                                        disabled={loading}
                                                        className="relative w-full border border-[#00ff00]/60 text-white font-bold uppercase tracking-wider disabled:opacity-50 h-12 rounded-xl hover:scale-[1.02] active:scale-95 transition-all"
                                                        style={{ background: 'linear-gradient(135deg, #00e600, #00aa00)', boxShadow: '0 0 20px rgba(0,255,0,0.3)', fontSize: '14px' }}
                                                    >
                                                        {loading ? 'PROCESSING...' : 'PAY NOW'}
                                                    </Button>
                                                </div>
                                            )}

                                            {(step === 4 || step === 5) && (
                                                <div className="space-y-6 py-6 text-center animate-in fade-in zoom-in duration-500">
                                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500 shadow-[0_0_15px_#22c55e]">
                                                        <span className="text-2xl text-green-500">✓</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-green-400">
                                                        {step === 5 ? 'REFERRAL SUCCESSFUL!' : 'PAYMENT SUCCESSFUL!'}
                                                    </h3>

                                                    {generatedReferralCode && (
                                                        <div className="p-4 bg-purple-900/20 border-2 border-purple-500 rounded-xl space-y-2">
                                                            <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">🎉 Your Referral Code</p>
                                                            <p className="text-3xl font-black text-white tracking-[0.2em]">{generatedReferralCode}</p>
                                                            <p className="text-xs text-purple-300/70">Share this with your team members to skip payment!</p>
                                                        </div>
                                                    )}

                                                    <div className="p-3 bg-white/5 border border-[#00ffff]/30 rounded-lg">
                                                        <p className="text-xs text-white/50 uppercase tracking-widest">Aarunya ID</p>
                                                        <p className="text-xl font-bold text-[#00ffff]">{participantId}</p>
                                                    </div>

                                                    <p className="text-sm text-white/70">
                                                        {step === 5
                                                            ? 'Your registration is confirmed via referral. An admin will verify your details soon.'
                                                            : 'Your payment is confirmed.'}
                                                    </p>

                                                    <p className="text-base font-bold uppercase tracking-widest mt-2" style={{
                                                        color: '#00ffff',
                                                        textShadow: '0 0 10px #00ffff'
                                                    }}>
                                                        YOU WILL GET YOUR PASS AT THE VENUE
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}


                                    {/* EVENT REGISTRATION - Redirect Message */}
                                    {registrationType === 'event' && (
                                        <div className="text-center py-8">
                                            <p className="text-sm text-white/70 mb-4">Redirecting to Event Registration...</p>
                                        </div>
                                    )}

                                    {/* STATUS */}
                                    <div className="mt-6 text-center pt-4" style={{ borderTop: '1px dashed #ff00ff' }}>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="font-vt323 text-sm sm:text-base uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                System Status
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #00ff00' }} />
                                                <span className="font-vt323 text-sm sm:text-base font-bold tracking-widest" style={{ color: '#00ff00', textShadow: '0 0 8px #00ff00' }}>
                                                    Online
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>

                {/* BOTTOM LINE */}
                <div className="fixed bottom-0 left-0 w-full h-1 flex">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 h-full"
                            style={{
                                background: i % 2 === 0
                                    ? 'linear-gradient(to bottom, #ff00ff, #cc00cc)'
                                    : 'linear-gradient(to bottom, #00ffff, #0088ff)',
                                boxShadow: i % 2 === 0
                                    ? '0 0 8px #ff00ff'
                                    : '0 0 8px #00ffff'
                            }}
                        />
                    ))}
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        ` }} />
            </div>
        </div>
    );
}
