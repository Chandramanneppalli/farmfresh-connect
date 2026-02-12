import { motion } from 'framer-motion';
import { CheckCircle, Circle, Package, Truck, Warehouse, Leaf, QrCode, MapPin } from 'lucide-react';

export interface TrackingEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'harvest' | 'quality' | 'packed' | 'shipped' | 'in_transit' | 'delivered';
  location?: string;
  completed: boolean;
}

const typeIcons: Record<string, typeof Package> = {
  harvest: Leaf,
  quality: QrCode,
  packed: Warehouse,
  shipped: Truck,
  in_transit: MapPin,
  delivered: CheckCircle,
};

const TrackingTimeline = ({ events }: { events: TrackingEvent[] }) => {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

      <div className="space-y-4">
        {events.map((event, i) => {
          const Icon = typeIcons[event.type] || Circle;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-3"
            >
              {/* Dot */}
              <div
                className={`absolute -left-6 top-0.5 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${
                  event.completed
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                <Icon className="h-3 w-3" />
              </div>

              {/* Content */}
              <div className="pb-1">
                <p className={`text-sm font-medium ${event.completed ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                  {event.title}
                </p>
                <p className="text-xs text-muted-foreground">{event.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-muted-foreground">{event.timestamp}</span>
                  {event.location && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5" /> {event.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
