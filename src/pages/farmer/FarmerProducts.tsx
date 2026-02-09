import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import freshProduce from '@/assets/fresh-produce.jpg';

const products = [
  { id: 1, name: 'Organic Tomatoes', price: 45, aiPrice: 48, unit: 'kg', stock: 120, grade: 'A+', image: freshProduce },
  { id: 2, name: 'Basmati Rice', price: 85, aiPrice: 82, unit: 'kg', stock: 500, grade: 'A', image: freshProduce },
  { id: 3, name: 'Fresh Spinach', price: 30, aiPrice: 32, unit: 'bunch', stock: 60, grade: 'A+', image: freshProduce },
  { id: 4, name: 'Alphonso Mangoes', price: 250, aiPrice: 270, unit: 'dozen', stock: 35, grade: 'A', image: freshProduce },
  { id: 5, name: 'Green Chilies', price: 60, aiPrice: 55, unit: 'kg', stock: 40, grade: 'B+', image: freshProduce },
  { id: 6, name: 'Potatoes', price: 25, aiPrice: 28, unit: 'kg', stock: 300, grade: 'A', image: freshProduce },
];

const gradeColors: Record<string, string> = {
  'A+': 'bg-farm-success/15 text-farm-success',
  'A': 'bg-primary/15 text-primary',
  'B+': 'bg-farm-warning/15 text-farm-warning',
};

const FarmerProducts = () => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">My Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products listed</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-card overflow-hidden group"
          >
            <div className="relative h-36 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <Badge className={`absolute top-3 right-3 ${gradeColors[product.grade]}`}>
                Grade {product.grade}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-card-foreground">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-card-foreground">₹{product.price}/{product.unit}</span>
                {product.aiPrice !== product.price && (
                  <span className="flex items-center gap-0.5 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    AI: ₹{product.aiPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <Package className="h-3.5 w-3.5" />
                {product.stock} {product.unit} in stock
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1 gap-1"><Edit className="h-3 w-3" /> Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FarmerProducts;
