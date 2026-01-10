import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PlatformProvider } from "@/contexts/PlatformContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Content from "./pages/Content";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";
import Audience from "./pages/Audience";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route
      path="/auth"
      element={
        <AuthRoute>
          <Auth />
        </AuthRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Overview />} />
      <Route path="content" element={<Content />} />
      <Route path="settings" element={<Settings />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="audience" element={<Audience />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  console.log("App: Component Function Called");
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <PlatformProvider>
          <PreferencesProvider>
            <SearchProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                 {/* <div style={{ padding: 20 }}>
                    <h1>Providers Loaded Successfully</h1>
                 </div> */}
                 <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
            </SearchProvider>
          </PreferencesProvider>
        </PlatformProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
