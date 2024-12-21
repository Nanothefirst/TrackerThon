import React from 'react';
import { PieChart, BarChart2 } from 'lucide-react';
import { TimeStats } from '../types';

interface StatsProps {
  stats: TimeStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-indigo-600" />
          <h3 className="text-lg font-semibold">Category Breakdown</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(stats.categoryBreakdown).map(([category, time]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-600">{category}</span>
              <span className="font-semibold">
                {Math.round(time / 3600)}h {Math.round((time % 3600) / 60)}m
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="text-indigo-600" />
          <h3 className="text-lg font-semibold">Label Analysis</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(stats.labelBreakdown).map(([label, time]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-gray-600">{label}</span>
              <span className="font-semibold">
                {Math.round(time / 3600)}h {Math.round((time % 3600) / 60)}m
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}