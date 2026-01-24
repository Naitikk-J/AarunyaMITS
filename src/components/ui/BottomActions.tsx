import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Ticket, MapPin } from 'lucide-react';

export const BottomActions = () => {
    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 floating-sticker w-[90%] sm:w-auto">
            <div className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl sm:rounded-full px-3 py-2 sm:px-6 sm:py-3">
                <div className="flex items-center justify-around sm:gap-4">
                    <Link to="/schedule">
                        <Button variant="ghost" size="sm" className="font-orbitron text-[10px] sm:text-xs tracking-wider gap-1 sm:gap-2 text-kidcore-yellow hover:text-kidcore-orange hover:bg-kidcore-blue/20 rounded-lg">
                            <Calendar size={14} className="sm:size-[16px]" />
                            <span className="hidden xs:inline">SCHEDULE</span>
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm" className="font-orbitron text-[10px] sm:text-xs tracking-wider gap-1 sm:gap-2 kidcore-btn px-2 py-1 sm:px-3 sm:py-1">
                            <Ticket size={14} className="sm:size-[16px]" />
                            <span className="hidden xs:inline">GET PASS</span>
                            <span className="xs:hidden">PASS</span>
                        </Button>
                    </Link>
                    <Link to="/events">
                        <Button variant="ghost" size="sm" className="font-orbitron text-[10px] sm:text-xs tracking-wider gap-1 sm:gap-2 text-kidcore-pink hover:text-kidcore-yellow hover:bg-kidcore-pink/20 rounded-lg">
                            <MapPin size={14} className="sm:size-[16px]" />
                            <span className="hidden xs:inline">EXPLORE</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
