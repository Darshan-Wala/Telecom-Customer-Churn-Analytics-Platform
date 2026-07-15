"use client";

import { Moon, Sun, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Configure your dashboard preferences.</p>
      </div>

      {/* API Configuration */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">API Configuration</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Backend API URL</label>
            <input
              type="text"
              defaultValue="http://localhost:8000"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Appearance</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Light", icon: Sun },
            { name: "Dark", icon: Moon },
            { name: "System", icon: Monitor },
          ].map((theme) => (
            <button
              key={theme.name}
              className="glass-panel rounded-xl p-4 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition-all border border-slate-200 dark:border-slate-700"
            >
              <theme.icon className="w-6 h-6 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">About</h2>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p><span className="font-medium text-slate-900 dark:text-white">ChurnIQ</span> — Customer Retention Analytics Platform</p>
          <p>Version 1.0.0</p>
          <p>Built with Next.js, FastAPI, PySpark &amp; Scikit-learn</p>
        </div>
      </div>
    </div>
  );
}
