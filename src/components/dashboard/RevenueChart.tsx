
import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { usePlatform } from '@/contexts/PlatformContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { platformData } from '@/data/mockData';
import { CircleHelp } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function RevenueChart() {
  const { platform } = usePlatform();
  const { dateRange } = usePreferences();
  
  const { revenueMetrics } = useMemo(() => {
    const baseMetrics = platformData[platform].revenueMetrics;
    const days = parseInt(dateRange);
    
    // Generate dynamic history based on date range
    const dynamicHistory = Array.from({ length: days }, (_, i) => ({
        name: `Day ${i + 1}`,
        revenue: Math.random() * (baseMetrics.estimatedRevenue / days * 2) // Randomize around average
    }));

    // Calculate total from dynamic data
    const totalRevenue = dynamicHistory.reduce((acc, curr) => acc + curr.revenue, 0);

    return {
        revenueMetrics: {
            ...baseMetrics,
            estimatedRevenue: totalRevenue,
            revenueHistory: dynamicHistory
        }
    };
  }, [platform, dateRange]);

  if (!revenueMetrics) return null;

  // Destructure from our dynamically calculated object
  const { estimatedRevenue, rpm, cpm, revenueHistory } = revenueMetrics;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-sm text-chart-4 font-bold">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 dark:bg-stone-900/40">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
             <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight">Estimated Revenue</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">
                   ${estimatedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                  Estimated current revenue
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                 Estimated revenue delayed by 1 day
              </p>
            </div>
            <div className="bg-secondary/20 px-3 py-1 rounded-md text-sm font-medium text-muted-foreground whitespace-nowrap">
                Last {dateRange} Days
            </div>
        </div>

        {/* Chart Section */}
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueHistory} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
                minTickGap={30}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value: number) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                activeDot={{ r: 4, strokeWidth: 0 }}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="p-4 rounded-lg bg-secondary/10 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               Revenue per 1k views (RPM)
               <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <CircleHelp className="h-3.5 w-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">How much you earned per 1,000 views</p>
                  </TooltipContent>
                </UITooltip>
               </TooltipProvider>
             </div>
             <span className="text-xl font-bold">${rpm.toFixed(2)}</span>
          </div>

          <div className="p-4 rounded-lg bg-secondary/10 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               Playback-based CPM
               <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <CircleHelp className="h-3.5 w-3.5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Cost per 1,000 monetized playbacks</p>
                  </TooltipContent>
                </UITooltip>
               </TooltipProvider>
             </div>
             <span className="text-xl font-bold">${cpm.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
