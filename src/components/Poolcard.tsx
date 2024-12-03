import React from "react";
import { Coins, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "../lib/utils";
interface Pool {
  id: string;
  name: string;
  symbol: string;
  maxReturn: number;
  minReturn: number;
  currentPool: number;
  maxPool: number;
  buyAmount: number;
  maxEarning: number;
  color: string;
  progress: number;
}
interface PoolCardProps {
  pool: Pool;
}

export function PoolCard({ pool }: PoolCardProps) {
  const {
    name,
    symbol,
    maxReturn,
    minReturn,
    currentPool,
    maxPool,
    buyAmount,
    maxEarning,
    color,
    progress,
  } = pool;

  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300`}
      />
      <div className="relative w-full p-6 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white">
              <Coins className={`w-5 h-5 ${color.split(" ")[1]}`} />
              <h3 className="font-semibold text-2xl">
                Win Up to{" "}
                <span className={`text-4xl ${color.split(" ")[1]}`}>
                  {maxReturn}X
                </span>{" "}
                in {symbol}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full w-fit">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {minReturn}X - {maxReturn}X Returns
              </span>
            </div>
          </div>

          {/* Pool Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Total Pool</span>
              <span className="font-medium">
                {currentPool} / {maxPool}
              </span>
            </div>
            <Progress
              value={progress}
              className={cn(
                "bg-white/10",
                progress >= 70 ? "bg-white" : color.split(" ")[1]
              )}
            />
            <div className="flex justify-end">
              <span
                className={cn(
                  "text-xs font-medium",
                  progress >= 90 ? "text-red-400" : color.split(" ")[1]
                )}
              >
                {progress.toFixed(1)}% Filled
              </span>
            </div>
          </div>

          {/* Action Section */}
          <div className="space-y-3">
            <Button
              className={cn(
                "w-full text-white border-none shadow-lg transition-all duration-300",
                `bg-gradient-to-r ${color} hover:shadow-${
                  color.split(" ")[1]
                }/40`
              )}
              size="lg"
              onClick={() => {
                window.location.href = `/pooldetail`;
              }}
            >
              Buy ${buyAmount}
            </Button>
            <p className="text-center text-sm">
              <span className="text-white/60">You earn up to </span>
              <span className="text-emerald-400 font-semibold">
                ${maxEarning}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
