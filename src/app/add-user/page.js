'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import FileUpload from '@/components/FileUpload';

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    role: '',
    permission: '',
    branch: '',
    workingHoursStart: '',
    workingHoursEnd: '',
    seniorManager: '',
    teamLead: '',
    partner1: false,
    partner2: false,
    deptServices: {
      accounting: false,
      incomeTax: false,
      gst: false,
      roc: false,
      businessSetup: false,
      litigation: false,
      rdMarketing: false,
    },
  });

  const handleCheckboxChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="px-4 md:px-8 pb-12 w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Add New User – Onboarding</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Add New User in User Management</p>
          </div>
          
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-2 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
              Back
            </button>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 md:p-8 space-y-8">
          
          {/* User Details */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                label="Email Address" 
                required 
                type="email"
                placeholder="john.doe@venico.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <FormInput 
                label="Full Name" 
                required 
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          {/* Role & Permission */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Role & Permission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <FormSelect 
                label="Role" 
                options={['Manager', 'Senior Manager', 'Team Lead', 'Associate']}
                placeholder="Select Role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
              <div className="flex gap-3">
                <FormSelect 
                  label="Permission" 
                  options={['View Permissions - Global', 'Edit Permissions', 'Admin']}
                  placeholder="Select Permission"
                  className="flex-1"
                  value={formData.permission}
                  onChange={(e) => setFormData({...formData, permission: e.target.value})}
                />
                <button className="mt-7 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Customize Permissions
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect 
                label="Branch" 
                options={['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore']}
                placeholder="Select Branch"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              />
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Working Hours</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="08 Hr" 
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm"
                    value={formData.workingHoursStart}
                    onChange={(e) => setFormData({...formData, workingHoursStart: e.target.value})}
                  />
                  <span className="flex items-center text-gray-400 dark:text-gray-500">:</span>
                  <input 
                    type="text" 
                    placeholder="00 Min" 
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm"
                    value={formData.workingHoursEnd}
                    onChange={(e) => setFormData({...formData, workingHoursEnd: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Senior Manager & Team Lead */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect 
              label="Senior Manager" 
              options={['Select Senior Manager', 'John Smith', 'Jane Doe']}
              placeholder="Select Senior Manager"
              value={formData.seniorManager}
              onChange={(e) => setFormData({...formData, seniorManager: e.target.value})}
            />
            <FormSelect 
              label="Team Lead" 
              options={['Select Team Lead', 'Alice Johnson', 'Bob Williams']}
              placeholder="Select Team Lead"
              value={formData.teamLead}
              onChange={(e) => setFormData({...formData, teamLead: e.target.value})}
            />
          </div>

          {/* Main head */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Main head</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.partner1}
                    onChange={(e) => handleCheckboxChange('partner1', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Partner 1</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.partner2}
                    onChange={(e) => handleCheckboxChange('partner2', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Partner 2</span>
                </label>
              </div>
            </div>
          </div>

          {/* Dept-wise Services */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Dept-wise Services</h2>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Select All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.accounting}
                    onChange={(e) => handleCheckboxChange('deptServices.accounting', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 1: Accounting, Audit, Compliance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.incomeTax}
                    onChange={(e) => handleCheckboxChange('deptServices.incomeTax', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 2: Income Tax</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.gst}
                    onChange={(e) => handleCheckboxChange('deptServices.gst', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 3: GST</span>
                </label>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.roc}
                    onChange={(e) => handleCheckboxChange('deptServices.roc', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 4: ROC (registrar of company)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.businessSetup}
                    onChange={(e) => handleCheckboxChange('deptServices.businessSetup', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 5: Business Setup Services</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.litigation}
                    onChange={(e) => handleCheckboxChange('deptServices.litigation', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 6: Litigation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                    checked={formData.deptServices.rdMarketing}
                    onChange={(e) => handleCheckboxChange('deptServices.rdMarketing', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dept 7: R & D & Marketing</span>
                </label>
              </div>
            </div>
          </div>

          {/* Upload KYC Document */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Upload KYC Document</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <FileUpload label="PAN" sublabel="Supported file type" />
              <FileUpload label="Aadhaar" sublabel="Supported file type" />
              <FileUpload label="Passport" sublabel="Supported file type" />
              <FileUpload label="Voter ID" sublabel="Supported file type" />
              <FileUpload label="Driving License" sublabel="Supported file type" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
              Add User
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
