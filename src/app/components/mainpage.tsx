"use client";
import React, { useState } from "react";
import {
  CloudLightningIcon as Lightning,
  Star,
  Droplet,
  HelpCircle,
  Clock,
  Coins,
} from "lucide-react";
import Image from "next/image";
type TabType = "Bid" | "My Bids" | "Redeem" | "How to";
type Bid = {
  amount: number;
  time: string;
  bidder: BidderInfo;
};

interface NavItemProps {
  icon: React.ReactNode;
  label: TabType;
  isActive: boolean;
  onClick: () => void;
}

interface BidderInfo {
  name: string;
  image: string;
}

interface BidData {
  amount: number;
  time: string;
  bidder: BidderInfo;
}

interface CircularProgressBarProps {
  percentage: number;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`flex flex-col items-center justify-center w-24 py-3 rounded-[15px] transition-all duration-300 ${
      isActive
        ? "text-blue-400 bg-white bg-opacity-10 scale-110 shadow-xl"
        : "text-gray-400 hover:text-gray-200 hover:bg-white hover:bg-opacity-5"
    }`}
    onClick={onClick}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    <span className="text-sm mt-2 font-medium">{label}</span>
  </button>
);

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
}) => {
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const gradientId = "progress-gradient";

  return (
    <div className="absolute top-full -translate-y-1/2 w-36 h-36 backdrop-blur-sm bg-black bg-opacity-30 rounded-full p-2">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <circle
          className="text-gray-800"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r="54"
          cx="60"
          cy="60"
        />
        <circle
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          fill="transparent"
          r="54"
          cx="60"
          cy="60"
          className="filter drop-shadow-lg"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {percentage}%
        </span>
        <span className="text-xs text-gray-300">Remaining</span>
      </div>
    </div>
  );
};

const CurrentBids: React.FC = () => {
  const bids: Bid[] = [
    {
      amount: 999.97,
      time: "12:10:38 PM",
      bidder: {
        name: "Sparsh",
        image: "https://api.auctionx.dev/assets/avatar/1.png",
      },
    },
    {
      amount: 999.96,
      time: "12:10:35 PM",
      bidder: {
        name: "Vedant",
        image: "https://api.auctionx.dev/assets/avatar/2.png",
      },
    },
    {
      amount: 999.95,
      time: "12:10:32 PM",
      bidder: {
        name: "Prateush",
        image: "https://api.auctionx.dev/assets/avatar/3.png",
      },
    },
    {
      amount: 999.94,
      time: "12:10:31 PM",
      bidder: {
        name: "Praveen",
        image: "https://api.auctionx.dev/assets/avatar/4.png",
      },
    },
    {
      amount: 999.93,
      time: "12:10:27 PM",
      bidder: {
        name: "Jane Doe",
        image: "https://api.auctionx.dev/assets/avatar/5.png",
      },
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        <Clock className="mr-2 text-blue-400" /> Live Bids
      </h2>
      <div className="space-y-4">
        {bids.map((bid, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            <div className="relative w-12 h-12">
              <Image
                src={bid.bidder.image}
                alt={bid.bidder.name}
                fill
                sizes="48px"
                className="rounded-full ring-2 ring-blue-400/50 object-cover"
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
            <div className="flex-grow">
              <div className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {bid.bidder.name}
              </div>
              <div className="text-sm text-gray-400">{bid.time}</div>
            </div>
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              ${bid.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Bid");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [playsBalance, setPlaysBalance] = useState<number>(10000); // Initial PLAYS balance

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bid submitted:", bidAmount);
  };

  const handleBuyPlays = () => {
    console.log("Buy PLAYS clicked");
    // Implement the logic to buy PLAYS tokens here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Bid":
        return (
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
                      <CircularProgressBar percentage={80} />
                    </div>

                    <form onSubmit={handleBidSubmit} className="mb-8">
                      <div className="relative group">
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
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

                    <div className="flex justify-between items-center text-lg backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Airpods Pro
                      </span>
                      <span className="bg-gradient-to-r from-green-400 to-emerald-400 px-4 py-1 rounded-xl text-white font-medium shadow-lg">
                        20000 coins
                      </span>
                    </div>

                    <div className="mt-6 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="text-base mb-2 text-gray-400">
                        Top Bidders
                      </div>
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="relative w-10 h-10">
                            <Image
                              src={`https://api.auctionx.dev/assets/avatar/${i}.png`}
                              alt={`Bidder ${i}`}
                              fill
                              sizes="40px"
                              className="rounded-full border-2 border-purple-900 ring-2 ring-white/10 object-cover"
                              priority={i === 1}
                              loading={i === 1 ? "eager" : "lazy"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <CurrentBids />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Coming Soon
          </div>
        );
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
        {renderTabContent()}
      </div>

      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-md rounded-[22px] p-2 flex space-x-2 shadow-2xl border border-white/10">
        <NavItem
          icon={<Lightning />}
          label="Bid"
          isActive={activeTab === "Bid"}
          onClick={() => setActiveTab("Bid")}
        />
        <NavItem
          icon={<Star />}
          label="My Bids"
          isActive={activeTab === "My Bids"}
          onClick={() => setActiveTab("My Bids")}
        />
        <NavItem
          icon={<Droplet />}
          label="Redeem"
          isActive={activeTab === "Redeem"}
          onClick={() => setActiveTab("Redeem")}
        />
        <NavItem
          icon={<HelpCircle />}
          label="How to"
          isActive={activeTab === "How to"}
          onClick={() => setActiveTab("How to")}
        />
      </nav>
    </div>
  );
};

export default Home;
