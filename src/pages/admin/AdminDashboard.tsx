import { motion } from 'framer-motion';
import { Users, IndianRupee, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { StatCard, SectionHeader } from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const revenueData = [
  { week: 'W1', revenue: 45000 },
  { week: 'W2', revenue: 52000 },
  { week: 'W3', revenue: 48000 },
  { week: 'W4', revenue: 61000 },
];

const userDistribution = [
  { name: 'Farmers', value: 342, color: 'hsl(142, 52%, 36%)' },
  { name: 'Consumers', value: 1250, color: 'hsl(36, 72%, 55%)' },
];

const monthlyGrowth = [
  { month: 'Sep', users: 800, orders: 450 },
  { month: 'Oct', users: 950, orders: 580 },
  { month: 'Nov', users: 1100, orders: 720 },
  { month: 'Dec', users: 1300, orders: 850 },
  { month: 'Jan', users: 1450, orders: 980 },
  { month: 'Feb', users: 1592, orders: 1120 },
];

const disputes = [
  { id: 'DSP-045', type: 'Quality Issue', farmer: 'Anand S.', consumer: 'Meera K.', status: 'Open', amount: '₹340' },
  { id: 'DSP-044', type: 'Late Delivery', farmer: 'Rajesh K.', consumer: 'Amit P.', status: 'Resolved', amount: '₹450' },
  { id: 'DSP-043', type: 'Wrong Item', farmer: 'Sunita D.', consumer: 'Neha R.', status: 'Open', amount: '₹280' },
];

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">FarmLink Connect Admin Dashboard</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={Users} label="Total Users" value="1,592" change="+8.2%" positive variant="primary" />
        <StatCard icon={ShoppingCart} label="Total Orders" value="3,847" change="+15%" positive variant="gold" />
        <StatCard icon={IndianRupee} label="Revenue (Feb)" value="₹2.06L" change="+12%" positive variant="sky" />
        <StatCard icon={AlertTriangle} label="Open Disputes" value={5} change="-2" positive variant="default" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-4 shadow-card">
          <SectionHeader title="Weekly Revenue" subtitle="February 2026" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Pie */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <SectionHeader title="User Distribution" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                {userDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-sm">
            {userDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <SectionHeader title="Monthly Growth" subtitle="Users & Orders trend" />
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} name="Users" />
            <Line type="monotone" dataKey="orders" stroke="hsl(var(--farm-gold))" strokeWidth={2} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Disputes */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4">
          <SectionHeader title="Recent Disputes" action={<button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">View All <ArrowUpRight className="h-3 w-3" /></button>} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Farmer</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Consumer</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((d) => (
                <tr key={d.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-card-foreground">{d.id}</td>
                  <td className="px-4 py-3 text-card-foreground">{d.type}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{d.farmer}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{d.consumer}</td>
                  <td className="px-4 py-3 font-medium text-card-foreground">{d.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      d.status === 'Open' ? 'bg-destructive/15 text-destructive' : 'bg-farm-success/15 text-farm-success'
                    }`}>
                      {d.status === 'Open' ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
