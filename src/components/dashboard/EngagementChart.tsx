import { useState, useMemo, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { usePlatform } from '@/contexts/PlatformContext';
import { usePreferences, DateRange } from '@/contexts/PreferencesContext'; // Import context
import { platformData } from '@/data/mockData';

type ChartTimeRange = '7' | '14' | '30' | '90';

interface DataPoint {
  name: string;
  likes: number;
  comments: number;
  shares: number;
}

const generateMockData = (range: string, baseData: DataPoint[]): DataPoint[] => {
  const days = parseInt(range);
  
  // Generate data Points based on number of days
  return Array.from({ length: days }, (_, i) => ({
    name: `Day ${i + 1}`,
    likes: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 1000) + 100,
    shares: Math.floor(Math.random() * 500) + 50,
  }));
};

import { formatNumber } from '@/data/mockData';

export function EngagementChart() {
  const { platform } = usePlatform();
  const { dateRange } = usePreferences(); // Use global preference
  
  // Memoize data generation
  const data = useMemo(() => {
    const defaultData = platformData[platform].engagementData;
    // If range is 7, we could use baseData, but user asked for random data for all slots
    return generateMockData(dateRange, defaultData);
  }, [platform, dateRange]);

  const metrics = useMemo(() => {
    if (!data.length) return null;
    let totalEng = 0;
    let maxLikes = 0;
    let maxComments = 0;
    let maxShares = 0;

    data.forEach(d => {
      totalEng += d.likes + d.comments + d.shares;
      maxLikes = Math.max(maxLikes, d.likes);
      maxComments = Math.max(maxComments, d.comments);
      maxShares = Math.max(maxShares, d.shares);
    });

    return {
      avg: Math.round(totalEng / data.length),
      maxLikes,
      maxComments,
      maxShares
    };
  }, [data]);

  return (
    <div className="metric-card h-auto min-h-[450px] opacity-0 animate-fade-in flex flex-col p-6" style={{ animationDelay: '200ms' }}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">Engagement Over Time</h3>
        <div className="bg-secondary/20 px-3 py-1 rounded-md text-sm font-medium text-muted-foreground">
           Last {dateRange} Days
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--sage))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--sage))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--ocean))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--ocean))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--coral))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--coral))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            <Area
              type="monotone"
              dataKey="likes"
              stroke="hsl(var(--sage))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLikes)"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="hsl(var(--ocean))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorComments)"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="shares"
              stroke="hsl(var(--coral))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorShares)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {metrics && (
        <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Avg Engagement</span>
            <div className="text-2xl font-bold">{formatNumber(metrics.avg)}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">All Time High Likes</span>
            <div className="text-2xl font-bold text-sage">{formatNumber(metrics.maxLikes)}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">All Time High Comments</span>
            <div className="text-2xl font-bold text-ocean">{formatNumber(metrics.maxComments)}</div>
          </div>
           <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">All Time High Shares</span>
            <div className="text-2xl font-bold text-coral">{formatNumber(metrics.maxShares)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
