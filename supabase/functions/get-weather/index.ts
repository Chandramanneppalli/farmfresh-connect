import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude = 28.6139, longitude = 77.2090 } = await req.json();

    // Current weather
    const currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max&timezone=auto&forecast_days=7`;

    const weatherRes = await fetch(currentUrl);
    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo API failed [${weatherRes.status}]`);
    }
    const weather = await weatherRes.json();

    const current = weather.current;
    const daily = weather.daily;

    // Build forecast array
    const forecast = daily.time.map((date: string, i: number) => ({
      date,
      day: i === 0 ? 'Today' : new Date(date).toLocaleDateString('en', { weekday: 'short' }),
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      rain: daily.precipitation_sum[i],
      weatherCode: daily.weather_code[i],
      windMax: daily.wind_speed_10m_max[i],
    }));

    // Generate alerts based on real data
    const alerts: { type: string; text: string }[] = [];
    forecast.forEach((day: any) => {
      if (day.rain > 50) {
        alerts.push({ type: 'warning', text: `Heavy rainfall expected ${day.day} (${day.rain}mm). Protect exposed crops.` });
      } else if (day.rain > 20) {
        alerts.push({ type: 'info', text: `Moderate rain on ${day.day} (${day.rain}mm). Good for soil moisture.` });
      }
      if (day.tempMax > 40) {
        alerts.push({ type: 'warning', text: `Extreme heat on ${day.day} (${day.tempMax}°C). Increase irrigation and provide shade.` });
      }
      if (day.windMax > 40) {
        alerts.push({ type: 'warning', text: `High winds on ${day.day} (${day.windMax} km/h). Secure crops and structures.` });
      }
    });

    if (alerts.length === 0) {
      alerts.push({ type: 'success', text: 'Weather conditions are favorable this week. No major alerts.' });
    }

    // Weather code to description
    const weatherDescriptions: Record<number, string> = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Depositing rime fog',
      51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
    };

    const result = {
      current: {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        windDirection: current.wind_direction_10m,
        uvIndex: current.uv_index,
        condition: weatherDescriptions[current.weather_code] || 'Unknown',
      },
      forecast,
      alerts,
      location: { latitude, longitude },
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Weather fetch error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
