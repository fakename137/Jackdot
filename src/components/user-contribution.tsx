interface UserContributionProps {
  contribution: number
}

export default function UserContribution({ contribution }: UserContributionProps) {
  const usdEquivalent = contribution * 1800 // Assuming 1 ETH = $1800 USD

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">Total ETH Contributed</span>
        <span className="text-lg font-semibold text-blue-400">{contribution.toFixed(4)} ETH</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">USD Equivalent</span>
        <span className="text-lg font-semibold text-green-400">${usdEquivalent.toFixed(2)}</span>
      </div>
    </div>
  )
}

