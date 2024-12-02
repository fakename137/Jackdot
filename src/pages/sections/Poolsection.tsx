import { PoolData } from "../../data/poolData";
import InvestmentCard from "@/components/ui/InvestmentCard";

interface PoolSectionProps {
  title: string;
  description: string;
  pools: PoolData[];
}

function PoolSection({ title, description, pools }: PoolSectionProps) {
  return (
    <section className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#FF0068] mb-2">{title}</h2>
      <p className="text-gray-300 mb-6 text-sm">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pools.map((pool, index) => (
          <InvestmentCard
            key={index}
            amount={pool.amount}
            multiplier={pool.multiplier}
            buyAmount={pool.buyAmount}
            winAmount={pool.winAmount}
          />
        ))}
      </div>
    </section>
  );
}

export default PoolSection;
