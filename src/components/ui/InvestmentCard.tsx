import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { useProgress } from '@/hooks/useProgress';

interface InvestmentCardProps {
  amount: number;
  multiplier: {
    min: number;
    max: number;
  };
  buyAmount: number;
  winAmount: number;
}

function InvestmentCard({
  amount,
  multiplier,
  buyAmount,
  winAmount,
}: InvestmentCardProps) {
  const { progress } = useProgress();

  return (
    <div className="w-[300px] p-6 rounded-lg bg-black/20 backdrop-blur-sm">
      <div className="p-0 space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-3xl font-bold text-[#FF0068]">${amount}</span>
          <div className="flex items-center gap-1 text-[#ffffff]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">
              {multiplier.min}x to {multiplier.max}x
            </span>
          </div>
        </div>
        <p className="text-white">10/100</p>
        <ProgressIndicator progress={progress} />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full border-2 border-[#c9fa00] text-[#c9fa00] hover:bg-[#c9fa00]/10 hover:text-[#c9fa00] transition-colors"
          >
            Buy ${buyAmount}
          </Button>
          <p className="text-center text-sm text-[#c9fa00]">
            Win Up to ${winAmount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvestmentCard;
