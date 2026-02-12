import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, XCircle, Package, Warehouse, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const FarmerOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold font-display text-foreground">Orders & Tracking</h1>
        <Badge variant="outline" className="text-xs">{orders.length} orders</Badge>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Pending', 'Packed', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'].map((tab) => (
          <Button
            key={tab}
            variant={filter === tab ? 'default' : 'outline'}
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => setFilter(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => {
          const config = statusConfig[order.status] || statusConfig.Pending;
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
                  <p className="text-xs text-muted-foreground">{order.date} • Lot: {order.lotId}</p>
                </div>
                <Badge className={`${config.color} gap-1`}>
                  <config.icon className="h-3 w-3" />
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-card-foreground">{order.consumer}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <p className="font-bold text-card-foreground">{order.total}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-3 w-3" /> Track
                  </Button>
                  {order.status === 'Pending' && (
                    <>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive text-xs" onClick={() => updateStatus(order.id, 'Cancelled')}>Reject</Button>
                      <Button size="sm" className="text-xs" onClick={() => updateStatus(order.id, 'Packed')}>Accept</Button>
                    </>
                  )}
                  {order.status === 'Packed' && (
                    <Button size="sm" className="text-xs" onClick={() => updateStatus(order.id, 'Shipped')}>Mark Shipped</Button>
                  )}
                  {order.status === 'Shipped' && (
                    <Button size="sm" className="text-xs" onClick={() => updateStatus(order.id, 'In Transit')}>In Transit</Button>
                  )}
                  {order.status === 'In Transit' && (
                    <Button size="sm" className="text-xs" onClick={() => updateStatus(order.id, 'Delivered')}>Delivered</Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No orders found</p>
          </div>
        )}
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
                  <p className="text-muted-foreground">Consumer: {selectedOrder.consumer}</p>
                  <p className="text-muted-foreground">Total: {selectedOrder.total}</p>
                  {selectedOrder.eta && <p className="text-farm-sky text-xs font-medium">ETA: {selectedOrder.eta}</p>}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-card-foreground mb-3">📦 Delivery Tracking</h3>
                  <TrackingTimeline events={selectedOrder.trackingEvents} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-card-foreground mb-3">🔍 Produce Traceability</h3>
                  <TraceabilityCard info={selectedOrder.traceability} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FarmerOrders;
