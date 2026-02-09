import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, RefreshCw, AlertTriangle, Lightbulb } from 'lucide-react';
import { SectionHeader } from '@/components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Prediction {
  product: string;
  currentPrice: number;
  predictedPrice: number;
  trend: string;
  confidence: number;
  reason: string;
}

interface PricingData {
  priceHistory: Record<string, any>[];
  predictions: Prediction[];
  marketInsights: string[];
}

const CROP_COLORS: Record<string, string> = {
  tomatoes: 'hsl(var(--destructive))',
  rice: 'hsl(var(--farm-gold))',
  spinach: 'hsl(var(--primary))',
  mangoes: 'hsl(var(--farm-harvest))',
  potatoes: 'hsl(var(--farm-sky))',
};

const FarmerPricing = () => {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('get-pricing', {
        body: { crops: ['Tomatoes', 'Rice', 'Spinach', 'Mangoes', 'Potatoes'], region: 'India' },
      });
      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);
      setPricing(data);
    } catch (err: any) {
      console.error('Pricing fetch failed:', err);
      setError('Failed to load pricing data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground">AI is analyzing market data and generating pricing insights...</p>
      </div>
    );
  }

  if (error || !pricing) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={fetchPricing} variant="outline">Retry</Button>
      </div>
    );
  }

  // Extract crop keys from priceHistory for chart lines
  const cropKeys = pricing.priceHistory.length > 0
    ? Object.keys(pricing.priceHistory[0]).filter(k => k !== 'month')
    : [];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Smart Pricing Analytics</h1>
          <p className="text-muted-foreground">AI-powered price recommendations based on real market data</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchPricing} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>

      {/* Price History */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <SectionHeader title="Price Trends" subtitle="Historical data (₹/kg) – AI analyzed" />
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={pricing.priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip />
            <Legend />
            {cropKeys.map((key) => (
              <Line key={key} type="monotone" dataKey={key} stroke={CROP_COLORS[key] || 'hsl(var(--primary))'} strokeWidth={2} name={key.charAt(0).toUpperCase() + key.slice(1)} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Predictions */}
      <div className="rounded-xl border border-primary/20 bg-accent p-4 shadow-card">
        <SectionHeader title="🤖 AI Price Predictions" subtitle="Next week forecast with confidence scores" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pricing.predictions.map((item, i) => (
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
                <span className="text-2xl font-bold font-display text-card-foreground">₹{item.predictedPrice}</span>
                <span className="text-sm text-muted-foreground mb-0.5">from ₹{item.currentPrice}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <Target className="h-3 w-3 text-primary" />
                <span className="text-primary font-medium">
                  {Math.round(item.confidence * 100)}% confidence
                </span>
              </div>
              {item.reason && (
                <p className="text-xs text-muted-foreground mt-1.5">{item.reason}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      {pricing.marketInsights && pricing.marketInsights.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <SectionHeader title="💡 Market Insights" subtitle="AI-generated from current data" />
          <div className="space-y-2">
            {pricing.marketInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Lightbulb className="h-4 w-4 text-farm-gold shrink-0 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPricing;
