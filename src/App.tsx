import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { EntryForm } from './components/EntryForm';
import { TimeList } from './components/TimeList';
import { Stats } from './components/Stats';
import { TimeEntry, TimeStats } from './types';
import { Clock } from 'lucide-react';

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [lastPauseTime, setLastPauseTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: number;
    if (currentEntry?.isRunning) {
      const startTime = Date.now() - (elapsedTime * 1000);
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000) + accumulatedTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentEntry?.isRunning, accumulatedTime]);

  const calculateStats = (): TimeStats => {
    const stats: TimeStats = {
      totalTime: 0,
      categoryBreakdown: {},
      labelBreakdown: {},
    };

    entries.forEach((entry) => {
      const duration = entry.endTime
        ? (entry.endTime.getTime() - entry.startTime.getTime()) / 1000
        : 0;

      stats.totalTime += duration;

      // Category breakdown
      stats.categoryBreakdown[entry.category] =
        (stats.categoryBreakdown[entry.category] || 0) + duration;

      // Label breakdown
      entry.labels.forEach((label) => {
        stats.labelBreakdown[label] = (stats.labelBreakdown[label] || 0) + duration;
      });
    });

    return stats;
  };

  const handleStart = (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      startTime: new Date(),
      isRunning: true,
      ...data,
    };
    setCurrentEntry(newEntry);
    setElapsedTime(0);
    setAccumulatedTime(0);
    setLastPauseTime(null);
  };

  const handlePause = () => {
    if (currentEntry) {
      setCurrentEntry({ ...currentEntry, isRunning: false });
      setLastPauseTime(Date.now());
      setAccumulatedTime(elapsedTime);
    }
  };

  const handleResume = () => {
    if (currentEntry && lastPauseTime) {
      setCurrentEntry({ ...currentEntry, isRunning: true });
      setLastPauseTime(null);
    }
  };

  const handleStop = () => {
    if (currentEntry) {
      const completedEntry: TimeEntry = {
        ...currentEntry,
        isRunning: false,
        endTime: new Date(),
      };
      setEntries([completedEntry, ...entries]);
      setCurrentEntry(null);
      setElapsedTime(0);
      setAccumulatedTime(0);
      setLastPauseTime(null);
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center gap-3 mb-8">
          <Clock className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">TrackerThon</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Current Timer</h2>
              <Timer
                isRunning={currentEntry?.isRunning || false}
                elapsedTime={elapsedTime}
                onStart={handleResume}
                onPause={handlePause}
                onStop={handleStop}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">New Time Entry</h2>
              <EntryForm onSubmit={handleStart} />
            </div>
          </div>

          <div className="space-y-8">
            <Stats stats={calculateStats()} />
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
              <TimeList entries={entries} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;