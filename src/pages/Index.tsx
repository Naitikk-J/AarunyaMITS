import { useEffect, useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import PacManTimeline from '@/components/PacManTimeline';
import CRTOverlay from '@/components/CRTOverlay';
import Footer from '@/components/Footer';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="relative w-full bg-background">
            {/* Navigation */}
            <MainNavigation />

            {/* Main Content */}
            <div>
                {/* Hero Section with TV zoom effect */}
                <HeroSection />

                {/* Welcome Section */}
                <WelcomeSection />

                {/* Pac-Man Timeline Section */}
                <PacManTimeline />

                {/* Footer Section */}
                <Footer />

                {/* CRT Overlay Effects */}
                <CRTOverlay />
            </div>
        </div>
    );
};

export default Index;
