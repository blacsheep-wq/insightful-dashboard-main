import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  TrendingUp,
  HelpCircle,
  Menu,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { usePlatform, Platform } from '@/contexts/PlatformContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddAccountModal } from './AddAccountModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: FileText, label: 'Content', path: '/dashboard/content' },
  { icon: Users, label: 'Audience', path: '/dashboard/audience' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const platforms: { id: Platform; icon: React.ElementType; label: string; color: string }[] = [
  { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-coral' },
  { id: 'twitter', icon: Twitter, label: 'X (Twitter)', color: 'text-foreground' },
  { id: 'youtube', icon: Youtube, label: 'YouTube', color: 'text-destructive' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-ocean' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { platform, setPlatform, connectedPlatforms } = usePlatform();
  // const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  // No longer strictly needed for rendering the list, but if we need current platform details elsewhere:
  // const currentPlatform = platform ? platforms.find(p => p.id === platform) : null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside 
      className={cn(
        "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo & Toggle */}
      <div className={cn("flex items-center px-6 py-5 border-b border-sidebar-border", isOpen ? "gap-3" : "justify-center px-0")}>
        {isOpen ? (
          <>
            <button onClick={() => setIsOpen(false)} className="text-sidebar-foreground hover:bg-sidebar-accent p-1 rounded-md">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shrink-0">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground whitespace-nowrap overflow-hidden">
              SocialPulse
            </span>
          </>
        ) : (
          <button onClick={() => setIsOpen(true)} className="text-sidebar-foreground hover:bg-sidebar-accent p-2 rounded-md">
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Platform Switcher & Add Account */}
      <div className={cn("py-4 space-y-2", isOpen ? "px-4" : "px-2")}>
        {connectedPlatforms.map((p) => {
          const pData = platforms.find(data => data.id === p);
          if (!pData) return null;
          const Icon = pData.icon;
          const isActive = platform === p;
          
          return (
             <button
                key={p}
                onClick={() => setPlatform(p)}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-accent w-full",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  isOpen ? "justify-start px-4 py-3 gap-3" : "justify-center p-3"
                )}
                title={!isOpen ? pData.label : undefined}
             >
                <Icon className={cn('h-5 w-5', pData.color)} />
                {isOpen && <span>{pData.label}</span>}
             </button>
          );
        })}

        {/* Add Account Button */}
        <AddAccountModal>
          <button
            className={cn(
              "flex items-center rounded-lg text-sm font-medium transition-colors hover:bg-accent w-full text-muted-foreground",
              isOpen ? "justify-start px-4 py-3 gap-3" : "justify-center p-3"
            )}
            title={!isOpen ? "Add Account" : undefined}
          >
            <Plus className="h-5 w-5" />
            {isOpen && <span>Add Account</span>}
          </button>
        </AddAccountModal>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 py-2", isOpen ? "px-4" : "px-2")}>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'sidebar-item w-full flex items-center',
                    isActive && 'sidebar-item-active',
                    isOpen ? "" : "justify-center p-3"
                  )}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help Card */}
      {isOpen && (
        <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-ocean/10 p-4 animate-fade-in">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <p className="mb-2 text-sm font-medium text-sidebar-foreground">Know more</p>
          <p className="mb-3 text-xs text-muted-foreground">Get support</p>
          <button 
            onClick={() => navigate('/dashboard/faq')}
            className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            FAQs
          </button>
        </div>
      )}

      {/* User & Logout */}
      <div className={cn("border-t border-sidebar-border py-4", isOpen ? "px-4" : "px-2")}>
        <button
          onClick={handleLogout}
          className={cn(
            "sidebar-item w-full flex items-center text-muted-foreground hover:text-destructive",
            isOpen ? "" : "justify-center p-3"
          )}
          title={!isOpen ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {isOpen && <span className="ml-3 truncate">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
