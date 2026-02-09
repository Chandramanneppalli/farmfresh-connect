import { motion } from 'framer-motion';
import { Package, MapPin, CheckCircle, Clock, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const orders = [
  {
    id: 'ORD-1245',
    items: 'Organic Tomatoes (3kg), Spinach (2 bunches)',
    total: '₹195',
    date: 'Feb 6, 2026',
    status: 'In Transit',
    farm: 'Green Valley Farm',
    eta: 'Today by 2 PM',
  },
  {
    id: 'ORD-1240',
    items: 'Basmati Rice (5kg)',
    total: '₹425',
    date: 'Feb 4, 2026',
    status: 'Delivered',
    farm: 'Golden Fields',
    eta: '',
  },
  {
    id: 'ORD-1235',
    items: 'Alphonso Mangoes (1 dozen)',
    total: '₹250',
    date: 'Feb 2, 2026',
    status: 'Delivered',
    farm: 'Mango Paradise',
    eta: '',
  },
];

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  'In Transit': { color: 'bg-farm-sky/15 text-farm-sky', icon: Truck },
  'Delivered': { color: 'bg-farm-success/15 text-farm-success', icon: CheckCircle },
  'Pending': { color: 'bg-farm-warning/15 text-farm-warning', icon: Clock },
};

const ConsumerOrders = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">My Orders</h1>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const config = statusConfig[order.status] || statusConfig['Pending'];
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
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {order.farm}
                </div>
                <p className="font-bold text-card-foreground">{order.total}</p>
              </div>
              {order.eta && (
                <div className="mt-2 rounded-lg bg-farm-sky/10 px-3 py-2 text-xs text-farm-sky font-medium flex items-center gap-1">
                  <Truck className="h-3 w-3" /> ETA: {order.eta}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsumerOrders;
