import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event, events } from '@/data/events';
import { BUILDINGS } from '@/components/3d/HolographicMap';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Building, Info, Star } from 'lucide-react';

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
      <DialogContent className="sm:max-w-[600px] bg-[#0a0a1f]/95 border-primary/30 backdrop-blur-xl text-white">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              <Building2 size={24} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-orbitron font-bold tracking-tight text-white">
                {buildingName}
              </DialogTitle>
              <DialogDescription className="text-primary/70 font-orbitron text-xs">
                {buildingData?.hindiName || 'MITS Campus'}
              </DialogDescription>
            </div>
          </div>
          
          <div className="flex gap-2">
            {buildingData?.established && (
              <Badge variant="outline" className="border-secondary/50 text-secondary bg-secondary/10">
                Est. {buildingData.established}
              </Badge>
            )}
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
              MITS Gwalior
            </Badge>
          </div>
        </DialogHeader>

        <Separator className="bg-white/10" />

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-8 py-4">
            {/* Brochure Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Info size={18} />
                <h3 className="font-orbitron font-semibold uppercase tracking-wider text-sm">About Building</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {buildingData?.description || 'Information for this building is currently being updated. MITS Gwalior is committed to providing world-class infrastructure for its students and faculty.'}
              </p>
            </section>

            {/* Facilities */}
            {buildingData?.facilities && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <Star size={18} />
                  <h3 className="font-orbitron font-semibold uppercase tracking-wider text-sm">Key Facilities</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {buildingData.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-white/80 bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {facility}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Events Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-kidcore-yellow">
                <Calendar size={18} />
                <h3 className="font-orbitron font-semibold uppercase tracking-wider text-sm">Upcoming Events</h3>
              </div>
              
              <div className="grid gap-4">
                {buildingEvents.length > 0 ? (
                  buildingEvents.map((event) => (
                    <div key={event.id} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 transition-all hover:bg-white/10 hover:border-primary/50">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-orbitron text-sm font-bold text-white group-hover:text-primary transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {event.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">
                    <p className="text-sm text-muted-foreground">No events scheduled for this building yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

