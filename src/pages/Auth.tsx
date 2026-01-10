import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type AuthMode = 'signin' | 'signup';

const socialProviders = [
  { name: 'Google', icon: '/google-icon.svg', bg: 'bg-card hover:bg-accent' },
  { name: 'X (Twitter)', icon: '/x-icon.svg', bg: 'bg-card hover:bg-accent' },
  { name: 'Instagram', icon: '/instagram-icon.svg', bg: 'bg-card hover:bg-accent' },
  { name: 'LinkedIn', icon: '/linkedin-icon.svg', bg: 'bg-card hover:bg-accent' },
];

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      console.error(err);
      setError('Failed to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="absolute right-4 top-4 lg:hidden bg-background/80 backdrop-blur-sm p-1 rounded-full shadow-md border border-border">
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SocialPulse</span>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            {mode === 'signin' ? 'Welcome back!' : 'Create an account'}
          </h1>
          <p className="mb-8 text-muted-foreground">
            {mode === 'signin'
              ? 'Enter your credentials to access your dashboard.'
              : 'Start tracking your social media analytics today.'}
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="animate-pulse-soft">
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : mode === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>



          {/* Toggle Mode */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-medium text-primary hover:underline"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-ocean to-sage items-center justify-center p-12 overflow-hidden">
        {/* Dynamic Background Circles */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse-soft" />
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

        <div className="absolute right-6 top-6 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/30 hover:scale-110 transition-transform duration-200">
          <ThemeToggle />
        </div>

        <div className="text-center z-10">
          {/* Floating Cards */}
          <div className="relative mb-8">
            <div className="absolute -left-16 -top-8 rounded-2xl bg-card/90 p-4 shadow-xl backdrop-blur-sm animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-sage" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="text-lg font-bold text-foreground">+24.5%</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-12 top-4 rounded-2xl bg-card/90 p-4 shadow-xl backdrop-blur-sm animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-coral/20 flex items-center justify-center">
                  <span className="text-lg">❤️</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <p className="text-lg font-bold text-foreground">4.8%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-card/80 p-8 shadow-2xl backdrop-blur-sm animate-fade-in hover:scale-102 transition-transform duration-500">
              <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-sage-light to-ocean-light dark:from-sage/20 dark:to-ocean/20 flex items-center justify-center">
                <div className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>📊</div>
              </div>
              <div className="space-y-3">
                <div className="h-3 rounded-full bg-muted w-full overflow-hidden">
                   <div className="h-full bg-primary/20 animate-slide-in" />
                </div>
                <div className="h-3 rounded-full bg-muted w-3/4 overflow-hidden">
                   <div className="h-full bg-primary/20 animate-slide-in" style={{ animationDelay: '100ms' }}/>
                </div>
                <div className="h-3 rounded-full bg-muted w-1/2 overflow-hidden">
                   <div className="h-full bg-primary/20 animate-slide-in" style={{ animationDelay: '200ms' }}/>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-primary-foreground mb-3 animate-fade-in" style={{ animationDelay: '600ms' }}>
            Track Your Growth
          </h2>
          <p className="text-primary-foreground/80 max-w-sm mx-auto animate-fade-in" style={{ animationDelay: '800ms' }}>
            Get powerful insights across all your social platforms in one beautiful dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
