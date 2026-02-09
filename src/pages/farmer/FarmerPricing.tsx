import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Target } from 'lucide-react';
import { SectionHeader } from '@/components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const priceHistory = [
  { date: 'Jan', tomato: 42, rice: 80, spinach: 28 },
  { date: 'Feb', tomato: 45, rice: 85, spinach: 30 },
  { date: 'Mar', tomato: 48, rice: 82, spinach: 35 },
  { date: 'Apr', tomato: 50, rice: 88, spinach: 32 },
  { date: 'May', tomato: 44, rice: 90, spinach: 30 },
  { date: 'Jun', tomato: 38, rice: 85, spinach: 25 },
];

const demandForecast = [
  { product: 'Tomatoes', current: 45, predicted: 52, trend: 'up' },
  { product: 'Rice', current: 85, predicted: 82, trend: 'down' },
  { product: 'Spinach', current: 30, predicted: 35, trend: 'up' },
  { product: 'Mangoes', current: 250, predicted: 270, trend: 'up' },
  { product: 'Potatoes', current: 25, predicted: 28, trend: 'up' },
];

const FarmerPricing = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">Smart Pricing Analytics</h1>
      <p className="text-muted-foreground">AI-powered price recommendations and market trends</p>

      {/* Price History */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <SectionHeader title="Price Trends" subtitle="Last 6 months (₹/kg)" />
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip />
            <Line type="monotone" dataKey="tomato" stroke="hsl(var(--destructive))" strokeWidth={2} name="Tomatoes" />
            <Line type="monotone" dataKey="rice" stroke="hsl(var(--farm-gold))" strokeWidth={2} name="Rice" />
            <Line type="monotone" dataKey="spinach" stroke="hsl(var(--primary))" strokeWidth={2} name="Spinach" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Predictions */}
      <div className="rounded-xl border border-primary/20 bg-accent p-4 shadow-card">
        <SectionHeader title="🤖 AI Price Predictions" subtitle="Next week forecast" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {demandForecast.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg bg-card border border-border p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-card-foreground">{item.product}</h3>
                {item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-farm-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold font-display text-card-foreground">₹{item.predicted}</span>
                <span className="text-sm text-muted-foreground mb-0.5">from ₹{item.current}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <Target className="h-3 w-3 text-primary" />
                <span className="text-primary font-medium">AI Recommended Price</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerPricing;
