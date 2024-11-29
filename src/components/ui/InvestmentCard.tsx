import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { useProgress } from '@/hooks/useProgress';

export function InvestmentCard() {
  const { progress } = useProgress();

  return (
    <Card className="w-[300px] p-6">
      <CardContent className="p-0 space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-3xl font-bold text-red-500">1000$</span>
          <div className="flex items-center gap-1 text-emerald-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">1.6x to 1.8x</span>
          </div>
        </div>

        <ProgressIndicator progress={progress} />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            Buy 200$
          </Button>
          <p className="text-center text-sm text-emerald-500">Win Upto 350</p>
        </div>
      </CardContent>
    </Card>
  );
}
