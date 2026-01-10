import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearch } from '@/contexts/SearchContext';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  delay = 0,
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const { searchQuery } = useSearch();

  const isHighlighted = searchQuery && title.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div
      className={cn(
        "metric-card opacity-0 animate-fade-in transition-all duration-300",
        isHighlighted && "ring-2 ring-primary scale-[1.02] shadow-lg"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-sage" />
              ) : isNegative ? (
                <TrendingDown className="h-4 w-4 text-coral" />
              ) : null}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive && 'text-sage',
                  isNegative && 'text-coral',
                  !isPositive && !isNegative && 'text-muted-foreground'
                )}
              >
                {isPositive && '+'}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', iconBg)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
    </div>
  );
}
