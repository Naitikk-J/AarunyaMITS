import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';
import { RESPONSIVE_NAV_HEIGHT, RESPONSIVE_BUTTON_SIZES } from '@/lib/responsive-styles';
import { MainNavigation } from '@/components/ui/MainNavigation';

export const Guidelines = () => {
    const location = useLocation();
    const { isMobile, isTablet, isDesktop, isTouch } = useResponsive();
    const [activeSection, setActiveSection] = useState('general');

    const sections = [
        { id: 'general', title: 'GENERAL RULES', icon: '' },
        { id: 'tech', title: 'Guidelines for MITS-DU Students', icon: '' },
        { id: 'creative', title: 'Guidelines for Students from Other Colleges / External Participants', icon: '' },
        { id: 'conduct', title: 'Guidelines Regarding Prize Pool', icon: '' }
    ];

    const guidelines = {
        general: [
            '1.⁠ ⁠All kinds of intoxicants, unauthorised objects, and weapons are strictly prohibited on the MITS-DU campus.',
            '2.⁠ ⁠Excess items such as handbags, carry bags, etc. must be validated by security.',
            '3.⁠ ⁠Team Aarunya may record photos and videos for promotional usage for the fest.',
            '4.⁠ ⁠Team Aarunya are not responsible for the loss, theft, or damage of personal belongings under any circumstances.',
            '5.⁠ ⁠Team Aarunya reserves the right to deny entry or remove any individual without prior notice on finding them doing anything suspicious or unauthorised activity.',
            '6.⁠ ⁠Event schedules, artists performance, and timings are subjected to differ due to unavoidable circumstances.'
        ],
        tech: [
            '1.⁠ ⁠For Entry & Identification:',
            '•⁠  ⁠A valid college ID card is mandatory for entry and validation by the security.',
            '•⁠  ⁠Under any circumstances, Team Aarunya will not permit the entry without a valid ID.',
            '',
            '2.⁠ ⁠Regarding Pass and Fee:',
            '•⁠  ⁠Aarunya-26 is a paid event and the passes would be provided by Team Aarunya and through website.',
            '•⁠  ⁠Passes are non-transferable and non-refundable.',
            '•⁠  ⁠Discounted pricing may be applicable for MITS-DU students, only if it is announced through official channels.',
            '•⁠  ⁠Any kind of recommendations are not welcome regarding free passes.',
            '',
            '3.⁠ ⁠Regarding Discipline during Aarunya-26:',
            '•⁠  ⁠All students must follow the college code of conduct and maintain the integrity of Aarunya-26.',
            '•⁠  ⁠Any misconduct may result in immediate removal from the venue and further disciplinary action against the preparator.',
            '',
            '4.⁠ ⁠Regarding Timings of the festival:',
            '•⁠  ⁠Entry is allowed only during the specified entry time.',
            '•⁠  ⁠Late entry may not be permitted.',
            '•⁠  ⁠The schedule and event timings would be provided by Team Aarunya, prior to the event day.',
            '',
            '5.⁠ ⁠Regarding Physical Damage to the MITS-DU Campus:',
            '•⁠  ⁠Any damage to college or event property will be recoverable from the student.',
            '•⁠  ⁠Failure to do so would result in legal action against the preparator.'
        ],
        creative: [
            '1.⁠ ⁠Entry & Identification',
            '•⁠  ⁠A valid college ID card and a government-issued ID are mandatory for the identification.',
            '•⁠  ⁠Entry is allowed only for registered and verified pass holders.',
            '•⁠  ⁠The entry of external students are permitted only from a designated entrance.',
            '',
            '2.⁠ ⁠Regarding Pass / Fee',
            '•⁠  ⁠Aarunya-26 is a paid event.',
            '•⁠  ⁠Passes are non-transferable and non-refundable.',
            '•⁠  ⁠Pricing for external participants may differ from internal students.',
            '•⁠  ⁠Any purchase made aside from Team Aarunya/Aarunya website are null and void.',
            '',
            '3.⁠ ⁠Regarding Security',
            '•⁠  ⁠All attendees will be subjected to mandatory security checks.',
            '•⁠  ⁠Restricted items are strictly prohibited.',
            '',
            '4.⁠ ⁠Regarding Discipline',
            '•⁠  ⁠Any misconduct will result in immediate removal from the venue. Failure to do so may result in legal actions against the individual.',
            '•⁠  ⁠Team Aarunya holds no responsibility for the actions of other external participants.',
            '',
            '5.⁠ ⁠Regarding Re-entry',
            '•⁠  ⁠Under any circumstances, re-entry would not be provided once a participant exits the venue.',
            '•⁠  ⁠Entry after 6:00 PM would be denied for all participants.',
            '',
            '6.⁠ ⁠Regarding Accommodations',
            '•⁠  ⁠They would only be provided to the individuals with Accommodation pass',
            '•⁠  ⁠The individuals must have their government IDs, college IDs and Guardian permission.',
            '•⁠  ⁠Their accommodations would be arranged in the MITS-DU hostel.'
        ],
        conduct: [
            '•⁠  ⁠The total prize pool of  Aarunya-26 is ₹1,00,000',
            '•⁠  ⁠It is subjected to change with respect to the minimum participation of 1,000 participants across all competitions.',
            '•⁠  ⁠In case, the minimum required participation is not achieved, the prize pool will be revised proportionately for every event ',
            '•⁠  ⁠The revised prize pool, if applicable, will be decided solely by the Organizing Committee of AARUNYA-26.',
            '•⁠  ⁠The distribution of the prize money across events will be on the closing ceremony, by the respected guest of honour',
            '•⁠  ⁠All decisions taken by the organizing committee regarding the prize pool and its distribution shall be final and binding.',
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0d0520] to-[#1a0a2e] relative overflow-hidden">
            {/* CRT Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{
                background: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.03), rgba(0,255,255,0.03) 2px, transparent 2px, transparent 4px)',
                imageRendering: 'pixelated'
            }} />

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-5" style={{
                background: `
                    linear-gradient(rgba(255,0,255,0.1) 1px, transparent 1px) 0 0 / 50px 50px,
                    linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px) 0 0 / 50px 50px
                `
            }} />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00ffff] rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-20 container mx-auto px-6 py-8">
                {/* Main Navigation */}
                <MainNavigation />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4" style={{
                        fontFamily: '"Press Start 2P", monospace',
                        color: '#ff00ff',
                        textShadow: '0 0 20px #ff00ff, 3px 3px 0 #880088',
                        imageRendering: 'pixelated'
                    }}>
                        GUIDELINES
                    </h1>
                    <p className="text-lg text-[#00ffff] font-mono" style={{
                        textShadow: '0 0 10px #00ffff'
                    }}>
                        RULES & REGULATIONS
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {sections.map((section, idx) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "relative px-6 py-3 transition-all duration-200 font-bold",
                                "border-2",
                                activeSection === section.id
                                    ? "bg-gradient-to-r from-[#ff00ff] to-[#cc00cc] text-white border-[#ff66ff]"
                                    : "bg-gradient-to-r from-[#1a0a2e] to-[#2a1a4a] text-[#ff99ff] border-transparent hover:border-[#ff00ff]/50"
                            )}
                            style={{
                                fontFamily: '"Press Start 2P", monospace',
                                fontSize: '10px',
                                textShadow: activeSection === section.id
                                    ? '0 0 15px #fff, 2px 2px 0 #880088'
                                    : '1px 1px 0 #440044',
                                boxShadow: activeSection === section.id
                                    ? 'inset -3px -3px 0 #880088, inset 3px 3px 0 #ff66ff, 0 0 20px #ff00ff'
                                    : 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #3a2a5a'
                            }}
                        >
                            <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />

                            <span className="relative z-10 flex items-center gap-2">
                                <span style={{ fontSize: '14px' }}>{section.icon}</span>
                                {section.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Guidelines Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-b from-[#2a1a4a] to-[#1a0a2e] border-2 border-[#ff00ff] rounded-lg p-6 relative overflow-hidden">
                        {/* Border Effects */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff]" />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff]" />
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#ff00ff] via-[#00ffff] to-[#ff00ff]" />
                        <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-[#ff00ff] via-[#00ffff] to-[#ff00ff]" />

                        {/* Content */}
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 text-[#00ffff] flex items-center gap-3" style={{
                                fontFamily: '"Press Start 2P", monospace',
                                textShadow: '0 0 10px #00ffff'
                            }}>
                                <span className="text-3xl">{sections.find(s => s.id === activeSection)?.icon}</span>
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>

                            <div className="space-y-4">
                                {guidelines[activeSection as keyof typeof guidelines].map((rule, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gradient-to-r from-[#1a0a2e] to-[#2a1a4a] border border-[#440044] rounded-lg p-4 hover:border-[#ff00ff]/50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-[#ff00ff] rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200" style={{ boxShadow: '0 0 10px #ff00ff' }}>
                                                <span className="text-xs font-bold text-white">✓</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#ff99ff] font-mono leading-relaxed">
                                                    {rule}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="mt-8 p-4 bg-gradient-to-r from-[#1a0a2e]/50 to-[#2a1a4a]/50 border border-[#ff00ff]/30 rounded-lg">
                                <p className="text-xs text-[#666666] font-mono text-center">
                                    ⚠️ VIOLATION OF ANY GUIDELINE MAY RESULT IN DISQUALIFICATION
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-b from-[#1a0a2e] to-[#2a1a4a] border border-[#00ffff] rounded-lg p-4">
                            <h3 className="text-[#00ffff] font-bold mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>⏰ TIMING</h3>
                            <p className="text-xs text-[#666666] font-mono">Arrive early, be punctual, respect time limits</p>
                        </div>
                        <div className="bg-gradient-to-b from-[#1a0a2e] to-[#2a1a4a] border border-[#ff00ff] rounded-lg p-4">
                            <h3 className="text-[#ff00ff] font-bold mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>📱 DEVICES</h3>
                            <p className="text-xs text-[#666666] font-mono">Silent mode required, no unauthorized use</p>
                        </div>
                        <div className="bg-gradient-to-b from-[#1a0a2e] to-[#2a1a4a] border border-[#00ffff] rounded-lg p-4">
                            <h3 className="text-[#00ffff] font-bold mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>🎯 CONDUCT</h3>
                            <p className="text-xs text-[#666666] font-mono">Respectful behavior, no cheating, sportsmanship</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};