'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { FileText, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data
const hierarchyData = {
  name: "James Anderson",
  role: "Partner",
  image: "https://i.pravatar.cc/150?u=James+Anderson",
  children: [
    {
      name: "Olivia Martinez",
      role: "Sr. Manager",
      image: "https://i.pravatar.cc/150?u=Olivia+Martinez",
      children: [
        {
          name: "Ethan Williams",
          role: "Manager",
          image: "https://i.pravatar.cc/150?u=Ethan+Williams",
          children: [
             {
               name: "Ava Davis",
               role: "Team Lead",
               image: "https://i.pravatar.cc/150?u=Ava+Davis",
               children: [
                  { name: "Noah Miller", role: "Executive", image: "https://i.pravatar.cc/150?u=Noah+Miller" },
                  { name: "Lucas Wilson", role: "Executive", image: "https://i.pravatar.cc/150?u=Lucas+Wilson" }
               ]
             }
          ]
        },
        {
          name: "Sophia Brown",
          role: "Manager",
          image: "https://i.pravatar.cc/150?u=Sophia+Brown",
          children: [
             { name: "Lucas Wilson", role: "Executive", image: "https://i.pravatar.cc/150?u=Lucas+Wilson_2" }
          ]
        }
      ]
    },
    {
        name: "Liam Johnson",
        role: "Sr. Manager",
        image: "https://i.pravatar.cc/150?u=Liam+Johnson",
        children: [
            {
               name: "Ava Davis",
               role: "Team Lead",
               image: "https://i.pravatar.cc/150?u=Ava+Davis_2",
               children: [
                   { name: "Noah Miller", role: "Executive", image: "https://i.pravatar.cc/150?u=Noah+Miller_2" },
                   { name: "Lucas Wilson", role: "Executive", image: "https://i.pravatar.cc/150?u=Lucas+Wilson_3" }
                ]
            }
        ]
    }
  ]
};

const TreeNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-4 w-48 flex flex-col items-center relative z-10 transition-transform hover:scale-105",
            node.role === 'Partner' ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900 bg-blue-50/10" : "border-gray-200 dark:border-gray-700"
      )}>
        <img 
            src={node.image} 
            alt={node.name} 
            className="w-12 h-12 rounded-full object-cover mb-3 bg-gray-200 border border-gray-100 dark:border-gray-700"
        />
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-center">{node.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{node.role}</p>
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center">
            {/* Vertical Line from parent to children horizontal bar */}
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="flex items-start flex-nowrap gap-4">
               {node.children.map((child, index) => (
                 <div key={index} className="flex flex-col items-center relative px-6">
                    {/* Horizontal Line logic */}
                    {/* If multiple children, we need a horizontal bar connecting them */}
                    {node.children.length > 1 && (
                        <>
                            {/* Left Half Line (Connecting from center to left) */}
                            {index > 0 && (
                                <div className="absolute top-0 left-0 w-[50%] h-px bg-gray-300 dark:bg-gray-600 -translate-y-px"></div>
                            )}
                             {/* Right Half Line (Connecting from center to right) */}
                            {index < node.children.length - 1 && (
                                <div className="absolute top-0 right-0 w-[50%] h-px bg-gray-300 dark:bg-gray-600 -translate-y-px"></div>
                            )}
                        </>
                    )}
                    
                    {/* Vertical Line to child */}
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

                    <TreeNode node={child} />
                 </div>
               ))}
            </div>
        </div>
      )}
    </div>
  );
};

const RecursiveTree = React.forwardRef(({ data }, ref) => {
    return (
        <div ref={ref} className="inline-flex justify-center p-8">
            <TreeNode node={data} />
        </div>
    );
});
RecursiveTree.displayName = 'RecursiveTree';

export default function OrganizationalHierarchyPage() {
    const [zoom, setZoom] = useState(1);
    const containerRef = React.useRef(null);
    const treeRef = React.useRef(null);

    React.useEffect(() => {
        const calculateZoom = () => {
            if (containerRef.current && treeRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const treeWidth = treeRef.current.scrollWidth;
                const treeHeight = treeRef.current.scrollHeight;

                const widthScale = (containerWidth - 48) / treeWidth; // 48px padding
                // const heightScale = (containerHeight - 48) / treeHeight; 
                
                // Prioritize width fit, but usually we just want to see the whole width. 
                // Math.min(1, ...) prevents zooming in if it's smaller than container
                const newZoom = Math.min(1, widthScale);
                
                setZoom(newZoom);
            }
        };

        // Initial calculation
        calculateZoom();

        // Recalculate on resize
        window.addEventListener('resize', calculateZoom);
        return () => window.removeEventListener('resize', calculateZoom);
    }, []);
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
        <Navbar />
  
        <div className="px-4 md:px-8 pb-12 w-full max-w-[1600px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Organizational Hierarchy</h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Visualize your team's structure and reporting lines.</p>
            </div>
            <button className="w-full md:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
                 <FileText size={18} />
                 <span className="hidden sm:inline">Export CSV</span>
                 <span className="sm:hidden">Export</span>
            </button>
          </div>
  
          {/* Main Card */}
          <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-[600px] md:min-h-[800px] flex flex-col w-full max-w-full">
               
               {/* Controls Bar */}
               <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                   {/* Breadcrumbs */}
                   <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Company</span>
                      <span>&gt;</span>
                      <span>Executive Team</span>
                      <span>&gt;</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Management</span>
                   </div>
  
                   {/* Zoom Controls */}
                   <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                        <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-xs text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                            <ZoomIn size={16} />
                        </button>
                        <button onClick={() => setZoom(1)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                            <Maximize size={16} />
                        </button>
                   </div>
               </div>
  
               {/* Chart Area */}
               <div ref={containerRef} className="flex-1 overflow-hidden bg-white dark:bg-gray-900 relative flex items-center justify-center">
                   <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.3s ease-out' }}>
                        <RecursiveTree ref={treeRef} data={hierarchyData} />
                   </div>
               </div>
          </div>
  
        </div>
      </div>
    );
  }
