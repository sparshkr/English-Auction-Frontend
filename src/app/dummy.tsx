"use client";
import React, { useState } from "react";
import {
  CloudLightningIcon as Lightning,
  Star,
  Droplet,
  HelpCircle,
  LogIn,
  Clock,
} from "lucide-react";

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
    className={`flex flex-col items-center justify-center w-24 py-3 rounded-xl transition-all duration-300 ${
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
            <img
              src={bid.bidder.image}
              alt={bid.bidder.name}
              className="w-12 h-12 rounded-full ring-2 ring-blue-400/50"
            />
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

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bid submitted:", bidAmount);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Bid":
        return (
          <div className="w-full max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <div className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md border border-white/10">
                  <div className="p-8 md:p-12">
                    <div className="text-center mb-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                      Premium Auction | Limited Edition
                    </div>
                    <div className="relative w-full aspect-square mb-20 flex justify-center items-center">
                      <img
                        src="https://api.auctionx.dev/assets/uploads/1730104758278-cropped-image-1730104757147.jpg"
                        alt="Product"
                        className="object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
                      />
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
                        Premium Product
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
                          <img
                            key={i}
                            src={`https://api.auctionx.dev/assets/avatar/${i}.png`}
                            alt={`Bidder ${i}`}
                            className="w-10 h-10 rounded-full border-2 border-purple-900 ring-2 ring-white/10"
                          />
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
      <div className="p-6 flex justify-end">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 px-6 py-2 rounded-xl text-sm font-semibold flex items-center shadow-lg hover:scale-105">
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 pb-24">
        {renderTabContent()}
      </div>

      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-md rounded-2xl p-3 flex space-x-2 shadow-2xl border border-white/10">
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
