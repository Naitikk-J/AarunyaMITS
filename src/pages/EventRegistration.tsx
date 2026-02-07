import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { RetroButton } from '@/components/ui/retro-button';
import { events } from '@/data/events';

export default function EventRegistration() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [registrationStep, setRegistrationStep] = useState<'dashboard' | 'form'>('dashboard');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        year: '',
        teamName: '',
        teamMembers: [''],
        paymentMethod: 'upi'
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
        backgroundColor: '#0d0520',
        borderColor: '#00ffff',
        boxShadow: 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'
    };

    const formContainerStyle = {
        background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0520 100%)',
        border: '2px solid #ff00ff',
        boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 20px #ff00ff, 0 0 40px #00ffff',
        borderRadius: '12px'
    };

    const sectionHeaderStyle = {
        color: '#00ffff',
        textShadow: '0 0 10px #00ffff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '16px',
        textTransform: 'uppercase' as const,
        letterSpacing: '2px'
    };

    const inputGroupStyle = {
        marginBottom: '16px'
    };

    const labelStyle = {
        color: '#00ffff',
        textShadow: '1px 1px 0 #003333',
        fontSize: '11px',
        fontWeight: 'bold',
        marginBottom: '6px',
        display: 'block',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px'
    };

    const inputFieldStyle = {
        ...inputStyle,
        width: '100%',
        padding: '12px',
        fontSize: '14px',
        borderRadius: '6px',
        transition: 'all 0.3s ease'
    };

    const handleEventSelect = (eventId: string) => {
        setSelectedEvent(eventId);
        setRegistrationStep('form');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration submitted:', { ...formData, eventId: selectedEvent });
        // Here you would typically send this data to your backend
        alert('Registration successful! Please proceed to payment.');
    };

    const addTeamMember = () => {
        setFormData(prev => ({
            ...prev,
            teamMembers: [...prev.teamMembers, '']
        }));
    };

    const updateTeamMember = (index: number, value: string) => {
        const newMembers = [...formData.teamMembers];
        newMembers[index] = value;
        setFormData(prev => ({
            ...prev,
            teamMembers: newMembers
        }));
    };

    const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-[#ff00ff] selection:text-black overflow-x-hidden">
            <MainNavigation />

            <div className="content-scale">
                {/* MAIN LAYOUT */}
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
                                    <GlitchText text="EVENT REGISTRATION" />
                                </h1>
                                <div className="h-0.5 w-16 mb-4" style={{
                                    background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                    boxShadow: '0 0 15px #ff00ff, 0 0 10px #00ffff'
                                }} />
                                <p className="text-[10px] sm:text-xs font-vt323 leading-relaxed tracking-wider" style={{
                                    color: '#00ffff',
                                    textShadow: '1px 1px 0 #003333'
                                }}>
                                    // REGISTER FOR EVENTS AND COMPETITIONS
                                </p>
                            </div>

                            {/* NAVIGATION BUTTONS */}
                            <div className="flex flex-col gap-4 w-full sm:max-w-xs lg:max-w-none">
                                <RetroButton
                                    variant={registrationStep === 'dashboard' ? 'default' : 'white'}
                                    onClick={() => setRegistrationStep('dashboard')}
                                    className="w-full justify-start text-left"
                                >
                                    Events Dashboard
                                </RetroButton>
                                <RetroButton
                                    variant={registrationStep === 'form' ? 'default' : 'white'}
                                    onClick={() => setRegistrationStep('form')}
                                    className="w-full justify-start text-left"
                                    disabled={!selectedEvent}
                                >
                                    Registration Form
                                </RetroButton>
                                <RetroButton
                                    variant="white"
                                    onClick={() => {
                                        setSelectedEvent(null);
                                        setRegistrationStep('dashboard');
                                    }}
                                    className="w-full justify-start text-left"
                                >
                                    Back to Dashboard
                                </RetroButton>
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
                            {registrationStep === 'dashboard' && (
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
                                                EVENTS DASHBOARD
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                        </div>

                                        {/* EVENTS LIST */}
                                        <div className="space-y-4">
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="border border-white/20 rounded-lg p-4 cursor-pointer hover:border-[#00ffff] transition-all"
                                                    onClick={() => handleEventSelect(event.id)}
                                                    style={{
                                                        background: selectedEvent === event.id ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                                                        boxShadow: selectedEvent === event.id ? '0 0 10px rgba(0, 255, 255, 0.3)' : 'none'
                                                    }}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-sm" style={{ color: '#00ffff' }}>
                                                            {event.title}
                                                        </h3>
                                                        <Badge variant="outline" className="text-xs" style={{
                                                            borderColor: '#00ffff',
                                                            color: '#00ffff',
                                                            backgroundColor: 'rgba(0, 255, 255, 0.1)'
                                                        }}>
                                                            {event.status.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-white/70 mb-2">{event.description}</p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {event.tags.map(tag => (
                                                            <Badge key={tag} variant="secondary" className="text-xs" style={{
                                                                backgroundColor: 'rgba(255, 0, 255, 0.2)',
                                                                color: '#ff00ff',
                                                                borderColor: '#ff00ff'
                                                            }}>
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 text-xs text-white/50">
                                                        🏛️ {event.building} • 📅 {event.date} • ⏰ {event.time}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {registrationStep === 'form' && selectedEvent && (
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

                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl sm:text-4xl mb-4" style={{
                                                color: '#00ffff',
                                                textShadow: '0 0 10px #00ffff'
                                            }}>
                                                📝
                                            </div>
                                            <h2 className="mb-2 tracking-tight uppercase" style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '11px',
                                                color: '#ff00ff',
                                                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
                                            }}>
                                                REGISTRATION FORM
                                            </h2>
                                            <div className="h-0.5 w-full relative overflow-hidden rounded-full" style={{
                                                background: 'linear-gradient(to right, #ff00ff, #00ffff)',
                                                boxShadow: 'inset 0 0 4px #ff00ff, 0 0 8px #00ffff'
                                            }} />
                                            <p className="font-vt323 text-xs mt-3 uppercase tracking-wider" style={{
                                                color: '#00ffff',
                                                textShadow: '1px 1px 0 #003333'
                                            }}>
                                                Registering for: {selectedEventData?.title}
                                            </p>
                                        </div>

                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            {/* Personal Information Section */}
                                            <div style={formContainerStyle} className="p-4">
                                                <h3 style={sectionHeaderStyle}>Personal Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div style={inputGroupStyle}>
                                                        <Label style={labelStyle}>Full Name</Label>
                                                        <Input
                                                            style={inputFieldStyle}
                                                            value={formData.name}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                            placeholder="Your Full Name"
                                                            required
                                                        />
                                                    </div>
                                                    <div style={inputGroupStyle}>
                                                        <Label style={labelStyle}>Email Address</Label>
                                                        <Input
                                                            type="email"
                                                            style={inputFieldStyle}
                                                            value={formData.email}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                            placeholder="your@email.com"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div style={inputGroupStyle}>
                                                    <Label style={labelStyle}>Phone Number</Label>
                                                    <Input
                                                        type="tel"
                                                        style={inputFieldStyle}
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                            e.currentTarget.style.borderColor = '#ff00ff';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                            e.currentTarget.style.borderColor = '#00ffff';
                                                        }}
                                                        placeholder="+91 1234567890"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Event-Specific Fields */}
                                            {selectedEventData?.tags.includes('COMPETITION') && (
                                                <div style={formContainerStyle} className="p-4">
                                                    <h3 style={sectionHeaderStyle}>Team Information</h3>
                                                    <div style={inputGroupStyle}>
                                                        <Label style={labelStyle}>Team Name</Label>
                                                        <Input
                                                            style={inputFieldStyle}
                                                            value={formData.teamName}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                            placeholder="Your Team Name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label style={labelStyle}>Team Members</Label>
                                                        {formData.teamMembers.map((member, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <Input
                                                                    style={inputFieldStyle}
                                                                    value={member}
                                                                    onChange={(e) => updateTeamMember(index, e.target.value)}
                                                                    onFocus={(e) => {
                                                                        e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                        e.currentTarget.style.borderColor = '#ff00ff';
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                        e.currentTarget.style.borderColor = '#00ffff';
                                                                    }}
                                                                    placeholder={`Team Member ${index + 1}`}
                                                                />
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            onClick={addTeamMember}
                                                            className="w-full border-2 border-[#00ffff] text-white font-vt323 text-xs mt-2"
                                                            style={{
                                                                background: 'transparent',
                                                                boxShadow: 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff'
                                                            }}
                                                        >
                                                            + ADD TEAM MEMBER
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Educational Information Section */}
                                            <div style={formContainerStyle} className="p-4">
                                                <h3 style={sectionHeaderStyle}>Educational Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div style={inputGroupStyle}>
                                                        <Label style={labelStyle}>College/University</Label>
                                                        <Input
                                                            style={inputFieldStyle}
                                                            value={formData.college}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                            placeholder="Your College/University"
                                                            required
                                                        />
                                                    </div>
                                                    <div style={inputGroupStyle}>
                                                        <Label style={labelStyle}>Course</Label>
                                                        <Input
                                                            style={inputFieldStyle}
                                                            value={formData.course}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                                                            onFocus={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                                e.currentTarget.style.borderColor = '#ff00ff';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                                e.currentTarget.style.borderColor = '#00ffff';
                                                            }}
                                                            placeholder="Your Course"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div style={inputGroupStyle}>
                                                    <Label style={labelStyle}>Year</Label>
                                                    <Input
                                                        style={inputFieldStyle}
                                                        value={formData.year}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.boxShadow = 'inset -2px -2px 0 #003333, inset 2px 2px 0 #99ffff, 0 0 15px #00ffff, 0 0 25px #ff00ff';
                                                            e.currentTarget.style.borderColor = '#ff00ff';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.boxShadow = 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 8px #00ffff';
                                                            e.currentTarget.style.borderColor = '#00ffff';
                                                        }}
                                                        placeholder="e.g., 2nd Year"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="relative w-full border-2 border-[#ff00ff] text-white font-bold mt-4 uppercase tracking-wider"
                                                style={{
                                                    background: 'linear-gradient(to bottom, #ff00ff, #cc00cc)',
                                                    boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff',
                                                    fontSize: '9px'
                                                }}
                                            >
                                                REGISTER FOR {selectedEventData?.title.toUpperCase()}
                                            </Button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
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
            </div>
        </div>
    );
}