
import { useState, useEffect } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  CreditCard, 
  Share2, 
  LayoutDashboard, 
  LogOut, 
  Check, 
  X, 
  Code2 
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferences, DateRange } from '@/contexts/PreferencesContext';

import { useSearchParams, useLocation } from 'react-router-dom';

export default function Settings() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialTab = searchParams.get('tab') || 'account';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [showAddAccountDialog, setShowAddAccountDialog] = useState(false);

  // Check for upgrade popup state from navigation
  useEffect(() => {
    if (location.state && (location.state as any).showUpgradePopup) {
       setShowAddAccountDialog(true);
       // Optional: Clear state so it doesn't show on refresh? 
       // For a simple app, checking location.state is enough as it clears on refresh usually or navigating away.
       // Actually, React Router state persists on refresh in some histories, but usually fine for this "one-off" action.
       // Ensuring tab is billing is handled by URL param, but we can enforce it here too:
       if (activeTab !== 'billing') setActiveTab('billing');
    }
  }, [location.state, activeTab]);

  const { 
    dateRange, setDateRange, 
    includeRetweets, setIncludeRetweets, 
    primaryPlatform, setPrimaryPlatform,
    connectedPlatforms, setConnectedPlatforms
  } = usePreferences();

  // Mock State
  const [user, setUser] = useState({
    name: 'Mr. K',
    email: 'mr.k@example.com',
    image: '',
  });

  const [notifications, setNotifications] = useState({
    weeklyReport: true,
    spikeAlerts: true,
    systemUpdates: false,
  });

  // connectedPlatforms moved to Context

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const togglePlatform = (id: string) => {
    setConnectedPlatforms(prev => prev.map(p => 
      p.id === id ? { ...p, connected: !p.connected } : p
    ));
  };

  const navItems = [
    { id: 'account', label: 'Account & Profile', icon: User },
    { id: 'platforms', label: 'Connected Platforms', icon: Share2 },
    { id: 'analytics', label: 'Analytics Preferences', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Usage', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-background">
      {/* Settings Sidebar */}
      <aside className="w-full md:w-64 border-r bg-muted/40 p-6 space-y-2 overflow-y-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-6 px-2">Settings</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Account Section */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold">Account & Profile</h3>
                <p className="text-muted-foreground">Manage your personal information and profile settings.</p>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Update your public profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.image} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={user.name} 
                        onChange={(e) => setUser({...user, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Connected Platforms Section */}
          {activeTab === 'platforms' && (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">Connected Platforms</h3>
                    <p className="text-muted-foreground">Manage your social media connections and integrations.</p>
                  </div>
                  <Button onClick={() => setShowAddAccountDialog(true)}>Add account</Button>
                </div>
              <Separator />

              <Dialog open={showAddAccountDialog} onOpenChange={setShowAddAccountDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">Upgrade Plan</DialogTitle>
                    <DialogDescription className="text-center text-lg font-medium py-4">
                      Try pro plan for more account services.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex gap-2 sm:justify-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowAddAccountDialog(false)}
                      className="text-muted-foreground hover:bg-transparent hover:text-foreground"
                    >
                      close
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowAddAccountDialog(false);
                        setActiveTab('billing');
                      }}
                    >
                      Ok
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="grid gap-4">
                {connectedPlatforms.map((platform) => (
                  <Card key={platform.id} className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                        {platform.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{platform.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {platform.connected ? 'Connected and syncing' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {platform.connected ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                          <Check className="h-3 w-3 mr-1" /> Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disconnected</Badge>
                      )}
                      
                      <Button 
                        variant={platform.connected ? "destructive" : "default"}
                        size="sm"
                        onClick={() => togglePlatform(platform.id)}
                      >
                        {platform.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Preferences */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold">Analytics Preferences</h3>
                <p className="text-muted-foreground">Customize how your data is calculated and displayed.</p>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Default Date Range</Label>
                    <Select 
                      value={dateRange} 
                      onValueChange={(val: DateRange) => setDateRange(val)}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 Days</SelectItem>
                        <SelectItem value="14">Last 14 Days</SelectItem>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="90">Last 3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Include Retweets/Shares</Label>
                      <p className="text-sm text-muted-foreground">
                        Count retweets and shares in total engagement metrics
                      </p>
                    </div>
                    <Switch 
                      checked={includeRetweets} 
                      onCheckedChange={setIncludeRetweets} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Platform</Label>
                    <Select 
                      value={primaryPlatform} 
                      onValueChange={setPrimaryPlatform} 
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">This platform will be shown by default on the overview.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
               <div>
                <h3 className="text-2xl font-semibold">Notifications</h3>
                <p className="text-muted-foreground">Configure how and when you want to be notified.</p>
              </div>
              <Separator />
              <Card>
                <CardContent className="pt-6 space-y-6">
                   <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Weekly Report Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a summary of your performance every Monday
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.weeklyReport} 
                      onCheckedChange={(c) => setNotifications({...notifications, weeklyReport: c})} 
                    />
                  </div>
                  <Separator />
                   <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Spike Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when engagement jumps by more than 50%
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.spikeAlerts} 
                      onCheckedChange={(c) => setNotifications({...notifications, spikeAlerts: c})} 
                    />
                  </div>
                  <Separator />
                   <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        News about new features and maintenance
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.systemUpdates} 
                      onCheckedChange={(c) => setNotifications({...notifications, systemUpdates: c})} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Section */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
               <div>
                <h3 className="text-2xl font-semibold">Billing & Usage</h3>
                <p className="text-muted-foreground">View your current plan and API usage details.</p>
              </div>
              <Separator />
              
              <div className="grid gap-6">
                {/* Active Trial Plan */}
                <Card className="bg-primary/5 border-primary/20 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4">
                     <Badge className="bg-primary text-primary-foreground hover:bg-primary">Current Plan</Badge>
                   </div>
                   <CardHeader>
                     <CardTitle className="text-3xl font-bold text-primary">Trial Plan</CardTitle>
                     <CardDescription>Unlimited Access (Trial)</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">Free</div>
                     <p className="text-sm text-muted-foreground mt-2">Unlimited plan upto usage limits</p>
                   </CardContent>
                   <CardFooter>
                     <Button variant="outline" className="w-full sm:w-auto">Manage Subscription</Button>
                   </CardFooter>
                </Card>

                {/* Available Pro Plan */}
                <Card className="shadow-sm relative overflow-hidden">
                   <CardHeader>
                     <CardTitle className="text-2xl font-bold">Pro Plan</CardTitle>
                     <CardDescription>Upgrade for even more power</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                     <div className="space-y-2 mt-4">
                       <p className="text-sm text-muted-foreground flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Advanced Analytics</p>
                       <p className="text-sm text-muted-foreground flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> AI Content Generation</p>
                       <p className="text-sm text-muted-foreground flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Priority Support</p>
                     </div>
                   </CardContent>
                   <CardFooter>
                     <Button className="w-full sm:w-auto">Buy Subscription</Button>
                   </CardFooter>
                </Card>

                {/* Usage Limits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Limits</CardTitle>
                    <CardDescription>Monthly API calls and analysis (applies to Trial Plan)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Calls</span>
                        <span className="text-muted-foreground">8,432 / 10,000</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                     <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Posts Analyzed</span>
                        <span className="text-muted-foreground">450 / 500</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}


        </div>
      </main>
    </div>
  );
}
