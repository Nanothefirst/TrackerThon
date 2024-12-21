export interface TimeEntry {
  id: string;
  title: string;
  description?: string;
  category: string;
  startTime: Date;
  endTime?: Date;
  isRunning: boolean;
  labels: string[];
}

export interface TimeStats {
  totalTime: number;
  categoryBreakdown: Record<string, number>;
  labelBreakdown: Record<string, number>;
}