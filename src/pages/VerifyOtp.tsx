import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sprout, ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({ title: 'Enter OTP', description: 'Please enter the 6-digit code sent to your email.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup',
    });
    setIsLoading(false);

    if (error) {
      toast({ title: 'Verification failed', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Email verified!', description: 'Your account is now active.' });
    // Auth state change will handle navigation
  };

  const handleResend = async () => {
    setIsResending(true);
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    setIsResending(false);

    if (error) {
      toast({ title: 'Resend failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Code resent', description: 'Check your inbox for a new verification code.' });
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No email found. Please sign up first.</p>
          <Button onClick={() => navigate('/role-select')}>Go to Sign Up</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto">
        <button onClick={() => navigate('/signup')} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">FarmLink</span>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-6">
          <Mail className="h-7 w-7 text-primary" />
        </div>

        <h1 className="text-3xl font-bold font-display mb-2">Verify Your Email</h1>
        <p className="text-muted-foreground mb-1">
          We sent a 6-digit code to
        </p>
        <p className="font-medium text-foreground mb-8">{email}</p>

        <div className="flex justify-center mb-8">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={handleVerify} size="lg" className="w-full h-12 font-semibold" disabled={isLoading || otp.length !== 6}>
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Verifying...</> : 'Verify Email'}
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Didn't receive the code?{' '}
          <button onClick={handleResend} disabled={isResending} className="text-primary font-medium hover:underline disabled:opacity-50">
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
