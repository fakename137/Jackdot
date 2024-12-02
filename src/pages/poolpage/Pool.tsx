import Navbar from "@/components/navbar";
import Meteors from "@/components/ui/meteors";
import PoolSection from "@/pages/sections/Poolsection";
import { poolData } from "@/data/poolData";
function Pool() {
  return (
    <div className="bg-gradient-to-t from-[#061734] to-[#000000] min-h-screen">
      <Navbar />
      <Meteors number={30} />
      <main className="container mx-auto px-4 pt-40 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PoolSection
            title="Members Pool"
            description="Join a smaller, exclusive pool with higher returns"
            pools={poolData.tenMembers}
          />
          <PoolSection
            title="Members Pool"
            description="Join our larger community pool with stable returns"
            pools={poolData.hundredMembers}
          />
        </div>
      </main>
    </div>
  );
}

export default Pool;
