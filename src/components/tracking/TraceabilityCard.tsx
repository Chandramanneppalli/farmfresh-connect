import { motion } from 'framer-motion';
import { Leaf, QrCode, MapPin, Calendar, ShieldCheck, Thermometer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TraceabilityInfo {
  lotId: string;
  product: string;
  farm: string;
  farmLocation: string;
  harvestDate: string;
  qualityGrade: string;
  qualityScanDate?: string;
  temperature?: string;
  certifications: string[];
}

const TraceabilityCard = ({ info }: { info: TraceabilityInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-primary/20 bg-accent p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Product Lot ID</p>
            <p className="font-mono text-sm font-bold text-card-foreground">{info.lotId}</p>
          </div>
        </div>
        <Badge className="bg-farm-success/15 text-farm-success gap-1">
          <ShieldCheck className="h-3 w-3" /> Verified
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-start gap-2">
          <Leaf className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Farm</p>
            <p className="text-card-foreground font-medium">{info.farm}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Origin</p>
            <p className="text-card-foreground font-medium">{info.farmLocation}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Harvested</p>
            <p className="text-card-foreground font-medium">{info.harvestDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Quality Grade</p>
            <p className="text-card-foreground font-medium">{info.qualityGrade}</p>
          </div>
        </div>
        {info.temperature && (
          <div className="flex items-start gap-2">
            <Thermometer className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Storage Temp</p>
              <p className="text-card-foreground font-medium">{info.temperature}</p>
            </div>
          </div>
        )}
      </div>

      {info.certifications.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {info.certifications.map((cert) => (
            <Badge key={cert} variant="outline" className="text-[11px]">{cert}</Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TraceabilityCard;
