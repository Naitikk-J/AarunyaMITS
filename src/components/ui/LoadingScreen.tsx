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
                const newProgress = Math.min(prev + Math.random() * 15, 95);
                const textIndex = Math.min(Math.floor(newProgress / 25), texts.length - 1);
                setLoadingText(texts[textIndex]);
                return newProgress;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            className="fixed inset-0 w-full h-full z-[9999] flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(180deg, #0A0E27 0%, #0f1535 50%, #1a1f3a 100%)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
            }}
        >
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-4">
                {/* Logo */}
                <div>
                    <img
                        src="/aarunya-logo.svg"
                        alt="Aarunya 2026"
                        className="h-40 w-auto"
                        style={{
                            filter: 'drop-shadow(3px 3px 0 #FF85C0) drop-shadow(6px 6px 0 #FF5E1F)',
                            imageRendering: 'pixelated',
                        }}
                    />
                </div>

                {/* Loading Text */}
                <div className="text-center">
                    <p 
                        className="font-orbitron text-2xl font-bold mb-2"
                        style={{
                            color: progress < 25 ? '#00A6FF' : progress < 50 ? '#FFDD33' : progress < 75 ? '#B0FF57' : '#FF85C0',
                            textShadow: '0 0 10px currentColor'
                        }}
                    >
                        {loadingText}
                    </p>
                    <p 
                        className="text-sm font-rajdhani tracking-widest font-bold"
                        style={{
                            color: '#FF5E1F',
                            textShadow: '0 0 8px #FF5E1F'
                        }}
                    >
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Progress Bar */}
                <div 
                    className="w-64 h-6 border-4 overflow-hidden"
                    style={{
                        borderColor: '#FF85C0',
                        backgroundColor: '#1a1f3a',
                        boxShadow: '6px 6px 0 #FF5E1F, 0 0 20px rgba(0, 166, 255, 0.4)',
                    }}
                >
                    <div
                        className="h-full transition-all duration-200"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #00A6FF, #FFDD33, #FF85C0)',
                            boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)'
                        }}
                    />
                </div>

                {/* Loading Message */}
                <p 
                    className="font-rajdhani text-lg font-bold mt-4"
                    style={{
                        color: '#B0FF57',
                        textShadow: '0 0 10px #B0FF57'
                    }}
                >
                    🎪 Preparing the carnival of innovation...
                </p>

                {/* Loading dots */}
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
        </div>
    );
}
