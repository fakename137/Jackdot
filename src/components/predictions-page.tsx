import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Info, Share2, Search } from "lucide-react";

export default function PredictionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Sports",
    "Politics",
    "Economics",
    "Entertainment",
    "Technology",
    "Science",
    "Health",
  ];

  const predictions = [
    {
      id: 1,
      question: "Will the Golden State Warriors win the NBA Championship?",
      options: ["Yes", "No"],
      tags: ["Sports", "NBA"],
      timeRemaining: "2d 5h",
      participants: 1500,
      poolSize: "$15,000",
      odds: [60, 40],
    },
    {
      id: 2,
      question: "Will inflation rates decrease in the next quarter?",
      options: ["Yes", "No"],
      tags: ["Economics", "Finance"],
      timeRemaining: "5d 12h",
      participants: 2200,
      poolSize: "$22,000",
      odds: [45, 55],
    },
    // Add more prediction objects as needed
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-neon-green">
              Predictions Hub
            </h1>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  >
                    Sort by: {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <DropdownMenuItem onSelect={() => setSortBy("popularity")}>
                    Popularity
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortBy("closing-soon")}>
                    Closing Soon
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortBy("pool-size")}>
                    Pool Size
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-4/5">
              <Input
                type="text"
                placeholder="Search predictions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-gray-100 border-gray-600 focus:border-neon-green pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategories.includes(category)
                      ? "default"
                      : "outline"
                  }
                  className={`cursor-pointer ${
                    selectedCategories.includes(category)
                      ? "bg-neon-green text-gray-900"
                      : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Prediction */}
      <section className="bg-gray-800 p-6 m-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-neon-green">
          Featured Prediction
        </h2>
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-bold mb-2">
            Will AI surpass human intelligence by 2030?
          </h3>
          <div className="flex justify-between mb-2">
            <Button
              variant="outline"
              className="w-[48%] bg-gray-600 hover:bg-neon-green hover:text-gray-900"
            >
              Yes
            </Button>
            <Button
              variant="outline"
              className="w-[48%] bg-gray-600 hover:bg-neon-green hover:text-gray-900"
            >
              No
            </Button>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Time left: 30d 12h</span>
            <span>10,000 participants</span>
            <span>$100,000 pool</span>
          </div>
          <Progress value={65} className="mt-2" />
          <div className="flex justify-between text-sm mt-1">
            <span>Yes: 65%</span>
            <span>No: 35%</span>
          </div>
        </div>
      </section>

      {/* Predictions Grid */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-neon-green transition-shadow duration-300"
          >
            <h3 className="text-lg font-bold mb-2">{prediction.question}</h3>
            <div className="flex justify-between mb-2">
              <Button
                variant="outline"
                className="w-[48%] bg-gray-700 hover:bg-neon-green hover:text-gray-900"
              >
                {prediction.options[0]}
              </Button>
              <Button
                variant="outline"
                className="w-[48%] bg-gray-700 hover:bg-neon-green hover:text-gray-900"
              >
                {prediction.options[1]}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {prediction.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-700 text-neon-green"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{prediction.timeRemaining}</span>
              <span>{prediction.participants} participants</span>
              <span>{prediction.poolSize} pool</span>
            </div>
            <Progress value={prediction.odds[0]} className="mb-1" />
            <div className="flex justify-between text-sm mb-2">
              <span>Yes: {prediction.odds[0]}%</span>
              <span>No: {prediction.odds[1]}%</span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button size="icon" variant="ghost">
                <Info className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-neon-green">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green">
              Privacy
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            Disclaimer: Predictions are for entertainment purposes only.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-neon-green">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
