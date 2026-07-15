"use client";

import { useState } from "react";
import { Search, Filter, ShieldAlert, CheckCircle, ChevronRight, User as UserIcon, MoreHorizontal } from "lucide-react";

const mockCustomers = [
  { id: "7590-VHVEG", name: "Rahul Sharma", tenure: 1, revenue: "$29.85", risk: "Low", status: "Active" },
  { id: "5575-GNVDE", name: "Ankit Patel", tenure: 34, revenue: "$1889.50", risk: "Medium", status: "Active" },
  { id: "3668-QPYBK", name: "Sarah Jenkins", tenure: 2, revenue: "$108.15", risk: "High", status: "Critical" },
  { id: "7795-CFOCW", name: "David Chen", tenure: 45, revenue: "$1840.75", risk: "Low", status: "Active" },
  { id: "9237-HQITU", name: "Maria Garcia", tenure: 2, revenue: "$151.65", risk: "High", status: "Critical" },
  { id: "9305-CDSKC", name: "Emily Watson", tenure: 8, revenue: "$820.50", risk: "Medium", status: "At Risk" },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Explorer</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Search, filter, and analyze individual customer retention profiles.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tenure</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">LTV Revenue</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCustomers.map((customer, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{customer.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">{customer.tenure} months</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">{customer.revenue}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.risk === 'High' ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400' :
                      customer.risk === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400' :
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                    }`}>
                      {customer.risk}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center text-sm text-slate-500">
          <span>Showing {filteredCustomers.length} of {mockCustomers.length} customers</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-white dark:hover:bg-slate-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
