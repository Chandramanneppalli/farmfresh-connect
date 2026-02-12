import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, CheckCircle, Clock, Truck, Warehouse, XCircle, Eye, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TrackingTimeline from '@/components/tracking/TrackingTimeline';
import TraceabilityCard from '@/components/tracking/TraceabilityCard';
import { mockOrders, type Order } from '@/data/trackingMockData';

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  Pending: { color: 'bg-farm-warning/15 text-farm-warning', icon: Clock },
  Packed: { color: 'bg-accent text-accent-foreground', icon: Warehouse },
  Shipped: { color: 'bg-farm-sky/15 text-farm-sky', icon: Truck },
  'In Transit': { color: 'bg-farm-sky/15 text-farm-sky', icon: Truck },
  Delivered: { color: 'bg-farm-success/15 text-farm-success', icon: CheckCircle },
  Cancelled: { color: 'bg-destructive/15 text-destructive', icon: XCircle },
};

const ConsumerOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'tracking' | 'traceability'>('tracking');

  // Filter out cancelled for consumer view (they'd see their own only)
  const orders = mockOrders.filter((o) => o.status !== 'Cancelled');

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">My Orders</h1>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const config = statusConfig[order.status] || statusConfig.Pending;
          const progress = order.trackingEvents.filter((e) => e.completed).length;
          const total = order.trackingEvents.length;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-card-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <Badge className={`${config.color} gap-1`}>
                  <config.icon className="h-3 w-3" />
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-card-foreground">{order.items}</p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{progress}/{total} steps complete</span>
                  {order.eta && <span className="text-farm-sky font-medium">ETA: {order.eta}</span>}
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(progress / total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {order.farm}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => { setSelectedOrder(order); setActiveTab('tracking'); }}
                  >
                    <Eye className="h-3 w-3" /> Track
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => { setSelectedOrder(order); setActiveTab('traceability'); }}
                  >
                    <QrCode className="h-3 w-3" /> Trace
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedOrder.id}</span>
                  <Badge className={statusConfig[selectedOrder.status]?.color}>
                    {selectedOrder.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="text-sm space-y-1">
                  <p className="text-card-foreground font-medium">{selectedOrder.items}</p>
                  <p className="text-muted-foreground">From: {selectedOrder.farm}</p>
                  <p className="font-bold text-card-foreground">{selectedOrder.total}</p>
                  {selectedOrder.eta && <p className="text-farm-sky text-xs font-medium">ETA: {selectedOrder.eta}</p>}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-muted rounded-lg p-0.5">
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
                      activeTab === 'tracking' ? 'bg-card text-card-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    📦 Delivery Tracking
                  </button>
                  <button
                    onClick={() => setActiveTab('traceability')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
                      activeTab === 'traceability' ? 'bg-card text-card-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    🔍 Traceability
                  </button>
                </div>

                {activeTab === 'tracking' && (
                  <TrackingTimeline events={selectedOrder.trackingEvents} />
                )}

                {activeTab === 'traceability' && (
                  <TraceabilityCard info={selectedOrder.traceability} />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsumerOrders;
