import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tractor, ShoppingBag, ArrowRight, Sprout } from 'lucide-react';

const roles = [
  {
    id: 'farmer' as const,
    icon: Tractor,
    title: 'I\'m a Farmer',
    description: 'Sell your produce directly to consumers with AI-powered pricing and climate intelligence.',
    features: ['AI Price Suggestions', 'Climate Alerts', 'Quality Scan', 'Direct Orders'],
    gradient: 'bg-gradient-hero',
  },
  {
    id: 'consumer' as const,
    icon: ShoppingBag,
    title: 'I\'m a Consumer',
    description: 'Buy fresh produce directly from local farms with full traceability and transparency.',
    features: ['Farm Discovery', 'Quality Grades', 'Order Tracking', 'Direct Chat'],
    gradient: 'bg-gradient-gold',
  },
];

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">FarmLink Connect</span>
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Choose Your Role</h1>
        <p className="text-muted-foreground">Select how you'd like to use FarmLink Connect</p>
      </motion.div>

      {/* Role Cards */}
      <div className="max-w-lg mx-auto space-y-6">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            onClick={() => navigate('/signup', { state: { role: role.id } })}
            className="w-full text-left group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${role.gradient}`}>
                  <role.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-display text-card-foreground">{role.title}</h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.features.map((f) => (
                      <span key={f} className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Admin link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <button
          onClick={() => navigate('/login', { state: { role: 'admin' } })}
          className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
        >
          Admin Login
        </button>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
