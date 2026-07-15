"use client";

import { useState } from "react";
import axios from "axios";
import { ShieldAlert, CheckCircle, ChevronRight, User as UserIcon } from "lucide-react";

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    tenure: 12,
    MonthlyCharges: 50.5,
    TotalCharges: 600.0,
    Contract: "Month-to-month",
    InternetService: "Fiber optic",
    TechSupport: "No",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tenure" || name === "MonthlyCharges" || name === "TotalCharges" ? Number(value) : value,
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:8000/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating prediction. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Individual Prediction</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Enter customer details to generate an instant churn risk score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-brand-500" />
            Customer Profile
          </h2>
          
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tenure (months)</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Charges ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="MonthlyCharges"
                  value={formData.MonthlyCharges}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Charges ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="TotalCharges"
                  value={formData.TotalCharges}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contract Type</label>
                <select
                  name="Contract"
                  value={formData.Contract}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
                >
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Internet Service</label>
                <select
                  name="InternetService"
                  value={formData.InternetService}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
                >
                  <option>DSL</option>
                  <option>Fiber optic</option>
                  <option>No</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tech Support</label>
                <select
                  name="TechSupport"
                  value={formData.TechSupport}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Generating Prediction..." : "Predict Churn Risk"}
                {!loading && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className={`glass-panel rounded-2xl p-6 h-full min-h-[300px] flex flex-col justify-center items-center text-center transition-all duration-500 ${result ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
            {result ? (
              <div className="animate-in zoom-in-95 duration-300">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg ${result.prediction === 1 ? 'bg-rose-500/20 text-rose-500 shadow-rose-500/20' : 'bg-emerald-500/20 text-emerald-500 shadow-emerald-500/20'}`}>
                  {result.prediction === 1 ? <ShieldAlert className="w-10 h-10" /> : <CheckCircle className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {result.risk_level}
                </h3>
                <div className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                  {(result.churn_probability * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto">
                  Probability that this customer will churn in the next billing cycle.
                </p>
                
                {result.prediction === 1 && (
                  <button className="mt-8 bg-rose-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-rose-600 transition-colors shadow-sm shadow-rose-500/30 text-sm">
                    Contact Customer
                  </button>
                )}
              </div>
            ) : (
              <div className="text-slate-400 dark:text-slate-600">
                <ShieldAlert className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="font-medium">Submit the form to generate a prediction</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
