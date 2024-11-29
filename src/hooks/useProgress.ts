import { useState } from 'react';

export interface ProgressState {
  current: number;
  total: number;
  percentage: number;
}

export function useProgress(
  initialCurrent: number = 9,
  initialTotal: number = 10
) {
  const [progress, setProgress] = useState<ProgressState>({
    current: initialCurrent,
    total: initialTotal,
    percentage: (initialCurrent / initialTotal) * 100,
  });

  const updateProgress = (current: number) => {
    setProgress((prev) => ({
      ...prev,
      current,
      percentage: (current / prev.total) * 100,
    }));
  };

  return {
    progress,
    updateProgress,
  };
}
