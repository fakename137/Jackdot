import { Progress } from '@/components/ui/progress'

interface PoolOverviewProps {
  balance: number
  participants: number
}

export default function PoolOverview({ balance, participants }: PoolOverviewProps) {
  const poolLimit = 100 // in ETH
  const progressPercentage = (balance / poolLimit) * 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">Pool Balance</span>
        <span className="text-lg font-semibold text-blue-400">{balance.toFixed(2)} ETH</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">Total Participants</span>
        <span className="text-lg font-semibold text-blue-400">{participants}</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-400">{progressPercentage.toFixed(2)}%</span>
        </div>
        <Progress value={progressPercentage} className="w-full bg-gray-700" />
      </div>
    </div>
  )
}

