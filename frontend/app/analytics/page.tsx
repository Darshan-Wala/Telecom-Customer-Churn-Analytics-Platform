"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

const customerDistData = [
  { name: "Month-to-month", value: 3875 },
  { name: "Two year", value: 1695 },
  { name: "One year", value: 1473 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];

const revenueRiskData = [
  { name: "High Risk", revenue: 3200000, fill: "#ef4444" },
  { name: "Medium Risk", revenue: 1500000, fill: "#f59e0b" },
  { name: "Safe", revenue: 8500000, fill: "#10b981" },
];

const featureImportance = [
  { name: "Contract", importance: 0.85 },
  { name: "Tenure", importance: 0.72 },
  { name: "Monthly Charges", importance: 0.64 },
  { name: "Tech Support", importance: 0.45 },
  { name: "Online Security", importance: 0.41 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Business Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Deep dive into your customer data and model insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Distribution by Contract */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Customer Distribution (Contract)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Risk */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Potential Revenue Loss</h2>
              <p className="text-3xl font-bold text-rose-500 mt-2">$3.2M</p>
              <p className="text-sm text-slate-500 mt-1">If all high-risk customers churn</p>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueRiskData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={100} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: any) => [`$${(Number(value)/1000000).toFixed(1)}M`, 'Revenue']}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {revenueRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">ML Model Feature Importance</h2>
          <p className="text-sm text-slate-500 mb-6">The top factors driving customer churn according to our Random Forest model.</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="importance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
