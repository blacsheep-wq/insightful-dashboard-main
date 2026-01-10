
import { useState, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  Smartphone, 
  Clock, 
  TrendingUp,
  Zap,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { usePlatform } from '@/contexts/PlatformContext';
import { LocationMap } from '@/components/dashboard/LocationMap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { platformData, formatNumber } from '@/data/mockData';

// --- Helper for Randomization based on string seed (Platform ID) ---
const seededRandom = (seed: string) => {
  let h = 0xdeadbeef;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h >>> 0) / 4294967296);
  }
};

const getPlatformColor = (platform: string) => {
  switch(platform) {
    case 'instagram': return '#833AB4';
    case 'twitter': return '#1DA1F2';
    case 'youtube': return '#FF0000';
    case 'linkedin': return '#0A66C2';
    default: return '#6366f1';
  }
};

const generateHeatmapData = (seed: string) => {
  const rng = seededRandom(seed);
  const times = ['9AM', '12PM', '3PM', '6PM', '9PM'];
  return times.map(time => ({
    time,
    mon: Math.floor(rng() * 60) + 40,
    tue: Math.floor(rng() * 60) + 40,
    wed: Math.floor(rng() * 60) + 40,
    thu: Math.floor(rng() * 60) + 40,
    fri: Math.floor(rng() * 60) + 40,
    sat: Math.floor(rng() * 60) + 40,
    sun: Math.floor(rng() * 60) + 40,
  }));
};

const generateInterests = (seed: string) => {
  const rng = seededRandom(seed);
  const allInterests = [
    'SaaS', 'Marketing', 'Design', 'Crypto', 'AI Tools', 'Startups', 
    'Productivity', 'Finance', 'Coding', 'Travel', 'Fitness', 'Gaming'
  ];
  return allInterests
    .sort(() => rng() - 0.5)
    .slice(0, 8)
    .map(label => ({
      label,
      size: rng() > 0.7 ? 'text-2xl' : rng() > 0.4 ? 'text-xl' : 'text-sm',
      color: rng() > 0.5 ? 'text-primary' : 'text-blue-500' // Simple color variation
    }));
};

