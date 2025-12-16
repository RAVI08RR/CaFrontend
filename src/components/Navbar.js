'use client';

import { Search, Bell, Settings, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/context/SidebarContext';

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggleSidebar, isMobile, isCollapsed } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10 flex items-center justify-between px-3 sm:px-4 md:px-8 transition-all duration-300">
      {/* Left Section - Hamburger + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>
        )}
        
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 dark:text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search Task" 
            className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
        <button className="hidden sm:flex bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium items-center gap-1.5 sm:gap-2 transition-colors">
            <span className="text-lg leading-none mb-0.5">+</span> 
            <span className="hidden lg:inline">Create New Task</span>
            <span className="lg:hidden">New</span>
        </button>
        
        {mounted && (
          <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
        </button>

        <button className="hidden md:block p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
             <Settings size={20} />
        </button>

        <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-600 transition-all">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
