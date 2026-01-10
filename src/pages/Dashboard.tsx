import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
