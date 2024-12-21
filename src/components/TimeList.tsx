import React from 'react';
import { Clock, Tag } from 'lucide-react';
import { TimeEntry } from '../types';

interface TimeListProps {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
}

export function TimeList({ entries, onDelete }: TimeListProps) {
  const formatDuration = (start: Date, end?: Date) => {
    const duration = end
      ? (end.getTime() - start.getTime()) / 1000
      : (new Date().getTime() - start.getTime()) / 1000;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{entry.title}</h3>
              {entry.description && (
                <p className="text-gray-600 mt-1">{entry.description}</p>
              )}
            </div>
            <button
              onClick={() => onDelete(entry.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-gray-500">
            <Clock size={16} />
            <span>{formatDuration(entry.startTime, entry.endTime)}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
              {entry.category}
            </span>
            {entry.labels.map((label) => (
              <span
                key={label}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded"
              >
                <Tag size={14} />
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}