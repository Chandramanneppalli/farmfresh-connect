import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole, setIsAuthenticated, setUserName } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAdmin = location.state?.role === 'admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    const role = isAdmin ? 'admin' : email.includes('farmer') ? 'farmer' : 'consumer';
    setRole(role as any);
    setIsAuthenticated(true);
    setUserName(email.split('@')[0] || 'User');
    navigate(role === 'farmer' ? '/farmer' : role === 'admin' ? '/admin' : '/consumer');
  };

  const handleDemoLogin = (role: 'farmer' | 'consumer' | 'admin') => {
    setRole(role);
    setIsAuthenticated(true);
    setUserName(role === 'farmer' ? 'Rajesh Kumar' : role === 'admin' ? 'Admin' : 'Priya Sharma');
    navigate(role === 'farmer' ? '/farmer' : role === 'admin' ? '/admin' : '/consumer');
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">FarmLink</span>
        </div>

        <h1 className="text-3xl font-bold font-display mb-2">
          {isAdmin ? 'Admin Login' : 'Welcome Back'}
        </h1>
        <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 h-12" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="h-12 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full h-12 font-semibold">Sign In</Button>
        </form>

        {/* Demo logins */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wider">Quick Demo Access</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('farmer')} className="text-xs">Farmer</Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('consumer')} className="text-xs">Consumer</Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')} className="text-xs">Admin</Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/role-select')} className="text-primary font-medium hover:underline">Sign up</button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
