import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import TrackingTimeline from '@/components/tracking/TrackingTimeline';
import TraceabilityCard from '@/components/tracking/TraceabilityCard';
import { mockOrders } from '@/data/trackingMockData';

const TraceLot = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();

  const order = mockOrders.find((o) => o.lotId === lotId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold font-display text-foreground mb-2">Lot Not Found</h1>
        <p className="text-muted-foreground mb-6">No traceability data found for <span className="font-mono font-bold">{lotId}</span></p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div>
          <p className="text-xs text-muted-foreground">Product Traceability</p>
          <p className="font-mono text-sm font-bold text-foreground">{lotId}</p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto p-4 space-y-6"
      >
        {/* QR display */}
        <div className="flex justify-center">
          <div className="rounded-xl border border-border bg-white p-4">
            <QRCodeSVG value={window.location.href} size={120} level="H" includeMargin />
          </div>
        </div>

        {/* Traceability info */}
        <TraceabilityCard info={order.traceability} />

        {/* Tracking timeline */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <h2 className="text-lg font-bold font-display text-card-foreground mb-4">Product Journey</h2>
          <TrackingTimeline events={order.trackingEvents} />
        </div>
      </motion.div>
    </div>
  );
};

export default TraceLot;
