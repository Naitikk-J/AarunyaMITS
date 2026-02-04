import { ReactNode, useRef, useState } from "react";
import { InteractiveTVControls } from "./InteractiveTVControls";
import { useResponsive } from "../hooks/use-responsive";

interface TVFrameProps {
    children: ReactNode;
    className?: string;
}

interface VideoSource {
    src: string;
    type: string;
}

const TVFrame = ({ children, className = "" }: TVFrameProps) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<VideoSource | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const videoSources: VideoSource[] = [
        { src: "/tv-BG2.mp4", type: "video/mp4" },
        { src: "/tv-BG3.mp4", type: "video/mp4" }
    ];

    const handleChannelChange = (channel: number) => {
        if (channel === 1) {
            // Channel 1: Regular content
            setIsVideoPlaying(false);
            setCurrentVideo(null);
        } else if (channel >= 2 && channel <= 3) {
            // Channel 2-3: Video content
            setIsVideoPlaying(true);
            setCurrentVideo(videoSources[channel - 2]);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* TV Body */}
            <div className={`bg-[#1A1A1A] border-[12px] border-[#0A0A0A] rounded-xl shadow-2xl relative overflow-visible ${isMobile ? 'border-[8px]' : isTablet ? 'border-[10px]' : 'border-[12px]'}`}>
                {/* Main Screen Container */}
                <div className="flex">
                    {/* Screen area */}
                    <div
                        ref={screenRef}
                        className={`flex-1 crt-screen aspect-video relative overflow-hidden bg-black rounded-sm ${isMobile ? 'm-1' : isTablet ? 'm-2' : 'm-4'} shadow-[inset_0_0_20px_rgba(0,0,0,1)]`}
                    >
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none z-10" />

                        {/* Content */}
                        {isVideoPlaying ? (
<video 
                ref={videoRef}
                src={currentVideo?.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
                        ) : (
                            <div className="relative z-0 w-full h-full flex items-center justify-center">
                                {children}
                            </div>
                        )}

                        {/* Corner vignette */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)'
                        }} />
                    </div>

                    {/* Integrated Control Panel Space (Right Side) */}
                    <div className={`bg-[#111111] border-l-4 border-[#0A0A0A] flex flex-col items-center ${isMobile ? 'w-12 py-2' : isTablet ? 'w-14 py-3' : 'w-20 py-4'} relative`}>
                        <InteractiveTVControls
                            screenRef={screenRef}
                            onChannelChange={handleChannelChange}
                        />

                        {/* Small indicator lights at the bottom of panel */}
                        <div className={`absolute bottom-2 flex gap-1 ${isMobile ? 'gap-1' : isTablet ? 'gap-1.5' : 'gap-2'}`}>
                            <div className={`rounded-full bg-lime-green animate-pulse shadow-[0_0_5px_rgba(57,255,20,0.8)] ${isMobile ? 'w-1 h-1' : isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
                            <div className={`rounded-full bg-radical-red shadow-[0_0_5px_rgba(255,0,153,0.8)] ${isMobile ? 'w-1 h-1' : isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stand/Bottom Decoration */}
            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 ${isMobile ? 'w-5/6 h-4' : isTablet ? 'w-3/4 h-5' : 'w-3/4 h-6'} bg-[#0A0A0A] rounded-b-xl`} />
        </div>
    );
};

export default TVFrame;
