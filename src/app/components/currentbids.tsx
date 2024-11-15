import Image from "next/image";
import { Clock } from "lucide-react";
type Bid = {
  amount: number;
  time: string;
  bidder: BidderInfo;
};

interface BidderInfo {
  name: string;
  image: string;
}

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

export default CurrentBids;
