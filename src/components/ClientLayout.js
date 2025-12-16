'use client';

import Sidebar from '@/components/Sidebar';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import clsx from 'clsx';

function LayoutContent({ children }) {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main 
        className={clsx(
          "flex-1 min-h-screen pt-16 transition-all duration-300 ease-in-out",
          // On mobile, no margin (sidebar overlays). On desktop, margin based on collapsed state
          isMobile ? "ml-0" : (isCollapsed ? "ml-20" : "ml-64")
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default function ClientLayout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
