import React from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  elapsedTime: number;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function Timer({ isRunning, elapsedTime, onStart, onPause, onStop }: TimerProps) {
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-6xl font-mono font-bold text-indigo-600">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <Play size={24} />
          </button>
        ) : (
          <button
            onClick={onPause}
            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
          >
            <Pause size={24} />
          </button>
        )}
        <button
          onClick={onStop}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <Square size={24} />
        </button>
      </div>
    </div>
  );
}