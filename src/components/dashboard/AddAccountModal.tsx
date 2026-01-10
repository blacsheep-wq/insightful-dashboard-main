import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Check, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { usePlatform, Platform } from '@/contexts/PlatformContext';
import { cn } from '@/lib/utils';
import { useEffect, useState } from "react";

import { XIcon } from '@/components/XIcon'; // Import XIcon

const platforms: { id: Platform; name: string; icon: any; color: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'twitter', name: 'X (Twitter)', icon: XIcon, color: 'text-zinc-900 dark:text-zinc-50' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
];

import { useNavigate } from 'react-router-dom';

interface AddAccountModalProps {
  children?: React.ReactNode;
}

export function AddAccountModal({ children }: AddAccountModalProps) {
  const { connectPlatform, isConnected } = usePlatform();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleConnect = (platformId: Platform) => {
    connectPlatform(platformId);
    setOpen(false);
  };
  
  const handleMoreServices = () => {
      setOpen(false);
      navigate('/dashboard/settings?tab=billing', { state: { showUpgradePopup: true } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : (
          <Button variant="outline" className="w-full justify-start gap-2 border-dashed">
            <Plus className="h-4 w-4" />
            Add Account
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect an Account</DialogTitle>
          <DialogDescription>
            Select a platform to add to your dashboard. This is a simulation for demonstration.
          </DialogDescription>
        </DialogHeader>
         <div className="grid gap-3 py-4">
          {platforms.map((p) => {
             const connected = isConnected(p.id);
             return (
              <Button
                key={p.id}
                variant="outline"
                className={cn(
                  "justify-between h-auto py-4 hover:bg-accent hover:text-accent-foreground",
                  connected && "opacity-50 cursor-not-allowed"
                )}
                disabled={connected}
                onClick={() => handleConnect(p.id)}
              >
                <div className="flex items-center gap-3">
                  <p.icon className={cn("h-5 w-5", p.color)} />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{p.name}</span>
                  </div>
                </div>
                {connected && <Check className="h-4 w-4 text-green-500" />}
              </Button>
             );
          })}
          
          <Button
            variant="ghost"
            className="w-full justify-center text-primary mt-2 hover:bg-primary/10 hover:text-primary"
            onClick={handleMoreServices}
          >
            More Services...
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
