"use client";

import React, { useState } from "react";
import { CloudLightningIcon as Lightning, Coins } from "lucide-react";
import Image from "next/image";
import CurrentBids from "./currentbids";
import CircularProgressBar from "./CircularProgressBar";
import Navbar from "./Navbar";
// import { useToast } from "@/components/hooks/use-toast"; // Import useToast hook
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

type TabType = "Bid" | "My Bids" | "Redeem" | "How to";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Bid");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [playsBalance, setPlaysBalance] = useState<number>(10000);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { toast } = useToast(); // Destructure toast from useToast

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bid submitted:", bidAmount);
  };

  const handleBuyPlays = () => {
    console.log("Buy PLAYS clicked");
  };

  const handleTabClick = (tab: TabType) => {
    if (tab === "Bid") {
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
      setIsDrawerOpen(true);
    }
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);

    if (isNaN(Number(value))) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please enter a valid number.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } else {
      setBidAmount(value);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 to-blue-950 text-white flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Image
              src="https://api.auctionx.dev/assets/avatar/1.png"
              alt="Sparsh"
              fill
              sizes="48px"
              className="rounded-full border-2 border-yellow-400 object-cover"
              priority
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-purple-950"></div>
          </div>
          <div>
            <div className="text-sm font-semibold">Sparsh</div>
            <div className="flex items-center">
              <Coins className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-yellow-400 font-bold">
                {playsBalance} PLAYS
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleBuyPlays}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg hover:scale-105"
        >
          <Coins className="w-4 h-4 mr-2" />
          Buy PLAYS
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="rounded-3xl shadow-2xl overflow-hidden border border-white/10 bg-[url('https://bigdealz.auctionx.dev/_next/static/media/BG.557edf8d.png')] bg-cover bg-center">
                <div className="p-8 md:p-12">
                  <div className="text-center mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    English Auction
                  </div>
                  <div className="text-center mb-8 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    AirPods 4
                  </div>
                  <div className="relative w-full aspect-square mb-20 flex justify-center items-center">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://api.auctionx.dev/assets/uploads/1730104758278-cropped-image-1730104757147.jpg"
                        alt="Product"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
                        priority
                        quality={90}
                      />
                    </div>
                    <CircularProgressBar percentage={90} />
                  </div>

                  <form onSubmit={handleBidSubmit} className="mb-8">
                    <div className="relative group">
                      <input
                        type="text"
                        value={bidAmount}
                        onChange={handleBidChange}
                        placeholder="Enter your bid amount..."
                        className="w-full py-4 px-6 bg-white/5 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 backdrop-blur-sm border border-white/10 group-hover:bg-white/10"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-blue-600 hover:to-purple-600"
                      >
                        <Lightning className="w-6 h-6" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="sticky top-6 z-10">
                <CurrentBids />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={handleTabClick} />
    </div>
  );
};

export default Home;
