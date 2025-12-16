'use client';

import { 
  ChevronDown, 
  Check, 
  Eye, 
  Minus,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const roles = [
  "Partner",
  "Sr. Manager",
  "Manager",
  "Team Lead",
  "Executive",
  "Client"
];

const modules = [
  { name: "Tasks", permissions: ["check", "check", "check", "eye", "eye", "minus"] },
  { name: "Clients", permissions: ["check", "check", "eye", "eye", "minus", "eye"] },
  { name: "Billing & Invoices", permissions: ["check", "eye", "minus", "minus", "minus", "eye"] },
  { name: "Documents", permissions: ["check", "check", "check", "eye", "eye", "eye"] },
  { name: "Reports", permissions: ["check", "check", "eye", "minus", "minus", "minus"] },
  { name: "User Management", permissions: ["check", "eye", "minus", "minus", "minus", "minus"] },
  { name: "System Settings", permissions: ["check", "minus", "minus", "minus", "minus", "minus"] },
];

const PermissionIcon = ({ type }) => {
  if (type === 'check') {
    return <Check size={20} className="text-green-500 mx-auto" strokeWidth={2.5} />;
  }
  if (type === 'eye') {
    return (
      <div className="flex justify-center">
         <Eye size={20} className="text-blue-500" />
      </div>
    );
  }
  return <Minus size={20} className="text-gray-300 mx-auto" />;
};

export default function ManageRolesPage() {
  return (
    <>
      <Navbar />
      
      <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Roles Permissions</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Create, edit, and manage user roles and permissions.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <Link href="/">
                <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Back
                </button>
             </Link>
             <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
                <FileText size={18} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
             </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
             
             {/* Filter Section */}
             <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[160px]">
                        Filter by Module <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[160px]">
                        Filter by Role <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>
             </div>

             {/* Table */}
             <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <th className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm w-1/4">Modules / Features</th>
                            {roles.map((role) => (
                                <th key={role} className="p-6 font-medium text-gray-500 dark:text-gray-400 text-sm text-center w-[12.5%]">
                                    {role}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {modules.map((module) => (
                            <tr key={module.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="p-6 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {module.name}
                                </td>
                                {module.permissions.map((perm, idx) => (
                                    <td key={idx} className="p-6 text-center">
                                        <PermissionIcon type={perm} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                 </table>
             </div>

        </div>
      </div>
    </>
  );
}
