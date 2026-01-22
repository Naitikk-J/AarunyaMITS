import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event, events } from '@/data/events';
import { BUILDINGS } from '@/components/3d/HolographicMap';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: string;
}

export const EventModal = ({ isOpen, onClose, building }: EventModalProps) => {
  const buildingData = BUILDINGS.find(b => b.id === building);
  const buildingName = buildingData?.name || building.replace(/_/g, ' ');
  const buildingEvents = events.filter((event) => event.building === building);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{buildingName}</DialogTitle>
          <DialogDescription>Events happening in this location.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4 py-4">
            {buildingEvents.length > 0 ? (
              buildingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <img src={event.image} alt={event.title} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No events scheduled for this building yet.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
