import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData } from '@/data/mockData';

export function BestTimeHeatmap() {
  const { platform } = usePlatform();
  
  const data = useMemo(() => {
    return platformData[platform].bestTimeData;
  }, [platform]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Helper to get color intensity based on value
  const getIntensityColor = (value: number) => {
    if (value < 20) return 'bg-primary/5';
    if (value < 40) return 'bg-primary/20';
    if (value < 60) return 'bg-primary/40';
    if (value < 80) return 'bg-primary/60';
    return 'bg-primary/90';
  };

  return (
    <Card className="col-span-1 border-none shadow-none">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-lg font-semibold">Best Time to Post</CardTitle>
        <p className="text-sm text-muted-foreground">
          Activity intensity by day and hour
        </p>
      </CardHeader>
      <CardContent className="px-0 overflow-x-auto">
        <div className="min-w-[500px]">
           {/* Header Row (Hours) */}
           <div className="flex mb-2">
             <div className="w-12 flex-shrink-0"></div>
             <div className="flex flex-1 justify-between">
               {hours.map((hour) => (
                 <div key={hour} className="w-[3%] text-[0.6rem] text-center text-muted-foreground">
                   {hour % 6 === 0 ? hour : ''}
                 </div>
               ))}
             </div>
           </div>
           
           {/* Grid */}
           <div className="space-y-1">
             {days.map((day) => (
               <div key={day} className="flex items-center h-8">
                 <div className="w-12 text-xs font-medium text-muted-foreground flex-shrink-0">
                   {day}
                 </div>
                 <div className="flex flex-1 gap-[2px] h-full">
                   {hours.map((hour) => {
                     const point = data.find(p => p.day === day && p.hour === hour);
                     const value = point ? point.value : 0;
                     return (
                       <div 
                         key={`${day}-${hour}`}
                         className={`flex-1 rounded-sm transition-all hover:ring-2 ring-primary/50 cursor-help relative group ${getIntensityColor(value)}`}
                       >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap border">
                            {day} {hour}:00 - Intensity: {value}%
                          </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
             <span>Less Active</span>
             <div className="flex gap-1">
               <div className="w-3 h-3 rounded bg-primary/5"></div>
               <div className="w-3 h-3 rounded bg-primary/20"></div>
               <div className="w-3 h-3 rounded bg-primary/40"></div>
               <div className="w-3 h-3 rounded bg-primary/60"></div>
               <div className="w-3 h-3 rounded bg-primary/90"></div>
             </div>
             <span>More Active</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
