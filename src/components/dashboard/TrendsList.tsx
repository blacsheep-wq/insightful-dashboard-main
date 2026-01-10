import { TrendingUp, Hash } from 'lucide-react';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData } from '@/data/mockData';
import { useSearch } from '@/contexts/SearchContext';

import { useNavigate } from 'react-router-dom';

export function TrendsList() {
  const { platform } = usePlatform();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const trends = platformData[platform].trends;

  const filteredTrends = trends.filter((trend) =>
    trend.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredTrends.length === 0) {
    return null;
  }

  const handleTrendClick = (trend: string) => {
    navigate('/dashboard/content', { state: { topic: trend.replace('#', '') } });
  };

  return (
    <div className="metric-card opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Current Trends</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Trending topics in your niche
      </p>
      <div className="flex flex-wrap gap-2">
        {filteredTrends.map((trend, index) => (
          <span
            key={trend}
            onClick={() => handleTrendClick(trend)}
            className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <Hash className="h-3.5 w-3.5" />
            {trend.replace('#', '')}
          </span>
        ))}
      </div>
    </div>
  );
}
