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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { crops = ['Tomatoes', 'Rice', 'Spinach', 'Mangoes', 'Potatoes'], region = 'India' } = await req.json();

    const today = new Date().toISOString().split('T')[0];

    const prompt = `You are an agricultural market analyst. Provide realistic current market pricing data for these crops in ${region} as of ${today}.

For each crop: ${crops.join(', ')}

Return a JSON object with this exact structure (no markdown, no explanation, just JSON):
{
  "priceHistory": [
    { "month": "Jan", ${crops.map(c => `"${c.toLowerCase()}": <price_inr_per_kg>`).join(', ')} },
    ... (6 months of historical data)
  ],
  "predictions": [
    {
      "product": "<crop_name>",
      "currentPrice": <current_price_inr>,
      "predictedPrice": <predicted_price_next_week>,
      "trend": "up" or "down",
      "confidence": <0.0 to 1.0>,
      "reason": "<brief reason for trend>"
    }
  ],
  "marketInsights": [
    "<insight about current market conditions>",
    "<insight about seasonal patterns>",
    "<insight about demand trends>"
  ]
}

Use realistic Indian market prices in INR per kg. Base predictions on seasonal patterns, monsoon effects, festival demand, and typical supply chain factors.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI gateway failed [${aiResponse.status}]: ${await aiResponse.text()}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';

    // Parse JSON from AI response (handle potential markdown wrapping)
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch?.[0] || content);
    } catch {
      throw new Error('Failed to parse AI pricing response');
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Pricing error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
