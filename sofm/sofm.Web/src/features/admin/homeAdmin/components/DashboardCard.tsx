import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  isIncrease: boolean;
}

export const DashboardCard = ({ title, value, change, icon, isIncrease }: DashboardCardProps) => (
  <article className="p-6 bg-[#2a2a2a] rounded-2xl border border-[#40403d] shadow-xl hover:border-[#6b6b66] transition-all">
    <div className="flex justify-between items-start">
      <div className="p-3 bg-[#3d3d3a] rounded-xl text-[#e9e2d4]">{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${isIncrease ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
        {change}
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-sm text-gray-400 font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1 tracking-tight">{value}</p>
    </div>
  </article>
);