import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface DepositSectionProps {
  onDeposit: (amount: number) => void
  poolBalance: number
}

export default function DepositSection({ onDeposit, poolBalance }: DepositSectionProps) {
  const [amount, setAmount] = useState('')
  const [expectedPrice, setExpectedPrice] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Simple bonding curve formula: price = (current_pool_balance + deposit_amount)^2
    const depositAmount = parseFloat(amount) || 0
    const price = Math.pow(poolBalance + depositAmount, 2)
    setExpectedPrice(price)
  }, [amount, poolBalance])

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount)
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }
    if (poolBalance + depositAmount > 100) {
      setError('Deposit would exceed pool limit')
      return
    }
    onDeposit(depositAmount)
    setSuccess(`Successfully deposited ${depositAmount} ETH`)
    setAmount('')
    setError('')
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
          ETH Amount
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-300">Expected Price (USD)</span>
        <span className="text-lg font-semibold text-blue-400">${expectedPrice.toFixed(2)}</span>
      </div>
      <Button onClick={handleDeposit} disabled={!amount || parseFloat(amount) <= 0} className="bg-blue-600 hover:bg-blue-700 text-white">
        Deposit
      </Button>
      {error && (
        <Alert variant="destructive" className="bg-red-900 text-red-100 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="default" className="bg-green-900 text-green-100 border-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

