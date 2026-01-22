import { useEffect, useState } from 'react';

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing');

    useEffect(() => {
        const texts = [
            'Initializing',
            'Loading campus data',
            'Generating holographic grid',
            'Preparing character',
            'Entering Euphoria'
        ];

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 15;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // Update loading text
                const textIndex = Math.min(Math.floor(newProgress / 25), texts.length - 1);
                setLoadingText(texts[textIndex]);

                return newProgress;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (progress >= 100) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#0A0E27] via-[#0f1535] to-[#1a1f3a] overflow-hidden">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A6FF] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5E1F] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-[#FF85C0] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* VHS Filter Background */}
            <div className="absolute inset-0 vhs-filter opacity-20" />

            {/* Glitch Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-15" />

            {/* Floating Sticker Decorations */}
            <div className="absolute top-20 left-10 floating-sticker text-4xl animate-bounce">📌</div>
            <div className="absolute top-40 right-16 floating-sticker text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>⚡</div>
            <div className="absolute bottom-32 left-20 floating-sticker text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>💥</div>
            <div className="absolute bottom-20 right-10 floating-sticker text-5xl animate-bounce" style={{ animationDelay: '0.9s' }}>🎨</div>

            {/* Neon corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#00A6FF] opacity-60" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#FF85C0] opacity-60" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[#B0FF57] opacity-60" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#FF5E1F] opacity-60" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo with Glitch Effect */}
                <div className="glitch-trigger transform transition-transform duration-300">
                    <h1 className="kidcore-text font-orbitron text-6xl font-black tracking-[0.3em] text-center drop-shadow-lg" style={{
                        textShadow: '3px 3px 0 #FF85C0, 6px 6px 0 #FF5E1F, 0 0 20px rgba(0, 166, 255, 0.5), 0 0 40px rgba(255, 94, 31, 0.3)'
                    }}>
                        AARUNYA 2.0
                    </h1>
                </div>

                {/* Loading Text with Animation */}
                <div className="text-center">
                    <p className="font-orbitron text-2xl font-bold mb-2 transition-colors duration-500" style={{
                        color: progress < 25 ? '#00A6FF' : progress < 50 ? '#FFDD33' : progress < 75 ? '#B0FF57' : '#FF85C0',
                        textShadow: '0 0 10px currentColor'
                    }}>
                        {loadingText}
                    </p>
                    <p className="text-sm font-rajdhani tracking-widest font-bold" style={{
                        color: '#FF5E1F',
                        textShadow: '0 0 8px #FF5E1F'
                    }}>
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Progress Bar - Enhanced Kidcore Style */}
                <div className="w-80 h-8 bg-[#1a1f3a] border-4 border-[#FF85C0] rounded-none overflow-hidden" style={{
                    boxShadow: '6px 6px 0 #FF5E1F, -3px -3px 0 #B0FF57, 0 0 20px rgba(0, 166, 255, 0.4), inset 0 0 10px rgba(255, 85, 192, 0.2)'
                }}>
                    <div
                        className="h-full bg-gradient-to-r from-[#00A6FF] via-[#FFDD33] to-[#FF85C0] transition-all duration-200 relative"
                        style={{
                            width: `${progress}%`,
                            boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)'
                        }}
                    >
                        {/* Animated progress shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                    </div>
                </div>

                {/* Progress text labels */}
                <div className="w-80 flex justify-between text-xs font-rajdhani font-bold tracking-wider">
                    <span style={{ color: '#00A6FF', textShadow: '0 0 5px #00A6FF' }}>0%</span>
                    <span style={{ color: '#B0FF57', textShadow: '0 0 5px #B0FF57' }}>50%</span>
                    <span style={{ color: '#FF85C0', textShadow: '0 0 5px #FF85C0' }}>100%</span>
                </div>

                {/* Loading Messages */}
                <div className="mt-8 text-center">
                    <p className="font-rajdhani text-[#B0FF57] font-bold text-lg animate-pulse" style={{
                        textShadow: '0 0 10px #B0FF57'
                    }}>
                        🎪 Preparing the carnival of innovation...
                    </p>
                </div>

                {/* Loading dots animation */}
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ['#00A6FF', '#FF5E1F', '#FF85C0'][i],
                                animation: `pulse 1.4s ease-in-out infinite`,
                                animationDelay: `${i * 0.2}s`,
                                boxShadow: `0 0 8px ${['#00A6FF', '#FF5E1F', '#FF85C0'][i]}`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-15" />

            {/* Additional glow effect for depth */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 14, 39, 0.4) 100%)'
            }} />
        </div>
    );
}
