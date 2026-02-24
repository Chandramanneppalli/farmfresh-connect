import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard, SectionHeader } from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const monthlyRevenue = [
  { month: 'Sep', revenue: 145000, commission: 14500 },
  { month: 'Oct', revenue: 178000, commission: 17800 },
  { month: 'Nov', revenue: 195000, commission: 19500 },
  { month: 'Dec', revenue: 220000, commission: 22000 },
  { month: 'Jan', revenue: 198000, commission: 19800 },
  { month: 'Feb', revenue: 206000, commission: 20600 },
];

const dailyRevenue = [
  { day: 'Mon', amount: 8200 },
  { day: 'Tue', amount: 9500 },
  { day: 'Wed', amount: 7800 },
  { day: 'Thu', amount: 11200 },
  { day: 'Fri', amount: 10400 },
  { day: 'Sat', amount: 13500 },
  { day: 'Sun', amount: 6800 },
];

const topFarmers = [
  { name: 'Anand Sharma', revenue: '₹45,200', orders: 38, change: '+12%' },
  { name: 'Rajesh Kumar', revenue: '₹38,900', orders: 32, change: '+8%' },
  { name: 'Sunita Devi', revenue: '₹34,100', orders: 28, change: '+15%' },
  { name: 'Vikram Patel', revenue: '₹29,800', orders: 24, change: '-3%' },
  { name: 'Priya Singh', revenue: '₹26,500', orders: 21, change: '+6%' },
];

const AdminRevenue = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-1">Track platform earnings and financial performance</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={IndianRupee} label="Total Revenue" value="₹11.42L" change="+18.5%" positive variant="primary" />
        <StatCard icon={IndianRupee} label="This Month" value="₹2.06L" change="+4.1%" positive variant="gold" />
        <StatCard icon={TrendingUp} label="Commission" value="₹1.14L" change="+18.5%" positive variant="sky" />
        <StatCard icon={TrendingUp} label="Avg Order" value="₹297" change="+5%" positive variant="default" />
      </div>

      {/* Monthly Revenue Chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <SectionHeader title="Monthly Revenue & Commission" subtitle="Last 6 months" />
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" strokeWidth={2} name="Revenue" />
            <Area type="monotone" dataKey="commission" stroke="hsl(var(--farm-gold))" fill="hsl(var(--farm-gold) / 0.15)" strokeWidth={2} name="Commission" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Daily Revenue */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <SectionHeader title="This Week" subtitle="Daily revenue breakdown" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Farmers */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="p-4">
            <SectionHeader title="Top Earning Farmers" subtitle="This month" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Farmer</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Orders</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {topFarmers.map(f => (
                  <tr key={f.name} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-card-foreground">{f.name}</td>
                    <td className="px-4 py-2.5 text-card-foreground">{f.revenue}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{f.orders}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${f.change.startsWith('+') ? 'text-farm-success' : 'text-destructive'}`}>
                        {f.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {f.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
