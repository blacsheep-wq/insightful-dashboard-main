import { Video, Repeat2, MousePointerClick } from 'lucide-react';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function PlatformSpecificCard() {
  const { platform } = usePlatform();
  const { platformSpecific } = platformData[platform];

  const getIcon = () => {
    switch (platform) {
      case 'youtube':
        return Video;
      case 'twitter':
        return Repeat2;
      default:
        return MousePointerClick;
    }
  };

  const getIconStyle = () => {
    switch (platform) {
      case 'youtube':
        return { color: 'text-destructive', bg: 'bg-destructive/10' };
      case 'twitter':
        return { color: 'text-foreground', bg: 'bg-muted' };
      case 'instagram':
        return { color: 'text-coral', bg: 'bg-coral-light' };
      case 'linkedin':
        return { color: 'text-ocean', bg: 'bg-ocean-light' };
      default:
        return { color: 'text-primary', bg: 'bg-primary/10' };
    }
  };

  const Icon = getIcon();
  const style = getIconStyle();

  return (
    <div className="metric-card opacity-0 animate-fade-in" style={{ animationDelay: '250ms' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{platformSpecific.label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{platformSpecific.value}</p>
          <p className="mt-2 text-xs text-muted-foreground">Platform-specific metric</p>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', style.bg)}>
          <Icon className={cn('h-6 w-6', style.color)} />
        </div>
      </div>
    </div>
  );
}
