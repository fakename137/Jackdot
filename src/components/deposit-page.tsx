import { useState } from 'react'
import { EclipseIcon as Ethereum } from 'lucide-react'
import PoolOverview from './pool-overview'
import DepositSection from './deposit-section'
import UserContribution from './user-contribution'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DepositPage() {
  const [poolBalance, setPoolBalance] = useState(75) // in ETH
  const [totalParticipants, setTotalParticipants] = useState(50)
  const [userContribution, setUserContribution] = useState(0) // in ETH

  const handleDeposit = (amount: number) => {
    setPoolBalance(prev => prev + amount)
    setUserContribution(prev => prev + amount)
    setTotalParticipants(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 flex items-center justify-center">
            <Ethereum className="mr-2 h-10 w-10 text-blue-400" />
            Bonding Curve Pool
          </h1>
          <p className="mt-2 text-lg text-gray-300">Deposit ETH and participate in the pool</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Pool Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PoolOverview balance={poolBalance} participants={totalParticipants} />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Make a Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <DepositSection onDeposit={handleDeposit} poolBalance={poolBalance} />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Your Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <UserContribution contribution={userContribution} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

