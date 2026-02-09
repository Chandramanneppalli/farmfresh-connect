import { motion } from 'framer-motion';
import { CloudSun, Droplets, Wind, Thermometer, AlertTriangle, Sprout, Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { day: 'Today', temp: 32, rain: 5 },
  { day: 'Tue', temp: 30, rain: 15 },
  { day: 'Wed', temp: 28, rain: 40 },
  { day: 'Thu', temp: 26, rain: 65 },
  { day: 'Fri', temp: 29, rain: 20 },
  { day: 'Sat', temp: 31, rain: 10 },
  { day: 'Sun', temp: 33, rain: 0 },
];

const alerts = [
  { type: 'warning', text: 'Heavy rainfall expected Thursday (65mm). Protect exposed crops.' },
  { type: 'info', text: 'Temperature dropping to 26°C mid-week. Good for leafy vegetables.' },
  { type: 'success', text: 'Soil moisture optimal for rice paddies. No irrigation needed today.' },
];

const alertColors: Record<string, string> = {
  warning: 'border-farm-warning bg-farm-warning/10 text-farm-warning',
  info: 'border-farm-sky bg-farm-sky/10 text-farm-sky',
  success: 'border-farm-success bg-farm-success/10 text-farm-success',
};

const FarmerClimate = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">Climate Intelligence</h1>

      {/* Current Weather */}
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { icon: Thermometer, label: 'Temperature', value: '32°C', sub: 'Feels like 35°C' },
          { icon: Droplets, label: 'Humidity', value: '68%', sub: 'Moderate' },
          { icon: Wind, label: 'Wind Speed', value: '15 km/h', sub: 'NW direction' },
          { icon: CloudSun, label: 'Conditions', value: 'Partly Cloudy', sub: 'UV Index: 7' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 shadow-card">
            <item.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-xl font-bold font-display text-card-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Forecast Chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <SectionHeader title="7-Day Forecast" />
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="hsl(var(--farm-harvest))" strokeWidth={2} name="Temp (°C)" />
            <Line type="monotone" dataKey="rain" stroke="hsl(var(--farm-sky))" strokeWidth={2} name="Rain (mm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <SectionHeader title="⚠️ Weather Alerts" />
        {alerts.map((alert, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className={`rounded-lg border-l-4 p-4 ${alertColors[alert.type]}`}>
            <p className="text-sm font-medium">{alert.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Crop Advisory */}
      <div className="rounded-xl border border-primary/20 bg-accent p-4 shadow-card">
        <SectionHeader title="🌱 Crop Advisory" subtitle="AI-generated recommendations" />
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: Sprout, title: 'Tomatoes', advice: 'Harvest before Thursday rain. Current moisture levels ideal.' },
            { icon: Calendar, title: 'Rice Paddies', advice: 'Maintain water levels. No additional irrigation this week.' },
            { icon: Sprout, title: 'Spinach', advice: 'Ideal growing conditions. Consider planting new batch.' },
            { icon: AlertTriangle, title: 'Mangoes', advice: 'Cover trees before Thursday. High wind risk for fruit drop.' },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-card border border-border p-3 flex items-start gap-3">
              <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-card-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.advice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerClimate;
