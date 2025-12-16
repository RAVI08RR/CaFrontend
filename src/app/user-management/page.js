'use client';

import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import UserLoginsChart from "@/components/UserLoginsChart";
import { Users, UserCheck, UserX, UserPlus, UserCog, Shield, Plus } from "lucide-react";
import Link from "next/link";

export default function UserManagementDashboard() {
  return (
    <>
      <Navbar />
      
      <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">User Management Overview</h1>
             <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Welcome back, Admin. Here's a summary of user activity.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
             <Link href="/manage-users" className="flex-1 sm:flex-initial">
               <button className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs md:text-sm font-medium text-blue-800 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <UserCog size={16} />
                  <span className="hidden sm:inline">Manage Users</span>
                  <span className="sm:hidden">Users</span>
               </button>
             </Link>
             <Link href="/manage-roles" className="flex-1 sm:flex-initial">
               <button className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs md:text-sm font-medium text-blue-800 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <Shield size={16} />
                  <span className="hidden sm:inline">Manage Roles</span>
                  <span className="sm:hidden">Roles</span>
               </button>
             </Link>
             <Link href="/add-user" className="flex-1 sm:flex-initial">
               <button className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-blue-900 dark:bg-blue-700 border border-transparent rounded-lg text-xs md:text-sm font-medium text-white hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors shadow-sm">
                  <Plus size={16} />
                  <span className="hidden sm:inline">Add User</span>
                  <span className="sm:hidden">Add</span>
               </button>
             </Link>
           </div>
        </div>

        {/* Section Heading */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key metrics</h2>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <MetricCard 
             title="Total Users" 
             value="17" 
             trend="up" 
             trendValue="12% this month" 
             icon={Users} 
             color="blue" 
           />
           <MetricCard 
             title="Active Users" 
             value="13" 
             trend="up" 
             trendValue="8.5% this month" 
             icon={UserCheck} 
             color="green" 
           />
           <Link href="/disabled-users">
             <MetricCard 
               title="Disabled Users" 
               value="04" 
               trend="down" 
               trendValue="2.1% this month" 
               icon={UserX} 
               color="red" 
             />
           </Link>
           <MetricCard 
             title="Pending Invites" 
             value="05" 
             trend={null}
             trendValue={null} 
             icon={UserPlus} 
             color="yellow" 
           />
        </div>

        {/* Chart Section */}
        <div className="h-[400px]">
           <UserLoginsChart />
        </div>

      </div>
    </>
  );
}
