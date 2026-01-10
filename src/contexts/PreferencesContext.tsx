import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DateRange = '7' | '14' | '30' | '90';

export interface ConnectedPlatform {
  id: string;
  name: string;
  connected: boolean;
  icon: string;
}

interface PreferencesContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  includeRetweets: boolean;
  setIncludeRetweets: (include: boolean) => void;
  primaryPlatform: string;
  setPrimaryPlatform: (platform: string) => void;
  connectedPlatforms: ConnectedPlatform[];
  setConnectedPlatforms: (platforms: ConnectedPlatform[] | ((prev: ConnectedPlatform[]) => ConnectedPlatform[])) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const STORAGE_PREFIX = 'insightful_pref_';

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Helper to safely load from localStorage
  const loadState = <T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Error loading preference ${key}:`, e);
      return fallback;
    }
  };

  const defaultPlatforms = [
    { id: 'instagram', name: 'Instagram', connected: true, icon: '📸' },
    { id: 'twitter', name: 'Twitter/X', connected: true, icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', connected: false, icon: '💼' },
    { id: 'facebook', name: 'Facebook', connected: false, icon: '📘' },
  ];

  const [dateRange, setDateRange] = useState<DateRange>(() => loadState('dateRange', '30'));
  const [includeRetweets, setIncludeRetweets] = useState(() => loadState('includeRetweets', true));
  const [primaryPlatform, setPrimaryPlatform] = useState(() => loadState('primaryPlatform', 'instagram'));
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatform[]>(() => loadState('connectedPlatforms', defaultPlatforms));

  // Persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'dateRange', JSON.stringify(dateRange));
  }, [dateRange]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'includeRetweets', JSON.stringify(includeRetweets));
  }, [includeRetweets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'primaryPlatform', JSON.stringify(primaryPlatform));
  }, [primaryPlatform]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'connectedPlatforms', JSON.stringify(connectedPlatforms));
  }, [connectedPlatforms]);

  return (
    <PreferencesContext.Provider 
      value={{ 
        dateRange, 
        setDateRange, 
        includeRetweets, 
        setIncludeRetweets, 
        primaryPlatform, 
        setPrimaryPlatform,
        connectedPlatforms,
        setConnectedPlatforms
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
