'use client';

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Edit2,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// Mock Data
const initialUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "Partner", 
    workingHours: "09:00 - 17:00", 
    branch: "All", 
    isActive: true, 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    role: "Sr. Manager", 
    workingHours: "10:00 - 18:00", 
    branch: "London", 
    isActive: true, 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike.j@example.com", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    role: "Manager", 
    workingHours: "09:30 - 17:30", 
    branch: "New York", 
    isActive: true, 
    status: "Pending" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    email: "emily.d@example.com", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    role: "Executive", 
    workingHours: "09:00 - 17:00", 
    branch: "Tokyo", 
    isActive: false, 
    status: "Inactive" 
  },
  { id: 5, name: "Robert Wilson", email: "robert.w@example.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert", role: "Associate", workingHours: "09:00 - 17:00", branch: "Paris", isActive: true, status: "Active" },
  { id: 6, name: "Sarah Brown", email: "sarah.b@example.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", role: "Manager", workingHours: "08:00 - 16:00", branch: "Berlin", isActive: true, status: "Active" },
  { id: 7, name: "David Miller", email: "david.m@example.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", role: "Sr. Manager", workingHours: "09:00 - 17:00", branch: "London", isActive: false, status: "Inactive" },
  { id: 8, name: "Emma Wilson", email: "emma.w@example.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", role: "Associate", workingHours: "10:00 - 18:00", branch: "Paris", isActive: true, status: "Active" },
];

const RoleBadge = ({ role }) => {
  const styles = {
    'Partner': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Sr. Manager': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'Manager': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Executive': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    'Associate': 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-400',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role] || styles['Associate']}`}>
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Inactive': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

const ToggleSwitch = ({ active, onClick }) => (
  <div 
    onClick={onClick}
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

export default function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          isActive: !user.isActive,
          status: !user.isActive ? 'Active' : 'Inactive'
        };
      }
      return user;
    }));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Users List</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Manage all users, their roles, and permissions.</p>
          </div>
          <Link href="/add-user">
              <button className="w-full md:w-auto bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md">
                  <Plus size={18} />
                  Add User
              </button>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          
          {/* Filter Section */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="relative w-full md:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                          type="text" 
                          placeholder="Search users..." 
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>

                  {/* Dropdowns */}
                  <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          All Roles <ChevronDown size={14} />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          All Branches <ChevronDown size={14} />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          All Statuses <ChevronDown size={14} />
                      </button>
                  </div>
              </div>

              {/* Active Filters Pills (Example) */}
              <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                      Role: Manager <button className="hover:text-blue-900 dark:hover:text-blue-200">×</button>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      Status: Active <button className="hover:text-gray-900 dark:hover:text-white">×</button>
                  </span>
              </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          <th className="p-5 w-4 font-medium">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          </th>
                          <th className="p-5 font-medium">S.No.</th>
                          <th className="p-5 font-medium">Name</th>
                          <th className="p-5 font-medium">Role</th>
                          <th className="p-5 font-medium">Working Hours</th>
                          <th className="p-5 font-medium">Branch</th>
                          <th className="p-5 font-medium">Active/Inactive</th>
                          <th className="p-5 font-medium">Status</th>
                          <th className="p-5 font-medium text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {currentUsers.map((user, index) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                              <td className="p-5">
                                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              </td>
                              <td className="p-5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                  {startIndex + index + 1}.
                              </td>
                              <td className="p-5">
                                  <div className="flex items-center gap-3">
                                      <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full bg-gray-100" />
                                      <div>
                                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-5">
                                  <RoleBadge role={user.role} />
                              </td>
                              <td className="p-5 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                  {user.workingHours}
                              </td>
                              <td className="p-5 text-sm text-gray-500 dark:text-gray-400">
                                  {user.branch}
                              </td>
                              <td className="p-5">
                                  <ToggleSwitch 
                                    active={user.isActive} 
                                    onClick={() => toggleUserStatus(user.id)}
                                  />
                              </td>
                              <td className="p-5">
                                  <StatusBadge status={user.status} />
                              </td>
                              <td className="p-5 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Link href={`/add-user?id=${user.id}`}>
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                      </Link>
                                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
                </span>
                <div className="flex items-center gap-1">
                    <button 
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                    </button>
                    
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                            currentPage === page 
                              ? 'bg-blue-900 text-white' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                          }`}
                        >
                            {page}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
