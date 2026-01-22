import { Keyboard, Mouse, Space } from 'lucide-react';

export function ControlsGuide() {
    return (
        <div className="fixed top-24 left-6 z-40 floating-sticker">
            <div className="glass-card border-kidcore-green/60 bg-background/85 backdrop-blur-xl rounded-3xl p-4">
                <div className="space-y-3 text-sm">
                    <div className="font-orbitron text-kidcore-yellow font-bold mb-3">CONTROLS</div>

                    <div className="flex items-center gap-2 text-kidcore-cream">
                        <Mouse size={16} className="text-kidcore-pink flex-shrink-0" />
                        <span className="font-rajdhani">Look Around</span>
                    </div>

                    <div className="flex items-center gap-2 text-kidcore-cream">
                        <Keyboard size={16} className="text-kidcore-blue flex-shrink-0" />
                        <span className="font-rajdhani">WASD Move</span>
                    </div>

                    <div className="flex items-center gap-2 text-kidcore-cream">
                        <Space size={16} className="text-kidcore-orange flex-shrink-0" />
                        <span className="font-rajdhani">Spacebar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
