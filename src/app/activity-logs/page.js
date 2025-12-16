'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { 
  Shield, 
  UserPlus, 
  UserX, 
  Key, 
  FileText, 
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

// Mock Data
const activityLogs = [
  {
    id: 1,
    timestamp: "2025-11-04 09:15:32",
    user: {
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      image: "https://i.pravatar.cc/150?u=Rohan+Mehta"
    },
    action: {
      type: "role_change",
      text: "Changed role to 'Manager' for Arjun Verma.",
      icon: Edit,
      color: "text-blue-500"
    },
    performedBy: {
      name: "Ananya Sharma",
      role: "Admin",
      image: "https://i.pravatar.cc/150?u=Ananya+Sharma"
    }
  },
  {
    id: 2,
    timestamp: "2025-11-03 17:45:10",
    user: {
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      image: "https://i.pravatar.cc/150?u=Vikram+Singh"
    },
    action: {
      type: "create_user",
      text: "Created a new user account.",
      icon: UserPlus,
      color: "text-green-500"
    },
    performedBy: {
        name: "Ananya Sharma",
        role: "Admin",
        image: "https://i.pravatar.cc/150?u=Ananya+Sharma"
    }
  },
  {
    id: 3,
    timestamp: "2025-11-03 11:20:05",
    user: {
      name: "Sneha Gupta",
      email: "sneha.gupta@example.com",
      image: "https://i.pravatar.cc/150?u=Sneha+Gupta"
    },
    action: {
      type: "disable_user",
      text: "Disabled user account due to inactivity.",
      icon: UserX,
      color: "text-red-500"
    },
    performedBy: {
        name: "System",
        role: "Automated Action",
        image: "https://ui-avatars.com/api/?name=System&background=e2e8f0&color=64748b"
    }
  },
  {
    id: 4,
    timestamp: "2025-11-02 14:00:18",
    user: {
      name: "Priya Singh",
      email: "priya.singh@example.com",
      image: "https://i.pravatar.cc/150?u=Priya+Singh"
    },
    action: {
      type: "reset_password",
      text: "Successfully reset password.",
      icon: Key,
      color: "text-yellow-500"
    },
    performedBy: {
        name: "Priya Singh",
        role: "Manager",
        image: "https://i.pravatar.cc/150?u=Priya+Singh"
    }
  },
  {
    id: 5,
    timestamp: "2025-11-01 10:05:55",
    user: {
      name: "Arjun Verma",
      email: "arjun.verma@example.com",
      image: "https://i.pravatar.cc/150?u=Arjun+Verma"
    },
    action: {
      type: "export_report",
      text: "Exported client list report.",
      icon: FileText,
      color: "text-gray-500"
    },
    performedBy: {
        name: "Arjun Verma",
        role: "Team Lead",
        image: "https://i.pravatar.cc/150?u=Arjun+Verma"
    }
  }
];

// Generate more mock data for pagination
const extendedActivityLogs = [
  ...activityLogs,
  ...Array.from({ length: 25 }).map((_, i) => ({
      id: activityLogs.length + i + 1,
      timestamp: "2025-10-30 14:22:10",
      user: {
          name: i % 2 === 0 ? "Rohan Mehta" : "Vikram Singh",
          email: i % 2 === 0 ? "rohan.mehta@example.com" : "vikram.singh@example.com",
          image: i % 2 === 0 ? "https://i.pravatar.cc/150?u=Rohan+Mehta" : "https://i.pravatar.cc/150?u=Vikram+Singh"
      },
      action: {
          type: "login",
          text: "User logged in successfully.",
          icon: Key,
          color: "text-green-500"
      },
      performedBy: {
          name: i % 2 === 0 ? "Rohan Mehta" : "Vikram Singh",
          role: "User",
          image: i % 2 === 0 ? "https://i.pravatar.cc/150?u=Rohan+Mehta" : "https://i.pravatar.cc/150?u=Vikram+Singh"
      }
  }))
];

export default function ActivityLogsPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const totalItems = extendedActivityLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const currentLogs = extendedActivityLogs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
      <Navbar />

      <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>User Management</span>
            <span>&gt;</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Activity Logs</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Activity Logs</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Track user and role-related events for auditing.</p>
          </div>
          <button className="w-full md:w-auto px-4 md:px-6 py-2.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
               <Shield size={18} />
               <span className="hidden sm:inline">Manage Permissions</span>
               <span className="sm:hidden">Permissions</span>
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
             
             {/* Table */}
             <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Timestamp</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[25%]">User</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[35%]">Action</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[25%]">Performed By</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {currentLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="p-6 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                    {log.timestamp}
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <img src={log.user.image} alt={log.user.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{log.user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{log.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <log.action.icon size={16} className={log.action.color} />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{log.action.text}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <img src={log.performedBy.image} alt={log.performedBy.name} className={clsx("w-10 h-10 rounded-full object-cover", log.performedBy.name === 'System' ? "p-1.5" : "")} />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{log.performedBy.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{log.performedBy.role}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
             </div>

             {/* Pagination */}
             <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-900">
                 <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                     Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} <span className="text-gray-300 mx-1">|</span> {totalItems}
                 </div>
                 <div className="flex items-center gap-2">
                     <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         <span className="hidden sm:inline">Previous</span>
                         <span className="sm:hidden">Prev</span>
                     </button>
                     
                     {/* Simplified Pagination Numbers */}
                     <div className="hidden sm:flex items-center gap-2">
                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                           let pageNum = i + 1;
                           // Logic to slide the window could be added here, but for now simple 1-5 or based on totalPages
                           if (totalPages > 5 && currentPage > 3) {
                               pageNum = currentPage - 2 + i;
                               if (pageNum > totalPages) return null;
                           }

                           return (
                              <button 
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={clsx(
                                      "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                      currentPage === pageNum 
                                          ? "bg-blue-900 text-white" 
                                          : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                                  )}
                              >
                                  {pageNum}
                              </button>
                           )
                       })}
                     </div>

                     <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         Next
                     </button>
                 </div>
             </div>

        </div>
      </div>
    </div>
  );
}
