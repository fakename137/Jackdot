import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-white/20 rounded-full h-2.5">
      <div
        className={cn(
          'h-2.5 rounded-full transition-all duration-300',
          'bg-[#ff0068]'
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressIndicator;
