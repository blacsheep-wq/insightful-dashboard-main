import React, { createContext, useContext, useState, useEffect } from 'react';

export type Platform = 'instagram' | 'twitter' | 'youtube' | 'linkedin';

interface PlatformContextType {
  platform: Platform | null;
  setPlatform: (platform: Platform) => void;
  connectedPlatforms: Platform[];
  connectPlatform: (platform: Platform) => void;
  disconnectPlatform: (platform: Platform) => void;
  isConnected: (platform: Platform) => boolean;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  // Start with no connected platforms for the "free user" simulation
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);

  // Auto-select the most recently added platform or the first one if the current one is disconnected
  useEffect(() => {
    if (connectedPlatforms.length > 0 && (!platform || !connectedPlatforms.includes(platform))) {
      setPlatform(connectedPlatforms[0]);
    } else if (connectedPlatforms.length === 0) {
      setPlatform(null);
    }
  }, [connectedPlatforms, platform]);

  const connectPlatform = (newPlatform: Platform) => {
    if (!connectedPlatforms.includes(newPlatform)) {
      setConnectedPlatforms(prev => [...prev, newPlatform]);
      setPlatform(newPlatform); // Auto-switch to the new platform
    }
  };

  const disconnectPlatform = (targetPlatform: Platform) => {
    setConnectedPlatforms(prev => prev.filter(p => p !== targetPlatform));
  };

  const isConnected = (targetPlatform: Platform) => {
    return connectedPlatforms.includes(targetPlatform);
  };

  return (
    <PlatformContext.Provider value={{ 
      platform, 
      setPlatform, 
      connectedPlatforms, 
      connectPlatform, 
      disconnectPlatform,
      isConnected
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
