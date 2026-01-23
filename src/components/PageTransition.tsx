import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // No animations - transitions are now instant
    }, [location.pathname]);

    return (
        <div 
            ref={containerRef}
            className="w-full transition-opacity"
            style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
}
