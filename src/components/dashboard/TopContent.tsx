import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Rocket } from 'lucide-react';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData, formatNumber } from '@/data/mockData';

export function TopContent() {
  const { platform } = usePlatform();
  
  const posts = useMemo(() => {
    return platformData[platform].topPosts;
  }, [platform]);

  return (
    <Card className="col-span-1 border-none shadow-none">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-lg font-semibold">Top Performing Content</CardTitle>
        <p className="text-sm text-muted-foreground">
          Posts driving the most engagement
        </p>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-4 p-4 rounded-lg bg-card border hover:shadow-sm transition-shadow">
            {/* Thumbnail */}
            <div className={`w-20 h-20 rounded-md flex-shrink-0 ${post.thumbnail} flex items-center justify-center text-white/50 bg-opacity-90`}>
              {/* Fallback icon if no actual image */}
               <div className="text-xs">IMG</div>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-medium truncate pr-2" title={post.caption}>{post.caption}</h4>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {post.postedAt}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-end justify-between mt-2">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-sage" fill="currentColor" fillOpacity={0.3} />
                    <span>{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-ocean" />
                     <span>{formatNumber(post.comments)}</span>
                  </div>
                </div>
                
                <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Rocket className="w-3 h-3 mr-1.5" />
                  Boost
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
