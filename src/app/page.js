'use client';

import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import TaskStatusChart from "@/components/TaskStatusChart";
import RevenueChart from "@/components/RevenueChart";
import { 
  FileText, 
  Plus, 
  FilePlus, 
  Briefcase, 
  Clock, 
  CreditCard, 
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ClipboardList,
  UserPlus as UserPlusIcon
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Dashboard</h1>
             <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Welcome back, Sarah! Here's what's happening at your firm.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
             <button className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                <Download size={18} />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
             </button>
             <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-blue-900 dark:bg-blue-700 border border-transparent rounded-lg text-xs md:text-sm font-medium text-white hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors shadow-sm">
                <Plus size={18} />
                <span className="hidden sm:inline">Create Quote</span>
                <span className="sm:hidden">Create</span>
             </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <MetricCard 
             title="Quote Requests" 
             value="24" 
             trend="up" 
             trendValue="12% vs last month" 
             icon={FilePlus} 
             color="orange" 
           />
           <MetricCard 
             title="Work in Progress" 
             value="18" 
             trend="up" 
             trendValue="8% vs last month" 
             icon={Briefcase} 
             color="purple" 
           />
           <MetricCard 
             title="Pending Review" 
             value="7" 
             trend="down" 
             trendValue="3% vs last month" 
             icon={Clock} 
             color="yellow" 
           />
           <MetricCard 
             title="Ready for Billing" 
             value="12" 
             trend="up" 
             trendValue="25% vs last month" 
             icon={CreditCard} 
             color="green" 
           />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           {/* Task Status Overview */}
           <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Task Status Overview</h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full flex items-center gap-1">
                      This Month
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
              </div>
              <div className="h-[300px]">
                  <TaskStatusChart />
              </div>
           </div>

           {/* Monthly Revenue */}
           <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Monthly Revenue</h3>
                  <button className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full flex items-center gap-1">
                      Last 6 Months
                      <MoreHorizontal size={14} />
                    </button>
              </div>
              <div className="h-[300px] relative">
                  {/* Y-Axis Label */}
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium">
                      Revenue (₹ in Lakhs)
                  </div>
                  <div className="ml-6 h-full">
                      <RevenueChart />
                  </div>
              </div>
           </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Ready to Bill */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Ready to Bill</h3>
                    <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">5 engagements</span>
                </div>
                <div className="space-y-4">
                    {[
                        { name: "ABC Corporation", sub: "Tax Compliance", amount: "$12,500", status: "Generate" },
                        { name: "XYZ Ltd", sub: "Audit Services", amount: "$28,900", status: "Generate" },
                        { name: "DEF Inc", sub: "Financial Consulting", amount: "$8,750", status: "Generate" },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.sub}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.amount}</p>
                                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">{item.status}</button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button className="w-full mt-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    Generate All Invoices
                 </button>
            </div>

            {/* Integration Status */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Integration Status</h3>
                
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">Z</div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Zoho Books</p>
                                <p className="text-xs text-gray-500">Connected</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">T</div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Tally ERP</p>
                                <p className="text-xs text-gray-500">Not Connected</p>
                            </div>
                        </div>
                        <button className="text-xs font-medium text-blue-600 hover:underline">Connect</button>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        "Auto-sync invoices",
                        "Update payment status",
                        "Send payment reminders"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                             <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white">
                                <CheckCircle size={10} strokeWidth={4} />
                             </div>
                             <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

             {/* Payment Reminders */}
             <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Payment Reminders</h3>
                    <button className="text-xs font-medium text-blue-600 hover:underline">Send All</button>
                </div>
                <div className="space-y-4">
                    {[
                        { name: "GHI Corp", days: "90+ days overdue", amount: "$15,200", status: "Send Reminder" },
                        { name: "JKL Enterprises", days: "60 days overdue", amount: "$7,950", status: "Send Reminder" },
                        { name: "MNO Solutions", days: "30 days overdue", amount: "$4,300", status: "Send Reminder" },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-xs text-red-500">{item.days}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.amount}</p>
                                <button className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded hover:bg-red-100 transition-colors">{item.status}</button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button className="w-full mt-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    Bulk Reminder Settings
                 </button>
            </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Activities</h3>
                    <button className="text-sm font-medium text-blue-600 hover:underline">View All</button>
                </div>
                
                <div className="relative pl-4 border-l border-gray-200 dark:border-gray-700 space-y-8">
                    {[
                        { title: "Tax Return completed for ABC Corp", sub: "2 hours ago by John Smith", icon: CheckCircle, bg: "bg-gray-900 text-white" },
                        { title: "New quote request from XYZ Ltd", sub: "4 hours ago", icon: FileText, bg: "bg-gray-900 text-white" },
                        { title: "Audit review pending for DEF Inc", sub: "6 hours ago", icon: Clock, bg: "bg-gray-900 text-white" },
                        { title: "Invoice sent to GHI Corp - $5,200", sub: "Yesterday", icon: CreditCard, bg: "bg-gray-900 text-white" },
                    ].map((item, i) => (
                        <div key={i} className="relative pl-6">
                            <div className={clsx("absolute -left-[25px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900", item.bg)}>
                                <item.icon size={14} />
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: "New Engagement", sub: "Start a new client project", icon: Briefcase, color: "text-blue-500 bg-blue-50" },
                        { title: "Create Quote", sub: "Generate client proposal", icon: FilePlus, color: "text-green-500 bg-green-50" },
                        { title: "Add Client", sub: "Register new client", icon: UserPlusIcon, color: "text-blue-500 bg-blue-50" },
                        { title: "Assign Task", sub: "Delegate work to team", icon: ClipboardList, color: "text-orange-500 bg-orange-50" },
                    ].map((action, i) => (
                        <button key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-left">
                            <div className="flex gap-4">
                                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", action.color)}>
                                    <action.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{action.title}</p>
                                    <p className="text-xs text-gray-500">{action.sub}</p>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </button>
                    ))}
                 </div>
            </div>

        </div>

      </div>
    </>
  );
}
