import { Suspense } from 'react';
import DomeGallery from '@/components/DomeGallery';
import { CRTOverlay } from '@/components/CRTOverlay';
import { useResponsive } from '@/hooks/use-responsive';

const LoadingFallback = () => (
    <div className="w-full h-screen flex items-center justify-center bg-[#0d0520]">
        <div className="text-center">
            <div style={{
                fontFamily: '"Press Start 2P", "Courier New", monospace',
                fontSize: '16px',
                color: '#ff00ff',
                marginBottom: '1rem',
                animation: 'pulse 1.5s ease-in-out infinite',
                textShadow: '0 0 10px #ff00ff, 2px 2px 0 #880088'
            }}>
                LOADING...
            </div>
            <div style={{
                fontFamily: '"Press Start 2P", "Courier New", monospace',
                fontSize: '8px',
                color: '#00ffff',
                textShadow: '0 0 8px #00ffff'
            }}>
                Spinning up your memories
            </div>
        </div>
    </div>
);

const Gallery = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <div className="fixed inset-0 w-full h-screen overflow-hidden" style={{
            background: 'linear-gradient(to-bottom, #0d0520, #1a0a2e)',
            imageRendering: 'pixelated'
        }}>
            {/* Scanline effect background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
                backgroundSize: '4px 4px'
            }} />

            {/* Top neon border */}
            <div className="fixed top-0 left-0 right-0 h-1 flex z-40" style={{
                background: 'repeating-linear-gradient(90deg, #ff00ff, #ff00ff 8px, #00ffff 8px, #00ffff 16px)',
                boxShadow: '0 0 20px #ff00ff, 0 0 40px #00ffff'
            }} />

            {/* Bottom neon border */}
            <div className="fixed bottom-0 left-0 right-0 h-1 flex z-40">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-full"
                        style={{
                            background: i % 2 === 0
                                ? 'linear-gradient(to-bottom, #ff00ff, #bc13fe)'
                                : 'linear-gradient(to-bottom, #00ffff, #0088ff)',
                            boxShadow: i % 2 === 0
                                ? '0 0 8px #ff00ff'
                                : '0 0 8px #00ffff'
                        }}
                    />
                ))}
            </div>

            {/* 3D Dome Gallery */}
            <Suspense fallback={<LoadingFallback />}>
                <DomeGallery
                    fit={1}
                    minRadius={isMobile ? 400 : isTablet ? 600 : 950}
                    maxVerticalRotationDeg={0}
                    segments={isMobile ? 20 : 34}
                    dragDampening={2}
                    grayscale={false}
                    imageBorderRadius="20px"
                    openedImageBorderRadius="20px"
                    openedImageWidth={isMobile ? '180px' : '250px'}
                    openedImageHeight={isMobile ? '280px' : '350px'}
                />
            </Suspense>

            {/* CRT Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-20">
                <CRTOverlay />
            </div>

            {/* Title Container */}
            <div className={`fixed top-0 left-0 right-0 z-30 pointer-events-none ${isMobile ? 'pt-2' : isTablet ? 'pt-4' : 'pt-4 sm:pt-6'}`}>
                {/* Gradient fade background */}
                <div className={`bg-gradient-to-b from-[#0d0520] via-[#0d0520]/80 to-transparent ${isMobile ? 'h-20' : isTablet ? 'h-24' : 'h-28 sm:h-32'}`} />

                {/* Title */}
                <div className={`absolute ${isMobile ? 'top-2' : isTablet ? 'top-4' : 'top-4 sm:top-8'} left-0 right-0 flex items-center justify-center`}>
                    <div className="relative">
                        {/* Glow effect background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] via-[#8338ec] to-[#00ffff] opacity-40 blur-2xl" />

                        {/* Title text with neon theme */}
                        <h1 style={{
                            fontFamily: '"Press Start 2P", "Courier New", monospace',
                            fontSize: isMobile ? '20px' : isTablet ? '28px' : '48px',
                            color: '#ffffff',
                            textShadow: '0 0 10px #ff00ff, 0 0 20px #00ffff, 2px 2px 0 #440044',
                            letterSpacing: '2px',
                            position: 'relative',
                            zIndex: 10,
                        }}>
                            MEMORIES
                        </h1>

                        {/* Accent lines */}
                        <div className={`absolute ${isMobile ? '-bottom-2' : isTablet ? '-bottom-3' : '-bottom-3 sm:-bottom-4'} left-0 right-0 flex justify-center gap-1 ${isMobile ? 'gap-0.5' : 'gap-1 sm:gap-2'}`}>
                            <div className={`bg-[#ff00ff] ${isMobile ? 'w-6 h-0.5' : isTablet ? 'w-8 h-0.5' : 'w-8 sm:w-16 h-0.5 sm:h-1'}`} style={{ boxShadow: '0 0 10px #ff00ff' }} />
                            <div className={`bg-[#00ffff] ${isMobile ? 'w-6 h-0.5' : isTablet ? 'w-8 h-0.5' : 'w-8 sm:w-16 h-0.5 sm:h-1'}`} style={{ boxShadow: '0 0 10px #00ffff' }} />
                            <div className={`bg-[#ff00ff] ${isMobile ? 'w-6 h-0.5' : isTablet ? 'w-8 h-0.5' : 'w-8 sm:w-16 h-0.5 sm:h-1'}`} style={{ boxShadow: '0 0 10px #ff00ff' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint with neon styling */}
            <div className={`fixed ${isMobile ? 'bottom-8' : isTablet ? 'bottom-10' : 'bottom-12 sm:bottom-16'} left-1/2 transform -translate-x-1/2 z-30 pointer-events-none`}>
                <div className="text-center">
                    <p style={{
                        fontFamily: '"Press Start 2P", "Courier New", monospace',
                        fontSize: isMobile ? '6px' : isTablet ? '7px' : '8px',
                        color: '#ff00ff',
                        textShadow: '0 0 10px #ff00ff',
                        marginBottom: '0.5rem',
                        letterSpacing: '1px'
                    }}>
                        SCROLL TO SPIN
                    </p>
                    <div className={`flex justify-center gap-1 ${isMobile ? 'gap-0.5' : ''}`}>
                        <div className={`bg-[#00ffff] ${isMobile ? 'w-0.5 h-2' : isTablet ? 'w-1 h-3' : 'w-1 h-3 sm:h-4'}`} style={{
                            animation: 'bounce 1s ease-in-out infinite',
                            boxShadow: '0 0 8px #00ffff'
                        }} />
                        <div className={`bg-[#ff00ff] ${isMobile ? 'w-0.5 h-2' : isTablet ? 'w-1 h-3' : 'w-1 h-3 sm:h-4'}`} style={{
                            animation: 'bounce 1s ease-in-out infinite',
                            animationDelay: '0.1s',
                            boxShadow: '0 0 8px #ff00ff'
                        }} />
                        <div className={`bg-[#00ffff] ${isMobile ? 'w-0.5 h-2' : isTablet ? 'w-1 h-3' : 'w-1 h-3 sm:h-4'}`} style={{
                            animation: 'bounce 1s ease-in-out infinite',
                            animationDelay: '0.2s',
                            boxShadow: '0 0 8px #00ffff'
                        }} />
                    </div>
                </div>
            </div>

            {/* Back button with neon styling */}
            <a
                href="/"
                className={`fixed ${isMobile ? 'top-2 left-2' : isTablet ? 'top-4 left-4' : 'top-6 left-6'} z-40 ${isMobile ? 'px-2 py-1' : isTablet ? 'px-3 py-1.5' : 'px-3 sm:px-4 py-2'} transition-all duration-200 hover:scale-105`}
                style={{
                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                    fontSize: isMobile ? '6px' : isTablet ? '7px' : '8px',
                    color: '#ffffff',
                    textShadow: '0 0 8px #00ffff, 2px 2px 0 #004466',
                    background: 'linear-gradient(to-bottom, #2a1a4a, #1a0a2e)',
                    border: '2px solid #ff00ff',
                    boxShadow: 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #3a2a5a, 0 0 15px #ff00ff',
                }}
                onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(to-bottom, #ff00ff, #cc00cc)';
                    (e.target as HTMLElement).style.borderColor = '#ff66ff';
                }}
                onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(to-bottom, #2a1a4a, #1a0a2e)';
                    (e.target as HTMLElement).style.borderColor = '#ff00ff';
                }}
            >
                ← HOME
            </a>

            {/* Pulse animation style */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
};

export default Gallery;
