'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CheckSquare, 
  CreditCard, 
  User, 
  Folder, 
  MessageSquare, 
  BarChart,
  UserCog,
  Plus,
  Shield,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Menu,
  Settings,
  HelpCircle
} from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

const Sidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Quote Requests', icon: FileText, href: '#', badge: 4 },
    { name: 'Engagements', icon: Briefcase, href: '#', badge: 12 },
    { name: 'Tasks', icon: CheckSquare, href: '#' },
    { name: 'Billing', icon: CreditCard, href: '#', badge: 12, badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    { name: 'Clients', icon: User, href: '#' },
    { name: 'Documents', icon: Folder, href: '#' },
    { name: 'Communication', icon: MessageSquare, href: '#' },
    { name: 'Reports', icon: BarChart, href: '#' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside 
        className={clsx(
          "bg-white dark:bg-gray-900 h-screen border-r border-gray-100 dark:border-gray-800 fixed left-0 top-0 flex flex-col overflow-y-auto font-sans transition-all duration-300 ease-in-out",
          // Mobile: overlay with transform, Desktop: normal positioning
          isMobile ? "z-40 w-64" : "z-20",
          isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0",
          !isMobile && (isCollapsed ? "w-20" : "w-64")
        )}
      >
      {/* Logo & Toggle */}
      <div className={clsx("p-6 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
             <span className="text-[19px] font-bold text-gray-900 dark:text-gray-100 truncate flex g-[10px] items-center gap-1.5">
              <img src="/prospacelogo.svg" alt="User Profile" className="w-8 h-8 rounded-full" />
              
              ProSpere Labs</span>
        )}
        <button 
            onClick={toggleSidebar} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
            <Menu size={20} />
        </button>
      </div>

      {/* Organization Card */}
      <div className="px-4 mb-6">
        <div className={clsx(
            "bg-gray-50 dark:bg-gray-800 rounded-xl p-2 flex items-center relative group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer",
            isCollapsed ? "justify-center" : "gap-3 p-4"
        )}>
           <div className="w-8 h-8 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
             <div className="w-5 h-5 border-2 border-current rounded-full grid place-items-center">
                <div className="w-0.5 h-full bg-current rotate-45"></div>
                <div className="w-0.5 h-full bg-current -rotate-45"></div>
             </div>
           </div>
           {!isCollapsed && (
               <>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">Chen & Assoc.</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</p>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
               </>
           )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className={clsx(
              "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              isCollapsed ? "justify-center" : "justify-between",
              item.name === 'User Management'
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            )}
            title={isCollapsed ? item.name : undefined}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className={clsx("transition-colors flex-shrink-0", item.name === 'User Management' ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300")} />
              {!isCollapsed && <span>{item.name}</span>}
            </div>
            {!isCollapsed && item.badge && (
              <span className={clsx(
                "px-2 py-0.5 rounded-full text-xs font-semibold",
                item.badgeColor ? item.badgeColor : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
              )}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* User Management Section */}
        <div className="mt-2">
            <div 
              className={clsx(
                "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isCollapsed ? "justify-center" : "justify-between",
                (pathname === '/user-management' || (isUserManagementOpen && !isCollapsed))
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              )}
              title="User Management"
            >
                <Link 
                  href="/user-management" 
                  className="flex items-center gap-3 flex-1"
                  onClick={() => !isCollapsed && setIsUserManagementOpen(true)}
                >
                    <UserCog size={18} className={clsx("transition-colors flex-shrink-0", (pathname === '/user-management' || (isUserManagementOpen && !isCollapsed)) ? "text-blue-700 dark:text-blue-400" : "text-gray-400 dark:text-gray-500")} />
                    {!isCollapsed && <span>User Management</span>}
                </Link>
                {!isCollapsed && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserManagementOpen(!isUserManagementOpen);
                    }}
                    className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
                  >
                    {isUserManagementOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                )}
            </div>

            {isUserManagementOpen && !isCollapsed && (
                <div className="mt-1 space-y-1">
                    <Link href="/manage-users" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/manage-users' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Manage Users</Link>
                    <Link href="/add-user" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/add-user' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Add New User</Link>
                    <Link href="/manage-roles" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/manage-roles' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Manage Roles</Link>
                    <Link href="/organizational-hierarchy" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/organizational-hierarchy' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Organisational Hierarchy</Link>
                    <Link href="/activity-logs" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/activity-logs' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Activity Logs</Link>
                    <Link href="/disabled-users" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/disabled-users' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Disabled Users</Link>
                    <Link href="#" className={clsx("block pl-10 pr-3 py-2 text-sm font-medium transition-colors", pathname === '/add-new-role' ? "text-blue-700 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200")}>Add New Role</Link>
                </div>
            )}
        </div>

        <Link 
            href="/settings"
            className={clsx(
              "flex items-center px-3 py-2.5 mt-1 rounded-lg text-sm font-medium transition-all group",
              isCollapsed ? "justify-center" : "justify-between",
              "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            )}
            title="Settings"
        >
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </div>
        </Link>
        <div className="mt-auto">
             <Link 
                href="/help"
                className={clsx(
                "flex items-center px-3 py-2.5 mt-1 rounded-lg text-sm font-medium transition-all group",
                isCollapsed ? "justify-center" : "justify-between",
                "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                )}
                title="Help & Support"
            >
                <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                {!isCollapsed && <span>Help & Support</span>}
                </div>
            </Link>
        </div>

      </nav>
      
      {/* Bottom padding */}
      <div className="h-6"></div>
    </aside>
    </>
  );
};

export default Sidebar;
