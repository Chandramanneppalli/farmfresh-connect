import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, MessageCircle, Filter } from 'lucide-react';
import { StatCard, SectionHeader } from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const disputes = [
  { id: 'DSP-045', type: 'Quality Issue', farmer: 'Anand Sharma', consumer: 'Meera Kapoor', status: 'Open', amount: '₹340', date: '2026-02-23', description: 'Tomatoes received were not fresh as described.' },
  { id: 'DSP-044', type: 'Late Delivery', farmer: 'Rajesh Kumar', consumer: 'Amit Patel', status: 'Resolved', amount: '₹450', date: '2026-02-22', description: 'Order delivered 3 days late without notification.' },
  { id: 'DSP-043', type: 'Wrong Item', farmer: 'Sunita Devi', consumer: 'Neha Rao', status: 'Open', amount: '₹280', date: '2026-02-21', description: 'Received onions instead of potatoes.' },
  { id: 'DSP-042', type: 'Quantity Mismatch', farmer: 'Vikram Patel', consumer: 'Suresh Jain', status: 'In Review', amount: '₹520', date: '2026-02-20', description: 'Ordered 5kg rice but received only 3kg.' },
  { id: 'DSP-041', type: 'Quality Issue', farmer: 'Priya Singh', consumer: 'Kavita Nair', status: 'Resolved', amount: '₹180', date: '2026-02-19', description: 'Bananas were overripe on arrival.' },
  { id: 'DSP-040', type: 'Refund Request', farmer: 'Anand Sharma', consumer: 'Rahul Mehta', status: 'Open', amount: '₹650', date: '2026-02-18', description: 'Order cancelled but refund not processed.' },
];

const statusConfig: Record<string, { icon: typeof Clock; color: string }> = {
  Open: { icon: Clock, color: 'bg-destructive/15 text-destructive' },
  'In Review': { icon: MessageCircle, color: 'bg-farm-gold/15 text-farm-gold' },
  Resolved: { icon: CheckCircle, color: 'bg-farm-success/15 text-farm-success' },
};

const AdminDisputes = () => {
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? disputes : disputes.filter(d => d.status === filter);
  const openCount = disputes.filter(d => d.status === 'Open').length;
  const reviewCount = disputes.filter(d => d.status === 'In Review').length;
  const resolvedCount = disputes.filter(d => d.status === 'Resolved').length;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Dispute Management</h1>
        <p className="text-muted-foreground mt-1">Review and resolve platform disputes</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Clock} label="Open" value={openCount} variant="default" />
        <StatCard icon={MessageCircle} label="In Review" value={reviewCount} variant="gold" />
        <StatCard icon={CheckCircle} label="Resolved" value={resolvedCount} variant="primary" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {['All', 'Open', 'In Review', 'Resolved'].map(s => (
          <Button key={s} size="sm" variant={filter === s ? 'default' : 'outline'} onClick={() => setFilter(s)} className="h-8 text-xs">
            {s}
          </Button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="space-y-3">
        {filtered.map(d => {
          const sc = statusConfig[d.status] || statusConfig.Open;
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                    <Badge variant="outline" className="text-xs">{d.type}</Badge>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${sc.color}`}>
                      <sc.icon className="h-3 w-3" />
                      {d.status}
                    </span>
                  </div>
                  <p className="text-sm text-card-foreground mb-1">{d.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Farmer: <span className="text-card-foreground font-medium">{d.farmer}</span></span>
                    <span>Consumer: <span className="text-card-foreground font-medium">{d.consumer}</span></span>
                    <span>{new Date(d.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-card-foreground whitespace-nowrap">{d.amount}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDisputes;
