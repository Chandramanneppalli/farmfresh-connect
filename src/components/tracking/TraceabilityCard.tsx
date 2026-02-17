import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, QrCode, MapPin, Calendar, ShieldCheck, Thermometer, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [qrOpen, setQrOpen] = useState(false);

  const traceUrl = `${window.location.origin}/trace/${info.lotId}`;

  const handleDownloadQR = () => {
    const svg = document.getElementById(`qr-${info.lotId}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement('a');
      a.download = `${info.lotId}-qr.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-primary/20 bg-accent p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setQrOpen(true)} className="shrink-0 rounded-lg border border-primary/20 bg-card p-1.5 hover:bg-primary/10 transition-colors">
            <QRCodeSVG value={traceUrl} size={40} level="M" bgColor="transparent" fgColor="hsl(var(--primary))" />
          </button>
          <div>
            <p className="text-xs text-muted-foreground">Product Lot ID</p>
            <p className="font-mono text-sm font-bold text-card-foreground">{info.lotId}</p>
            <button onClick={() => setQrOpen(true)} className="text-[11px] text-primary hover:underline">Scan QR Code</button>
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

    {/* QR Code Dialog */}
    <Dialog open={qrOpen} onOpenChange={setQrOpen}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center">Product QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-xl border border-border bg-white p-4">
            <QRCodeSVG id={`qr-${info.lotId}`} value={traceUrl} size={200} level="H" includeMargin />
          </div>
          <div className="text-center">
            <p className="font-mono text-sm font-bold text-card-foreground">{info.lotId}</p>
            <p className="text-xs text-muted-foreground mt-1">{info.product} — {info.farm}</p>
          </div>
          <Button size="sm" variant="outline" className="gap-1" onClick={handleDownloadQR}>
            <Download className="h-4 w-4" /> Download QR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default TraceabilityCard;
