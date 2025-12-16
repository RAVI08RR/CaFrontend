'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Search, Trash2, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data
const initialDisabledUsers = [
  {
    id: 1,
    name: "Anita Desai",
    email: "anita.desai@example.com",
    role: "Executive",
    status: "Disabled",
    deactivationDate: "2025-10-15",
    branch: "Resigned",
    image: "https://i.pravatar.cc/150?u=Anita+Desai"
  },
  {
    id: 2,
    name: "Raj Patel",
    email: "raj.patel@example.com",
    role: "Manager",
    status: "Suspended",
    deactivationDate: "2025-09-22",
    branch: "Policy Violation",
    image: "https://i.pravatar.cc/150?u=Raj+Patel"
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    role: "Sr. Manager",
    status: "Disabled",
    deactivationDate: "2025-08-01",
    branch: "Contract Ended",
    image: "https://i.pravatar.cc/150?u=Vikram+Singh"
  }
];

// Generate more data for pagination
const extendedDisabledUsers = [
    ...initialDisabledUsers,
    ...Array.from({ length: 12 }).map((_, i) => ({
        id: initialDisabledUsers.length + i + 1,
        name: i % 2 === 0 ? "Priya Sharma" : "Amit Kumar",
        email: i % 2 === 0 ? "priya.sharma@example.com" : "amit.kumar@example.com",
        role: i % 2 === 0 ? "Developer" : "Designer",
        status: i % 3 === 0 ? "Suspended" : "Disabled",
        deactivationDate: "2025-07-15",
        branch: "Redundancy",
        image: i % 2 === 0 ? "https://i.pravatar.cc/150?u=Priya+Sharma" : "https://i.pravatar.cc/150?u=Amit+Kumar"
    }))
];

export default function DisabledUsersPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState(""); // Add search state
  const itemsPerPage = 5; 
  
  // Filter users based on search query
  const filteredUsers = React.useMemo(() => {
    if (!searchQuery) return extendedDisabledUsers;
    const lowerQuery = searchQuery.toLowerCase();
    return extendedDisabledUsers.filter(user => 
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.role.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const currentUsers = filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  // Reset to first page when search changes
  React.useEffect(() => {
      setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
      <Navbar />

      <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Disabled Users</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Review, reactivate, or permanently delete disabled user accounts.</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-t-xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
             {/* Search */}
             <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, email or role..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                />
             </div>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-gray-900 rounded-b-xl border-x border-b border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
             
             {/* Table */}
             <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[25%]">Name</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Role</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Role</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Deactivation Date</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Branch</th>
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-[15%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-sm text-gray-500 dark:text-gray-400">
                                    {user.role}
                                </td>
                                <td className="p-6">
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold",
                                        user.status === 'Disabled' 
                                            ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                    )}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-6 text-sm text-gray-500 dark:text-gray-400">
                                    {user.deactivationDate}
                                </td>
                                <td className="p-6 text-sm text-gray-500 dark:text-gray-400">
                                    {user.branch}
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <button 
                                            className="w-8 h-8 flex items-center justify-center rounded bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 transition-colors"
                                            title="Reactivate"
                                        >
                                            <UserCheck size={16} strokeWidth={2.5} />
                                        </button>
                                        <button 
                                            className="w-8 h-8 flex items-center justify-center rounded bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} strokeWidth={2.5} />
                                        </button>
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
                     Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
                 </div>
                 <div className="flex items-center gap-2">
                     <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         <span className="hidden sm:inline">Previous</span>
                         <span className="sm:hidden">Prev</span>
                     </button>
                     
                     {/* Dynamic Page Numbers */}
                     <div className="hidden sm:flex items-center gap-2">
                       {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button 
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={clsx(
                                  "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                  currentPage === pageNum 
                                      ? "bg-blue-600 text-white" 
                                      : "text-gray-500 border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                              )}
                          >
                              {pageNum}
                          </button>
                       ))}
                     </div>

                     <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
