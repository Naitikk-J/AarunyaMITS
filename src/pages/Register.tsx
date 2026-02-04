import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { RetroButton } from '@/components/ui/retro-button';
import { useState } from 'react';

export default function Register() {
    const [registrationType, setRegistrationType] = useState<'student' | 'alumni' | 'guest' | 'event'>('student');
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
        backgroundColor: '#0d0520',
        borderColor: '#00ffff',
        boxShadow: 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'
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
                                <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-4" style={{
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
                                <p className="text-[10px] sm:text-xs font-vt323 leading-relaxed tracking-wider" style={{
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
                                    Other College Students
                                </RetroButton>
                                <RetroButton
                                    variant={registrationType === 'alumni' ? 'default' : 'white'}
                                    onClick={() => setRegistrationType('alumni')}
                                    className="w-full justify-start text-left"
                                >
                                    MITS Alumni
                                </RetroButton>
                                <RetroButton
                                    variant={registrationType === 'guest' ? 'default' : 'white'}
                                    onClick={() => setRegistrationType('guest')}
                                    className="w-full justify-start text-left"
                                >
                                    Guests
                                </RetroButton>
                                <RetroButton
                                    variant={registrationType === 'event' ? 'default' : 'white'}
                                    onClick={() => setRegistrationType('event')}
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
                                className="relative p-6 sm:p-8"
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
                                            fontSize: '11px',
                                            color: '#ff00ff',
                                            textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                        }}>
                                            PLAYER REGISTRATION
                                        </h2>

                                        <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                            background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                            boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                        }} />

                                        <p className="font-vt323 text-[10px] sm:text-xs mt-3 uppercase tracking-wider" style={{
                                            color: '#00ffff',
                                            textShadow: '1px 1px 0 #003333'
                                        }}>
                                            Initialize your account to access exclusive features.
                                        </p>
                                    </div>

                                    {/* INPUTS */}
                                    {registrationType === 'student' && (
                                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    College Name
                                                </Label>
                                                <Input
                                                    className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20"
                                                    style={inputStyle}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                        e.currentTarget.style.borderColor = '#ff00ff';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                        e.currentTarget.style.borderColor = '#00ffff';
                                                    }}
                                                    placeholder="Your College Name"
                                                />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    College ID
                                                </Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your College ID" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    Course
                                                </Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your Course" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    Year of Study
                                                </Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="e.g., 2nd Year" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    Email Address
                                                </Label>
                                                <Input type="email" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="student@college.com" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                    Password
                                                </Label>
                                                <Input type="password" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="••••••••" />
                                            </div>
                                            <Button className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-4 uppercase tracking-wider" style={{ background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)', boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff', fontSize: '9px' }}>
                                                REGISTER AS COLLEGE STUDENT
                                            </Button>
                                        </form>
                                    )}

                                    {registrationType === 'alumni' && (
                                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Graduation Year</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Year of Graduation" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Department</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your Department" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}></Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your Current Organization/Position" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Email Address</Label>
                                                <Input type="email" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="alumni@mitscollege.com" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Password</Label>
                                                <Input type="password" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="••••••••" />
                                            </div>
                                            <Button className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-4 uppercase tracking-wider" style={{ background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)', boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff', fontSize: '9px' }}>
                                                REGISTER AS MITS ALUMNI
                                            </Button>
                                        </form>
                                    )}

                                    {registrationType === 'guest' && (
                                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Full Name</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your Full Name" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Contact Number</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="+91 1234567890" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Email Address</Label>
                                                <Input type="email" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="guest@email.com" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Purpose of Visit</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="e.g., Attending event, Guest lecture" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Password</Label>
                                                <Input type="password" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="••••••••" />
                                            </div>
                                            <Button className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-4 uppercase tracking-wider" style={{ background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)', boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff', fontSize: '9px' }}>
                                                REGISTER AS GUEST
                                            </Button>
                                        </form>
                                    )}

                                    {registrationType === 'event' && (
                                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Event/Competition Name</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Name of Event/Competition" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Team Name</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your Team Name" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Team Members</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Names of Team Members" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>College/Organization</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="Your College/Organization" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Contact Email</Label>
                                                <Input type="email" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="team@college.com" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Contact Number</Label>
                                                <Input className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="+91 1234567890" />
                                            </div>
                                            <div className="space-y-1.5 group">
                                                <Label className="font-vt323 text-xs sm:text-[13px] group-focus-within:text-[#ff00ff] transition-colors uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>Password</Label>
                                                <Input type="password" className="border-2 font-vt323 text-xs sm:text-sm h-10 transition-all placeholder:text-white/20" style={inputStyle} onFocus={(e) => { e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff'; e.currentTarget.style.borderColor = '#ff00ff'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'; e.currentTarget.style.borderColor = '#00ffff'; }} placeholder="••••••••" />
                                            </div>
                                            <Button className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-4 uppercase tracking-wider" style={{ background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)', boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff', fontSize: '9px' }}>
                                                REGISTER FOR EVENT/COMPETITION
                                            </Button>
                                        </form>
                                    )}

                                    {/* STATUS */}
                                    <div className="mt-6 text-center pt-4" style={{ borderTop: '1px dashed #ff00ff' }}>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="font-vt323 text-xs sm:text-sm uppercase tracking-widest" style={{ color: '#00ffff', textShadow: '1px 1px 0 #003333' }}>
                                                System Status
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #00ff00' }} />
                                                <span className="font-vt323 text-xs sm:text-sm font-bold tracking-widest" style={{ color: '#00ff00', textShadow: '0 0 8px #00ff00' }}>
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
