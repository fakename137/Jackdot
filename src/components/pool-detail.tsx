import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import LineChart from "./Linechart";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { LineData } from "lightweight-charts";
import { getAllPrices } from "../data/getallPrices";
import { usePrivy } from "@privy-io/react-auth";
// import GrillChat from "./Chat/GrillChat";
import PriceFetcher from "@/prices";
const MotionCard = motion(Card);

export default function PoolDetail() {
  const [chartData, setChartData] = useState<LineData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = usePrivy();
  const staticDates = [
    "2023-12-01",
    "2023-12-09",
    "2023-12-18",
    "2023-12-20",
    "2023-12-22",
  ];

  useEffect(() => {
    const smartWallet = user?.linkedAccounts.find(
      (account) => account.type === "smart_wallet"
    );
    const wallet = user?.linkedAccounts.find(
      (account) => account.type === "wallet"
    );

    const addressToUse = smartWallet?.address ?? wallet?.address ?? "";
    const fetchPrices = async () => {
      try {
        const fetchedPrices = await getAllPrices(addressToUse);

        // Map static dates to fetched prices
        const updatedChartData = staticDates.map((date, index) => ({
          time: date,
          value: fetchedPrices[index] || 0, // Use 0 if no price exists for the date
        }));

        setChartData(updatedChartData);
      } catch (err) {
        // setError("Failed to fetch prices. Please try again.");
      }
    };

    fetchPrices();
  }, [user?.linkedAccounts]);

  return (
    <>
      <Navbar />
      <div className="h-full w-full dark:bg-black bg-white dark:bg-dot-white/[0.8] bg-dot-black/[0.5] relative flex items-center justify-center">
        {/* * Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div className="max-w-4xl pt-40 min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 text-white">
            <div className="grid grid-cols-12 gap-12 w-full mx-auto">
              {/* Line Chart Card */}
              <MotionCard
                className="col-span-12 md:col-span-9 p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {chartData.length > 0 ? (
                    <LineChart data={chartData} />
                  ) : (
                    <p>Loading chart data...</p>
                  )}
                </div>
              </MotionCard>

              {/* Betting Card */}
              <MotionCard
                className="col-span-12 md:col-span-3 p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <PriceFetcher />
                {/* <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl font-bold">Win 4x Bet</h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button className="w-full bg-[#FF0068] hover:bg-[#FF0068]/90">
                      Buy 2$
                    </Button>
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <motion.div
                    className="absolute inset-0 border-2 border-[#FF0068] rounded-lg"
                    animate={{
                      boxShadow: [
                        "0px 0px 8px 2px rgba(255, 0, 104, 0.8)",
                        "0px 0px 16px 4px rgba(255, 0, 104, 0.6)",
                        "0px 0px 8px 2px rgba(255, 0, 104, 0.8)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </div> */}
              </MotionCard>

              {/* Community Chat */}
              {/* <MotionCard
                className="col-span-12 md:col-span-6 /p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              > */}
              {/* <h3 className="font-semibold mb-4">Community Chats</h3> */}
              {/* <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {Array(6)
                      .fill(null)
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          className="flex gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <span className="text-muted-foreground">me:</span>
                          <span>When it's gonna hit market cap</span>
                        </motion.div>
                      ))}
                  </div>
                </ScrollArea> */}
              {/* <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    className="bg-background backdrop-blur-lg"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button className="w-full bg-[#FF0068] hover:bg-[#FF0068]/90">
                      Send
                    </Button>
                  </motion.div>
                </div> */}
              {/* </MotionCard> */}

              {/* Transaction History */}
              <MotionCard
                className="col-span-12 md:col-span-12 p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-semibold mb-4">Transaction History</h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {Array(10)
                      .fill(null)
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          className="p-2 rounded bg-background/50 backdrop-blur-md flex justify-between items-center"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <code className="text-xs text-muted-foreground">
                            0x
                            {Array(40)
                              .fill(null)
                              .map(() => Math.random().toString(16)[2])
                              .join("")}
                          </code>
                          <span className="text-[#FF0068]">2$</span>
                        </motion.div>
                      ))}
                  </div>
                </ScrollArea>
              </MotionCard>
            </div>
          </div>
        </p>
      </div>

      {/* Positioned GrillChat component */}
      {/* <div className="absolute bottom-0 right-0 p-4 z-[100]">
        <GrillChat />
      </div> */}
    </>
  );
}
