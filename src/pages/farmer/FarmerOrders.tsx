import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, XCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const orders = [
  { id: 'ORD-1245', consumer: 'Priya Sharma', items: 'Tomatoes (3kg), Spinach (2)', total: '₹195', status: 'Pending', date: 'Feb 6, 2026' },
  { id: 'ORD-1242', consumer: 'Amit Kumar', items: 'Rice (5kg)', total: '₹425', status: 'Shipped', date: 'Feb 5, 2026' },
  { id: 'ORD-1240', consumer: 'Neha Reddy', items: 'Mangoes (1 dozen)', total: '₹250', status: 'Delivered', date: 'Feb 4, 2026' },
  { id: 'ORD-1238', consumer: 'Vikram Singh', items: 'Potatoes (10kg)', total: '₹250', status: 'Delivered', date: 'Feb 3, 2026' },
  { id: 'ORD-1235', consumer: 'Lata Devi', items: 'Green Chilies (2kg)', total: '₹120', status: 'Cancelled', date: 'Feb 2, 2026' },
];

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  'Pending': { color: 'bg-farm-warning/15 text-farm-warning', icon: Clock },
  'Shipped': { color: 'bg-farm-sky/15 text-farm-sky', icon: Truck },
  'Delivered': { color: 'bg-farm-success/15 text-farm-success', icon: CheckCircle },
  'Cancelled': { color: 'bg-destructive/15 text-destructive', icon: XCircle },
};

const FarmerOrders = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">Orders Management</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((tab, i) => (
          <Button key={tab} variant={i === 0 ? 'default' : 'outline'} size="sm" className="shrink-0 rounded-full">{tab}</Button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const config = statusConfig[order.status];
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
              <p className="text-sm text-card-foreground">{order.consumer}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <p className="font-bold text-card-foreground">{order.total}</p>
                {order.status === 'Pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive text-xs">Reject</Button>
                    <Button size="sm" className="text-xs">Accept & Ship</Button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerOrders;
