import { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, TrendingUp, X, Plus } from 'lucide-react';
import { AddAccountModal } from './AddAccountModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@/contexts/SearchContext';
import { usePlatform, Platform } from '@/contexts/PlatformContext';
import { platformData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  isSidebarOpen: boolean;
}

interface SearchItem {
  id: string;
  label: string;
  type: 'Page' | 'Setting' | 'Platform' | 'Feature';
  path?: string;
  action?: () => void;
}

export function TopBar({ isSidebarOpen }: TopBarProps) {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const { setPlatform } = usePlatform();
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search Data Index
  const searchIndex: SearchItem[] = [
    // Pages
    { id: 'overview', label: 'Overview', type: 'Page', path: '/dashboard' },
    { id: 'content', label: 'Content Generator', type: 'Page', path: '/dashboard/content' },
    { id: 'audience', label: 'Audience Insights', type: 'Page', path: '/dashboard/audience' },
    { id: 'settings', label: 'Settings', type: 'Page', path: '/dashboard/settings' },
    { id: 'faq', label: 'FAQ & Support', type: 'Page', path: '/dashboard/faq' },
    
    // Features & Tools
    { id: 'ai_writer', label: 'AI Content Writer', type: 'Feature', path: '/dashboard/content' },
    { id: 'trends', label: 'Trend Analysis', type: 'Feature', path: '/dashboard/content' },
    { id: 'persona', label: 'Audience Persona', type: 'Feature', path: '/dashboard/audience' },
    { id: 'heatmap', label: 'Active Hours Heatmap', type: 'Feature', path: '/dashboard/audience' },
    { id: 'locations', label: 'Top Locations', type: 'Feature', path: '/dashboard/audience' },
    { id: 'ghost', label: 'Ghost Follower Filter', type: 'Feature', path: '/dashboard/audience' },
    
    // Settings Sections
    { id: 'profile', label: 'Edit Profile', type: 'Setting', path: '/dashboard/settings' },
    { id: 'connected_apps', label: 'Connected Platforms', type: 'Setting', path: '/dashboard/settings' },
    { id: 'billing', label: 'Billing & Usage', type: 'Setting', path: '/dashboard/settings?tab=billing' },
    { id: 'team', label: 'Team Management', type: 'Setting', path: '/dashboard/settings' },

    // Actions
    { id: 'upgrade', label: 'Upgrade to Pro', type: 'Feature', path: '/dashboard/settings?tab=billing' },
    { id: 'add_account', label: 'Connect New Account', type: 'Feature', action: () => document.getElementById('add-account-trigger')?.click() },

    // Platforms
    { id: 'instagram', label: 'Instagram Analytics', type: 'Platform', action: () => setPlatform('instagram') },
    { id: 'twitter', label: 'X (Twitter) Analytics', type: 'Platform', action: () => setPlatform('twitter') },
    { id: 'youtube', label: 'YouTube Analytics', type: 'Platform', action: () => setPlatform('youtube') },
    { id: 'linkedin', label: 'LinkedIn Analytics', type: 'Platform', action: () => setPlatform('linkedin') },
  ];

  // Filter suggestions
  const suggestions = searchQuery.length > 0 
    ? searchIndex.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item: SearchItem) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      item.action();
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Left: Logo (Visible only if sidebar is closed) */}
      <div className="flex items-center w-[200px]">
        {!isSidebarOpen && (
          <div className="flex items-center gap-3 animate-fade-in">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold whitespace-nowrap hidden md:block">SocialPulse</span>
          </div>
        )}
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center max-w-xl mx-4" ref={searchContainerRef}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            placeholder="Search pages, settings, or platforms..."
            className="pl-10 bg-background border-border w-full transition-all focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
             <button 
              onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {suggestions.length > 0 ? (
                <div className="py-2">
                  <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Suggestions
                  </div>
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                         {item.type === 'Page' && <Search className="h-3 w-3 text-muted-foreground" />}
                         {item.type === 'Platform' && <TrendingUp className="h-3 w-3 text-muted-foreground" />}
                         {item.type === 'Setting' && <User className="h-3 w-3 text-muted-foreground" />}
                         {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded ml-2">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 w-[200px] justify-end">
        <ThemeToggle />

        {/* Notification replaced by Add Account */}
        <AddAccountModal>
          <Button id="add-account-trigger" variant="ghost" size="icon" className="h-10 w-10 rounded-full">
             <Plus className="h-6 w-6 stroke-[3]" />
          </Button>
        </AddAccountModal>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="hidden text-sm font-medium md:block">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings?tab=billing')}>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
