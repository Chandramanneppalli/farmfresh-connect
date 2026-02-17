import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import freshProduce from '@/assets/fresh-produce.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  aiPrice: number;
  unit: string;
  stock: number;
  grade: string;
  image: string;
}

const initialProducts: Product[] = [
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

const emptyForm = { name: '', price: '', unit: 'kg', stock: '', grade: 'A' };

const FarmerProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      unit: product.unit,
      stock: String(product.stock),
      grade: product.grade,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, name: form.name, price: Number(form.price), unit: form.unit, stock: Number(form.stock), grade: form.grade }
            : p
        )
      );
      toast.success(`${form.name} updated successfully`);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        aiPrice: Math.round(Number(form.price) * (0.95 + Math.random() * 0.1)),
        unit: form.unit,
        stock: Number(form.stock),
        grade: form.grade,
        image: freshProduce,
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success(`${form.name} added successfully`);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`${deleteTarget.name} removed`);
    setDeleteTarget(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">My Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products listed</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
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
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => openEdit(product)}>
                  <Edit className="h-3 w-3" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(product)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Update the product details below.' : 'Fill in the details to list a new product.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" placeholder="e.g. Organic Tomatoes" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input id="price" type="number" placeholder="45" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input id="stock" type="number" placeholder="100" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="bunch">bunch</SelectItem>
                    <SelectItem value="dozen">dozen</SelectItem>
                    <SelectItem value="piece">piece</SelectItem>
                    <SelectItem value="litre">litre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grade</Label>
                <Select value={form.grade} onValueChange={(v) => setForm({ ...form, grade: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingProduct ? 'Save Changes' : 'Add Product'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the product from your listings. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FarmerProducts;
