import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Droplets, Wind, Thermometer, AlertTriangle, Sprout, Calendar, RefreshCw, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  condition: string;
}

interface ForecastDay {
  date: string;
  day: string;
  tempMax: number;
  tempMin: number;
  rain: number;
  weatherCode: number;
  windMax: number;
}

interface WeatherAlert {
  type: string;
  text: string;
}

interface WeatherData {
  current: WeatherCurrent;
  forecast: ForecastDay[];
  alerts: WeatherAlert[];
}

const alertColors: Record<string, string> = {
  warning: 'border-farm-warning bg-farm-warning/10 text-farm-warning',
  info: 'border-farm-sky bg-farm-sky/10 text-farm-sky',
  success: 'border-farm-success bg-farm-success/10 text-farm-success',
};

const windDirectionLabel = (deg: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

const FarmerClimate = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState('New Delhi, India');

  const fetchWeather = async (lat = 28.6139, lon = 77.209) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('get-weather', {
        body: { latitude: lat, longitude: lon },
      });
      if (fnError) throw fnError;
      setWeather(data);
    } catch (err: any) {
      console.error('Weather fetch failed:', err);
      setError('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationName('Your Location');
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => fetchWeather() // fallback to Delhi
      );
    } else {
      fetchWeather();
    }
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Fetching real-time weather data...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => fetchWeather()} variant="outline">Retry</Button>
      </div>
    );
  }

  const { current, forecast, alerts } = weather;

  const chartData = forecast.map((d) => ({
    day: d.day,
    temp: Math.round((d.tempMax + d.tempMin) / 2),
    rain: d.rain,
  }));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Climate Intelligence</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5" /> {locationName} • Live data
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchWeather()} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>

      {/* Current Weather */}
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { icon: Thermometer, label: 'Temperature', value: `${Math.round(current.temperature)}°C`, sub: `Feels like ${Math.round(current.feelsLike)}°C` },
          { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, sub: current.humidity > 70 ? 'High' : current.humidity > 40 ? 'Moderate' : 'Low' },
          { icon: Wind, label: 'Wind Speed', value: `${Math.round(current.windSpeed)} km/h`, sub: `${windDirectionLabel(current.windDirection)} direction` },
          { icon: CloudSun, label: 'Conditions', value: current.condition, sub: `UV Index: ${current.uvIndex}` },
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
        <SectionHeader title="7-Day Forecast" subtitle="Real-time data from Open-Meteo" />
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
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
        <SectionHeader title="⚠️ Weather Alerts" subtitle="Auto-generated from forecast data" />
        {alerts.map((alert, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className={`rounded-lg border-l-4 p-4 ${alertColors[alert.type] || alertColors.info}`}>
            <p className="text-sm font-medium">{alert.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Crop Advisory */}
      <div className="rounded-xl border border-primary/20 bg-accent p-4 shadow-card">
        <SectionHeader title="🌱 Crop Advisory" subtitle="Based on current weather conditions" />
        <div className="grid md:grid-cols-2 gap-3">
          {(() => {
            const advisories = [];
            if (current.temperature > 35) advisories.push({ icon: AlertTriangle, title: 'Heat Advisory', advice: `Temperature at ${Math.round(current.temperature)}°C. Increase irrigation frequency and provide shade for sensitive crops.` });
            if (current.humidity > 80) advisories.push({ icon: Droplets, title: 'High Humidity', advice: `Humidity at ${current.humidity}%. Watch for fungal diseases. Ensure proper ventilation.` });
            if (forecast.some(d => d.rain > 30)) advisories.push({ icon: Sprout, title: 'Rain Expected', advice: 'Significant rainfall coming. Harvest ripe produce and protect seedlings.' });
            if (current.windSpeed > 25) advisories.push({ icon: Wind, title: 'Wind Warning', advice: `Wind at ${Math.round(current.windSpeed)} km/h. Secure tall crops and polytunnels.` });
            if (current.uvIndex > 8) advisories.push({ icon: Calendar, title: 'UV Alert', advice: `UV Index at ${current.uvIndex}. Avoid outdoor work during peak hours (11am–3pm).` });
            if (advisories.length === 0) advisories.push({ icon: Sprout, title: 'All Clear', advice: 'Weather conditions are favorable. Good day for field work and planting.' });
            return advisories;
          })().map((item, i) => (
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
