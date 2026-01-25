import { useEffect, useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {isLoading && <LoadingScreen />}
            <MainNavigation />

            {/* Empty page content */}
            {!isLoading && (
                <div className="absolute inset-0 pt-16 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-orbitron font-bold text-primary mb-4">
                            AARUNYA
                        </h1>
                        <p className="text-lg text-muted-foreground font-rajdhani">
                            Explore the campus by visiting the View Map section
                        </p>
                    </div>
                </div>
            )}

            {/* Decorative corner elements */}
            <div className="fixed top-20 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed top-20 left-6 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent" />
            <div className="fixed top-20 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed top-20 right-6 w-0.5 h-20 bg-gradient-to-b from-secondary to-transparent" />
        </div>
    );
};

export default Index;
