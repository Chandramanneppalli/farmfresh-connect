import { motion } from 'framer-motion';
import { Camera, Upload, CheckCircle, AlertCircle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/StatCard';
import freshProduce from '@/assets/fresh-produce.jpg';

const scanResults = [
  { label: 'Freshness', score: 95, color: 'bg-farm-success' },
  { label: 'Color Uniformity', score: 88, color: 'bg-primary' },
  { label: 'Size Consistency', score: 92, color: 'bg-farm-sky' },
  { label: 'Surface Quality', score: 85, color: 'bg-farm-gold' },
];

const FarmerQualityScan = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-foreground">AI Quality Scan</h1>
      <p className="text-muted-foreground">Upload or capture crop images for AI-powered quality grading</p>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-dashed border-primary/30 bg-accent/50 p-8 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Capture or Upload Crop Image</p>
            <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG up to 10MB</p>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2"><Camera className="h-4 w-4" /> Open Camera</Button>
            <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Upload Image</Button>
          </div>
        </div>
      </motion.div>

      {/* Demo Result */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4">
          <SectionHeader title="Scan Results" subtitle="Organic Tomatoes – Batch #TOM-2024-087" />
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-4">
            <img src={freshProduce} alt="Scanned produce" className="w-full h-48 object-cover rounded-xl" />
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-farm-success/10 border border-farm-success/20">
              <CheckCircle className="h-6 w-6 text-farm-success shrink-0" />
              <div>
                <p className="font-bold text-foreground">Grade: A+</p>
                <p className="text-xs text-muted-foreground">Premium quality, market ready</p>
              </div>
            </div>
            {scanResults.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerQualityScan;
