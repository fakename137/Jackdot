import { Progress } from '@/components/ui/progress';
import type { ProgressState } from '@/hooks/useProgress';

interface ProgressIndicatorProps {
  progress: ProgressState;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-emerald-500">
          {progress.current}/{progress.total}
        </span>
        <span className="text-muted-foreground">729/1000</span>
      </div>
      <Progress value={progress.percentage} className="h-2 bg-emerald-100">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all"
          style={{ width: `${progress.percentage}%` }}
        />
      </Progress>
    </div>
  );
}
