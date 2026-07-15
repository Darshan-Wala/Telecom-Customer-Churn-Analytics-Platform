"use client";

import { Users, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockRevenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 },
];

export default function DashboardHome() {
  const kpis = [
    { title: "Total Customers", value: "7,043", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Revenue", value: "$4.2M", change: "+8%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Churn Rate", value: "26.5%", change: "-2%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "High Risk", value: "1,869", change: "+5%", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back. Here is your telecom customer retention summary.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{kpi.title}</p>
                <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${kpi.change.startsWith('+') ? (kpi.title === 'Churn Rate' || kpi.title === 'High Risk' ? 'text-rose-500' : 'text-emerald-500') : (kpi.title === 'Churn Rate' || kpi.title === 'High Risk' ? 'text-emerald-500' : 'text-rose-500')}`}>
                {kpi.change}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Trend</h2>
            <select className="bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Customers List */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Priority Retention</h2>
          <div className="space-y-5">
            {[
              { name: "Rahul Sharma", risk: "95%", revenue: "$4,200", status: "Critical" },
              { name: "Sarah Jenkins", risk: "91%", revenue: "$3,800", status: "Critical" },
              { name: "Ankit Patel", risk: "88%", revenue: "$2,100", status: "High" },
              { name: "Maria Garcia", risk: "85%", revenue: "$5,400", status: "High" },
              { name: "David Chen", risk: "82%", revenue: "$1,950", status: "High" },
            ].map((customer, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{customer.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{customer.revenue} LTV</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rose-500">{customer.risk}</p>
                  <p className="text-xs text-rose-400/80">{customer.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 rounded-lg bg-brand-50 text-brand-600 font-medium hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20 transition-colors">
            View All High Risk
          </button>
        </div>
      </div>
    </div>
  );
}
