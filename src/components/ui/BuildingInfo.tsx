import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface BuildingInfoProps {
    buildingId: string | null;
}

const buildingData: Record<string, { name: string; description: string }> = {
    'main-gate': {
        name: 'Main Gate',
        description: 'The grand entrance to the AARUNYA festival grounds. Welcome to the experience!',
    },
    'stage-1': {
        name: 'Main Stage',
        description: 'The primary performance venue featuring headlining acts and major events.',
    },
    'stage-2': {
        name: 'Secondary Stage',
        description: 'Alternative performances and emerging artists showcase their talents here.',
    },
    'food-court': {
        name: 'Food Court',
        description: 'A variety of culinary delights from local and international cuisines.',
    },
    'merch-zone': {
        name: 'Merch Zone',
        description: 'Official AARUNYA merchandise and exclusive festival collectibles.',
    },
    'workshop-area': {
        name: 'Workshop Area',
        description: 'Interactive sessions, hands-on activities, and creative workshops.',
    },
    'competition-arena': {
        name: 'Competition Arena',
        description: 'Battle it out in various competitions and showcase your skills.',
    },
};

export const BuildingInfo = ({ buildingId }: BuildingInfoProps) => {
    if (!buildingId) return null;

    const building = buildingData[buildingId] || {
        name: buildingId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        description: 'Explore this area to discover more about the festival.',
    };

    return (
        <div className="fixed bottom-24 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs z-40 floating-sticker">
            <Card className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl">
                <CardHeader className="p-3 sm:pb-2">
                    <CardTitle className="font-orbitron text-sm sm:text-lg text-kidcore-yellow flex items-center gap-2 animate-playful-bounce">
                        <MapPin size={16} className="text-kidcore-pink sm:size-[18px]" />
                        {building.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                    <p className="text-[10px] sm:text-sm text-kidcore-cream font-orbitron leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {building.description}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
