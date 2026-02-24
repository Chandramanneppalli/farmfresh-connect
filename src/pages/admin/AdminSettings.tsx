import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, IndianRupee, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    platformName: 'FarmLink Connect',
    commissionRate: '10',
    emailNotifications: true,
    smsNotifications: false,
    autoApproveOrders: false,
    maintenanceMode: false,
    minOrderAmount: '50',
    maxDeliveryDays: '7',
  });

  const handleSave = () => {
    toast({ title: 'Settings saved', description: 'Platform settings have been updated successfully.' });
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">Configure platform parameters and preferences</p>
      </motion.div>

      {/* General */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">General</h2>
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="platformName">Platform Name</Label>
            <Input id="platformName" value={settings.platformName} onChange={e => setSettings(s => ({ ...s, platformName: e.target.value }))} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
            <Input id="minOrder" type="number" value={settings.minOrderAmount} onChange={e => setSettings(s => ({ ...s, minOrderAmount: e.target.value }))} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="maxDays">Max Delivery Days</Label>
            <Input id="maxDays" type="number" value={settings.maxDeliveryDays} onChange={e => setSettings(s => ({ ...s, maxDeliveryDays: e.target.value }))} className="mt-1.5" />
          </div>
        </div>
      </div>

      {/* Financial */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee className="h-5 w-5 text-farm-gold" />
          <h2 className="text-lg font-semibold text-card-foreground">Financial</h2>
        </div>
        <div>
          <Label htmlFor="commission">Commission Rate (%)</Label>
          <Input id="commission" type="number" value={settings.commissionRate} onChange={e => setSettings(s => ({ ...s, commissionRate: e.target.value }))} className="mt-1.5" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Auto-Approve Orders</p>
            <p className="text-xs text-muted-foreground">Automatically approve orders below ₹500</p>
          </div>
          <Switch checked={settings.autoApproveOrders} onCheckedChange={() => toggleSetting('autoApproveOrders')} />
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-5 w-5 text-farm-sky" />
          <h2 className="text-lg font-semibold text-card-foreground">Notifications</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Send email alerts for new disputes and orders</p>
          </div>
          <Switch checked={settings.emailNotifications} onCheckedChange={() => toggleSetting('emailNotifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">SMS Notifications</p>
            <p className="text-xs text-muted-foreground">Send SMS alerts for critical events</p>
          </div>
          <Switch checked={settings.smsNotifications} onCheckedChange={() => toggleSetting('smsNotifications')} />
        </div>
      </div>

      {/* System */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-destructive" />
          <h2 className="text-lg font-semibold text-card-foreground">System</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Maintenance Mode</p>
            <p className="text-xs text-muted-foreground">Temporarily disable the platform for users</p>
          </div>
          <Switch checked={settings.maintenanceMode} onCheckedChange={() => toggleSetting('maintenanceMode')} />
        </div>
      </div>

      <Button onClick={handleSave} size="lg" className="w-full h-12 font-semibold">Save Settings</Button>
    </div>
  );
};

export default AdminSettings;
