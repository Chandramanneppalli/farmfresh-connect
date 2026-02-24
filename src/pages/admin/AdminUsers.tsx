import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Shield, Tractor, ShoppingBag, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  user_id: string;
  full_name: string;
  phone: string | null;
  farm_name: string | null;
  created_at: string;
  role: string;
}

const roleConfig = {
  farmer: { icon: Tractor, color: 'bg-primary/15 text-primary', label: 'Farmer' },
  consumer: { icon: ShoppingBag, color: 'bg-farm-gold/15 text-farm-gold', label: 'Consumer' },
  admin: { icon: Shield, color: 'bg-farm-sky/15 text-farm-sky', label: 'Admin' },
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, phone, farm_name, created_at');

      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (profiles && roles) {
        const roleMap = Object.fromEntries(roles.map(r => [r.user_id, r.role]));
        const merged = profiles.map(p => ({
          ...p,
          role: roleMap[p.user_id] || 'consumer',
        }));
        setUsers(merged);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all platform users</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {(['farmer', 'consumer', 'admin'] as const).map(role => {
          const cfg = roleConfig[role];
          const count = users.filter(u => u.role === role).length;
          return (
            <div key={role} className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
              <cfg.icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold text-card-foreground">{count}</p>
              <p className="text-xs text-muted-foreground capitalize">{cfg.label}s</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users by name or role..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-11" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Farm</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const cfg = roleConfig[u.role as keyof typeof roleConfig] || roleConfig.consumer;
                  return (
                    <tr key={u.user_id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-card-foreground">{u.full_name || '—'}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cfg.color}>{cfg.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{u.phone || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{u.farm_name || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
