
import { Users, Eye, Zap, Target } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { LocationMap } from '@/components/dashboard/LocationMap';
import { TrendsList } from '@/components/dashboard/TrendsList';
import { BestTimeHeatmap } from '@/components/dashboard/BestTimeHeatmap';
import { TopContent } from '@/components/dashboard/TopContent';
import { PlatformSpecificCard } from '@/components/dashboard/PlatformSpecificCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData, formatNumber } from '@/data/mockData';

export default function Overview() {
  const { platform } = usePlatform();

  if (!platform) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
        <div className="bg-primary/10 p-6 rounded-full mb-6">
           <div className="text-4xl">👋</div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Get started by connecting a social media account. Click the "+ Add Account" button in the sidebar to begin.
        </p>
        {/* Optional: We could put an Add Account button here too, reusing the modal logic */}
      </div>
    );
  }

  const data = platformData[platform];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics Overview</h1>
        <p className="text-muted-foreground">
          Track your performance across platforms
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Followers"
          value={formatNumber(data.followers.total)}
          change={data.followers.growth}
          icon={Users}
          iconColor="text-sage"
          iconBg="bg-sage-light"
          delay={0}
        />
        <MetricCard
          title="Reach"
          value={formatNumber(data.reach)}
          change={8.2}
          icon={Eye}
          iconColor="text-ocean"
          iconBg="bg-ocean-light"
          delay={50}
        />
        <MetricCard
          title="Impressions"
          value={formatNumber(data.impressions)}
          change={15.3}
          icon={Zap}
          iconColor="text-coral"
          iconBg="bg-coral-light"
          delay={100}
        />
        <MetricCard
          title="Engagement Rate"
          value={`${data.engagementRate}%`}
          change={2.1}
          icon={Target}
          iconColor="text-lavender"
          iconBg="bg-lavender-light"
          delay={150}
        />
      </div>

      {/* Charts & Details */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <EngagementChart />
          <LocationMap />
        </div>
        <div className="space-y-6">
          <PlatformSpecificCard />
          <TrendsList />
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
         {/* Best Time Heatmap */}
         <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
           <BestTimeHeatmap />
         </div>

         {/* Top Performing Content */}
         <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
           <TopContent />
         </div>
      </div>

      {/* Revenue Section */}
      <div className="mt-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <RevenueChart />
      </div>
    </div>
  );
}