export default function Audience() {
  const { platform, setPlatform } = usePlatform();
  const navigate = useNavigate();
  const [loadingPersona, setLoadingPersona] = useState(false);
  const [personaGenerated, setPersonaGenerated] = useState(false);
  const [dateRange, setDateRange] = useState('30');

  const [ghostFilter, setGhostFilter] = useState(false);

  // Safe-guard hooks even if platform is null
  const safePlatform = platform || 'instagram'; // default for hooks
  const bestTimes = useMemo(() => generateHeatmapData(safePlatform + 'heatmap'), [safePlatform]);
  const interests = useMemo(() => generateInterests(safePlatform + 'interests'), [safePlatform]);
  const rng = useMemo(() => seededRandom(safePlatform), [safePlatform]);

  if (!platform) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in min-h-[60vh]">
        <div className="bg-primary/10 p-6 rounded-full mb-6">
           <div className="text-4xl">👥</div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Audience Insights</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Connect a social media account to unlock deep insights about your followers, including demographics, active hours, and top locations.
        </p>
      </div>
    );
  }

  // Dynamic Data (Only runs if platform exists)
  const currentMetrics = platformData[platform];
  const color = getPlatformColor(platform);

  const ageGenderData = [
    { age: '18-24', male: Math.floor(rng() * 30)+10, female: Math.floor(rng() * 30)+15 },
    { age: '25-34', male: Math.floor(rng() * 40)+20, female: Math.floor(rng() * 40)+25 },
    { age: '35-44', male: Math.floor(rng() * 30)+10, female: Math.floor(rng() * 30)+15 },
    { age: '45-54', male: Math.floor(rng() * 20)+5, female: Math.floor(rng() * 20)+10 },
    { age: '55+', male: Math.floor(rng() * 15)+1, female: Math.floor(rng() * 10)+1 },
  ];

  const deviceData = [
    { name: 'Mobile', value: Math.floor(rng() * 20) + 60, color: '#6366f1' },
    { name: 'Desktop', value: Math.floor(rng() * 15) + 10, color: '#8b5cf6' },
  ];
  deviceData.push({ name: 'Tablet', value: 100 - deviceData[0].value - deviceData[1].value, color: '#ec4899' });

  const churnData = currentMetrics.engagementData.map(d => ({
    day: d.name,
    new: Math.floor(d.likes / 100) + Math.floor(rng() * 20),
    lost: Math.floor(d.likes / 400) + Math.floor(rng() * 5)
  }));

  const generatePersona = () => {
    setLoadingPersona(true);
    setTimeout(() => {
      setLoadingPersona(false);
      setPersonaGenerated(true);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audience Insights</h1>
          <p className="text-muted-foreground mt-1">Deep dive into who follows you on {platformData[platform].platformSpecific.label === 'Retweets & Mentions' ? 'Twitter' : platform.charAt(0).toUpperCase() + platform.slice(1)}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={platform} onValueChange={(val: any) => setPlatform(val)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="lifetime">Lifetime</SelectItem>
            </SelectContent>
          </Select>


        </div>
      </div>

      {/* AI Persona Generator */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-transparent border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-primary" />
              <CardTitle>AI Audience Persona</CardTitle>
            </div>
            {!personaGenerated && (
              <Button onClick={generatePersona} disabled={loadingPersona}>
                {loadingPersona ? 'Analyzing...' : 'Generate Persona'}
              </Button>
            )}
          </div>
          <CardDescription>
            Let our AI analyze millions of data points to create a realistic profile of your ideal follower.
          </CardDescription>
        </CardHeader>
        {personaGenerated && (
          <CardContent className="animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10 flex flex-col md:flex-row gap-6 items-start">
               <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-3xl shadow-lg shrink-0">
                 👨‍💻
               </div>
               <div className="flex-1 space-y-4">
                 <div>
                   <h3 className="text-xl font-bold text-foreground">"Tech-Savvy Tyler"</h3>
                   <p className="text-sm text-muted-foreground">Core Demographic: Male, 25-34, USA</p>
                 </div>
                 <p className="text-foreground/80 leading-relaxed">
                   Tyler lives in urban hubs like New York or SF. He's active mostly in the evenings (8 PM - 11 PM) after work. 
                   He prefers <span className="font-semibold text-primary">short-form content</span> about coding tips, SaaS trends, and productivity hacks.
                   He follows crypto news and high-growth startups.
                 </p>
                 <div className="flex items-center gap-4 pt-2">
                   <Button onClick={() => navigate('/dashboard/content')} className="gap-2">
                     Generate Content for Tyler <ArrowUpRight className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="sm" onClick={() => setPersonaGenerated(false)}>Reset</Button>
                 </div>
               </div>
             </div>
          </CardContent>
        )}
      </Card>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column (60% approx -> 3/5 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
           {/* Active Hours Heatmap */}
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Active Hours
              </CardTitle>
              <CardDescription>When your followers are most active online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] w-full flex flex-col justify-between">
                {bestTimes.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-10">{row.time}</span>
                    <div className="flex-1 flex gap-1 h-10">
                      {['mon','tue','wed','thu','fri','sat','sun'].map((day) => {
                         // @ts-ignore
                         const val = row[day];
                         const opacity = val / 100;
                         return (
                           <div 
                             key={day} 
                             className="flex-1 rounded-sm bg-primary hover:opacity-80 transition-opacity cursor-help"
                             style={{ opacity: Math.max(0.1, opacity) }}
                             title={`${day.toUpperCase()} @ ${row.time}: ${val}% Active`}
                           />
                         );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pl-12 pt-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                    <span key={d} className="text-xs text-muted-foreground flex-1 text-center">{d}</span>
                  ))}
                </div>
              </div>
            </CardContent>
           </Card>

          {/* Age & Gender */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Age & Gender Distribution</CardTitle>
                <Badge variant="outline">Top: 25-34</Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageGenderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="male" name="Male %" fill={color} fillOpacity={0.6} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="female" name="Female %" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Interest Tag Cloud */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Interests</CardTitle>
              <CardDescription>Topics your followers engage with most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-muted/10 rounded-lg border border-dashed">
                {interests.map((tag) => (
                  <span key={tag.label} className={`${tag.size} ${tag.color} font-bold cursor-pointer hover:scale-110 transition-transform`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column (40% approx -> 2/5 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
           {/* Audience Summary Card */}
           <Card className="bg-gradient-to-br from-primary to-purple-700 text-primary-foreground overflow-hidden relative">
             <div className="absolute inset-0 bg-black/10" />
             <CardHeader className="relative z-10">
               <CardTitle className="text-primary-foreground">Total Audience</CardTitle>
               <CardDescription className="text-primary-foreground/80">Across all platforms</CardDescription>
             </CardHeader>
             <CardContent className="relative z-10">
               <div className="flex items-baseline gap-2">
                 <span className="text-5xl font-bold">{formatNumber(currentMetrics.followers.total)}</span>
                 <span className="text-green-300 font-medium flex items-center bg-green-500/20 px-2 py-0.5 rounded text-sm">
                   <TrendingUp className="h-4 w-4 mr-1" /> +{currentMetrics.followers.growth}%
                 </span>
               </div>
               <div className="mt-6 flex gap-4">
                  <div className="space-y-1">
                    <p className="text-sm opacity-80">Engagement</p>
                    <p className="text-xl font-semibold">{currentMetrics.engagementRate}%</p>
                  </div>
                  <div className="w-px bg-primary-foreground/20 h-10" />
                  <div className="space-y-1">
                    <p className="text-sm opacity-80">Reach</p>
                    <p className="text-xl font-semibold">{formatNumber(currentMetrics.reach)}</p>
                  </div>
               </div>
             </CardContent>
           </Card>

           {/* Ghost Filter Control */}
           <Card>
             <CardContent className="py-4 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className="bg-muted p-2 rounded-full">
                   <UserCheck className="h-4 w-4 text-muted-foreground" />
                 </div>
                 <div className="space-y-0.5">
                   <Label>Filter Ghost Accounts</Label>
                   <p className="text-xs text-muted-foreground">Exclude bots/inactive</p>
                 </div>
               </div>
               <Switch checked={ghostFilter} onCheckedChange={setGhostFilter} />
             </CardContent>
           </Card>

           {/* Top Locations (Map & List) */}
           <Card>
             <CardHeader>
               <div className="flex items-center justify-between">
                 <CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Top Locations</CardTitle>
               </div>
             </CardHeader>
             <CardContent className="space-y-6">
                {/* Map Container */}
                <div className="h-[180px] w-full rounded-lg overflow-hidden border">
                   <LocationMap />
                </div>
                {/* List */}
                <div className="space-y-3">
                  {currentMetrics.locationData?.slice(0, 5).map((loc, i) => (
                    <div key={loc.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-muted-foreground">{i + 1}.</span>
                        <span className="font-medium">{loc.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{loc.value}%</span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-sm text-muted-foreground text-center py-4">No location data available</div>
                  )}
                </div>
             </CardContent>
           </Card>

           {/* Language & Device */}
           <Card>
             <CardHeader>
               <CardTitle>Demographics</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
               <div>
                 <h4 className="text-sm font-medium mb-3">Language Distribution</h4>
                 <div className="h-[150px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie 
                         data={[
                           { name: 'English', value: 65, color: '#6366f1' },
                           { name: 'Spanish', value: 15, color: '#ec4899' },
                           { name: 'French', value: 10, color: '#10b981' },
                           { name: 'Others', value: 10, color: '#94a3b8' }
                         ]} 
                         cx="50%" cy="50%" 
                         innerRadius={40} outerRadius={60} 
                         paddingAngle={5} dataKey="value"
                       >
                         {[0, 1, 2, 3].map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={['#6366f1', '#ec4899', '#10b981', '#94a3b8'][index]} />
                         ))}
                       </Pie>
                       <RechartsTooltip />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
               </div>
               <Separator />
               <div>
                  <h4 className="text-sm font-medium mb-3">Device Usage</h4>
                  <div className="flex items-center gap-2 justify-between">
                     {deviceData.map((d) => (
                       <div key={d.name} className="text-center">
                         <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2 mx-auto">
                           {d.name === 'Mobile' && <Smartphone className="h-5 w-5 text-primary" />}
                           {d.name === 'Desktop' && <Users className="h-5 w-5 text-purple-500" />}
                           {d.name === 'Tablet' && <Zap className="h-5 w-5 text-pink-500" />}
                         </div>
                         <p className="text-xs font-medium">{d.name}</p>
                         <p className="text-xs text-muted-foreground">{d.value}%</p>
                       </div>
                     ))}
                  </div>
               </div>
             </CardContent>
           </Card>

           {/* Follower Churn */}
           <Card>
             <CardHeader>
               <CardTitle>Follower Growth</CardTitle>
               <CardDescription>New vs Lost (7 days)</CardDescription>
             </CardHeader>
             <CardContent className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={churnData}>
                   <XAxis dataKey="day" hide />
                   <RechartsTooltip />
                   <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="lost" stroke="#ef4444" strokeWidth={2} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
               <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> New</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Lost</div>
               </div>
             </CardContent>
           </Card>

        </div>
      </div>
    </div>
  );
}
