import Navbar from "@/components/navbar";
import Meteors from "@/components/ui/meteors";
import PoolSection from "@/pages/sections/Poolsection";
import { PoolData } from "@/data/poolData";
import { PoolCard } from "@/components/Poolcard";
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
const pools: Pool[] = [
  {
    id: "eth-pool",
    name: "Ethereum",
    symbol: "ETH",
    maxReturn: 10,
    minReturn: 8,
    currentPool: 87,
    maxPool: 100,
    buyAmount: 2,
    maxEarning: 20,
    color: "from-blue-500 to-purple-500",
    progress: 87,
  },
  {
    id: "btc-pool",
    name: "Bitcoin",
    symbol: "BTC",
    maxReturn: 15,
    minReturn: 12,
    currentPool: 92,
    maxPool: 100,
    buyAmount: 5,
    maxEarning: 75,
    color: "from-orange-500 to-yellow-500",
    progress: 92,
  },
  {
    id: "sol-pool",
    name: "Solana",
    symbol: "SOL",
    maxReturn: 20,
    minReturn: 15,
    currentPool: 45,
    maxPool: 100,
    buyAmount: 1,
    maxEarning: 20,
    color: "from-[#9945FF] to-[#14F195]",
    progress: 45,
  },
  {
    id: "matic-pool",
    name: "Polygon",
    symbol: "MATIC",
    maxReturn: 12,
    minReturn: 9,
    currentPool: 78,
    maxPool: 100,
    buyAmount: 3,
    maxEarning: 36,
    color: "from-purple-600 to-violet-500",
    progress: 78,
  },
  {
    id: "avax-pool",
    name: "Avalanche",
    symbol: "AVAX",
    maxReturn: 18,
    minReturn: 14,
    currentPool: 63,
    maxPool: 100,
    buyAmount: 4,
    maxEarning: 72,
    color: "from-red-500 to-rose-500",
    progress: 63,
  },
  {
    id: "dot-pool",
    name: "Polkadot",
    symbol: "DOT",
    maxReturn: 25,
    minReturn: 18,
    currentPool: 34,
    maxPool: 100,
    buyAmount: 2,
    maxEarning: 50,
    color: "from-pink-500 to-rose-500",
    progress: 34,
  },
];
function Pool() {
  return (
    // <div className="bg-gradient-to-t from-[#061734] to-[#000000] min-h-screen">
    //   <Navbar />
    //   <Meteors number={30} />
    //   <main className="container mx-auto px-4 pt-40 pb-8">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //       <PoolSection
    //         title="Members Pool"
    //         description="Join a smaller, exclusive pool with higher returns"
    //         pools={PoolData.tenMembers}
    //       />
    //       <PoolSection
    //         title="Members Pool"
    //         description="Join our larger community pool with stable returns"
    //         pools={PoolData.hundredMembers}
    //       />
    //     </div>
    //   </main>
    // </div>

    <div className="min-h-screen bg-gradient-to-t from-[#061734] to-[#000000] py-16">
      <Navbar />
      <main className="pt-40 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Cryptocurrency Investment Pools
            </h1>
            <p className="text-gray-400">
              Discover high-yield opportunities across multiple cryptocurrencies
            </p>
          </div> */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Pool;
