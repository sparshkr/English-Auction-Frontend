// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Clock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type Bid = {
//   id: string;
//   amount: number;
//   time: string;
//   bidder: BidderInfo;
// };

// interface BidderInfo {
//   name: string;
//   image: string;
// }

// const firstNames = [
//   "Alice",
//   "Bob",
//   "Charlie",
//   "David",
//   "Eva",
//   "Frank",
//   "Grace",
//   "Henry",
//   "Ivy",
//   "Jack",
// ];
// const lastNames = [
//   "Smith",
//   "Johnson",
//   "Williams",
//   "Brown",
//   "Jones",
//   "Garcia",
//   "Miller",
//   "Davis",
//   "Rodriguez",
//   "Martinez",
// ];

// const generateUniqueBidder = (): BidderInfo => {
//   const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
//   const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
//   const name = `${firstName} ${lastName}`;
//   const imageId = Math.floor(Math.random() * 15) + 1;
//   return {
//     name,
//     image: `https://api.auctionx.dev/assets/avatar/${imageId}.png`,
//   };
// };

// const generateBid = (): Bid => ({
//   id: `bid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//   amount: 999.9 + Math.random() * 0.2,
//   time: new Date().toLocaleTimeString(),
//   bidder: generateUniqueBidder(),
// });

// interface CurrentBidsProps {
//   userBids: Bid[];
//   onWinner: (winningBid: Bid) => void;
//   isAuctionEnded: boolean;
// }

// export default function CurrentBids({
//   userBids,
//   onWinner,
//   isAuctionEnded,
// }: CurrentBidsProps) {
//   const [bids, setBids] = useState<Bid[]>([
//     {
//       id: "bid-1",
//       amount: 999.97,
//       time: "12:10:38 PM",
//       bidder: {
//         name: "Sparsh Kumar",
//         image: "https://api.auctionx.dev/assets/avatar/1.png",
//       },
//     },
//     {
//       id: "bid-2",
//       amount: 999.96,
//       time: "12:10:35 PM",
//       bidder: {
//         name: "Vedant Sharma",
//         image: "https://api.auctionx.dev/assets/avatar/2.png",
//       },
//     },
//     {
//       id: "bid-3",
//       amount: 999.95,
//       time: "12:10:32 PM",
//       bidder: {
//         name: "Prateush Mishra",
//         image: "https://api.auctionx.dev/assets/avatar/3.png",
//       },
//     },
//     {
//       id: "bid-4",
//       amount: 999.94,
//       time: "12:10:31 PM",
//       bidder: {
//         name: "Praveen Singh",
//         image: "https://api.auctionx.dev/assets/avatar/4.png",
//       },
//     },
//     {
//       id: "bid-5",
//       amount: 999.93,
//       time: "12:10:27 PM",
//       bidder: {
//         name: "Jane Doe",
//         image: "https://api.auctionx.dev/assets/avatar/5.png",
//       },
//     },
//   ]);

//   const [bidCount, setBidCount] = useState(5); // Initial bid count is 5

//   useEffect(() => {
//     if (!isAuctionEnded) {
//       const interval = setInterval(() => {
//         setBids((prevBids) => {
//           const newBid = generateBid();
//           const allBids = [...prevBids, newBid];
//           const uniqueBids = Array.from(
//             new Map(allBids.map((bid) => [bid.id, bid])).values()
//           );
//           const sortedBids = uniqueBids
//             .sort((a, b) => b.amount - a.amount)
//             .slice(0, 5);

//           setBidCount((prevCount) => {
//             const newCount = prevCount + 1;
//             if (newCount === 15) {
//               setTimeout(() => onWinner(sortedBids[0]), 0);
//             }
//             return newCount;
//           });

//           return sortedBids;
//         });
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [onWinner, isAuctionEnded]);

//   useEffect(() => {
//     if (userBids.length > 0 && !isAuctionEnded) {
//       setBids((prevBids) => {
//         const allBids = [...prevBids, ...userBids];
//         const uniqueBids = Array.from(
//           new Map(allBids.map((bid) => [bid.id, bid])).values()
//         );
//         const sortedBids = uniqueBids
//           .sort((a, b) => b.amount - a.amount)
//           .slice(0, 5);

//         setBidCount((prevCount) => {
//           const newCount = prevCount + 1;
//           if (newCount === 15) {
//             setTimeout(() => onWinner(sortedBids[0]), 0);
//           }
//           return newCount;
//         });

//         return sortedBids;
//       });
//     }
//   }, [userBids, onWinner, isAuctionEnded]);

//   return (
//     <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10">
//       <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         <Clock className="mr-2 text-blue-400" /> Live Bids
//       </h2>
//       <div className="space-y-4">
//         <AnimatePresence initial={false}>
//           {bids.map((bid, index) => (
//             <motion.div
//               key={bid.id}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-105"
//             >
//               <div className="relative w-12 h-12">
//                 <Image
//                   src={bid.bidder.image}
//                   alt={bid.bidder.name}
//                   fill
//                   sizes="48px"
//                   className="rounded-full ring-2 ring-blue-400/50 object-cover"
//                   priority={index < 2}
//                 />
//               </div>
//               <div className="flex-grow">
//                 <div className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   {bid.bidder.name}
//                 </div>
//                 <div className="text-sm text-gray-400">{bid.time}</div>
//               </div>
//               <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
//                 ${bid.amount.toFixed(2)}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       {isAuctionEnded && (
//         <div className="mt-6 p-4 bg-white/10 rounded-xl text-center">
//           <p className="text-lg font-semibold">Auction Ended</p>
//           <p className="text-sm text-gray-300">No more bids can be placed</p>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Clock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type Bid = {
//   id: string;
//   amount: number;
//   time: string;
//   bidder: BidderInfo;
// };

// interface BidderInfo {
//   name: string;
//   image: string;
// }

// const firstNames = [
//   "Alice",
//   "Bob",
//   "Charlie",
//   "David",
//   "Eva",
//   "Frank",
//   "Grace",
//   "Henry",
//   "Ivy",
//   "Jack",
// ];
// const lastNames = [
//   "Smith",
//   "Johnson",
//   "Williams",
//   "Brown",
//   "Jones",
//   "Garcia",
//   "Miller",
//   "Davis",
//   "Rodriguez",
//   "Martinez",
// ];

// const generateUniqueBidder = (): BidderInfo => {
//   const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
//   const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
//   const name = `${firstName} ${lastName}`;
//   const imageId = Math.floor(Math.random() * 15) + 1;
//   return {
//     name,
//     image: `https://api.auctionx.dev/assets/avatar/${imageId}.png`,
//   };
// };

// const generateBid = (): Bid => ({
//   id: `bid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//   amount: 999.9 + Math.random() * 0.2,
//   time: new Date().toLocaleTimeString(),
//   bidder: generateUniqueBidder(),
// });

// interface CurrentBidsProps {
//   userBids: Bid[];
//   onWinner: (winningBid: Bid) => void;
//   isAuctionEnded: boolean;
//   onBidCountChange: (count: number) => void;
// }

// const INITIAL_BIDS: Bid[] = [
//   {
//     id: "bid-1",
//     amount: 999.97,
//     time: "12:10:38 PM",
//     bidder: {
//       name: "Sparsh Kumar",
//       image: "https://api.auctionx.dev/assets/avatar/1.png",
//     },
//   },
//   {
//     id: "bid-2",
//     amount: 999.96,
//     time: "12:10:35 PM",
//     bidder: {
//       name: "Vedant Sharma",
//       image: "https://api.auctionx.dev/assets/avatar/2.png",
//     },
//   },
//   {
//     id: "bid-3",
//     amount: 999.95,
//     time: "12:10:32 PM",
//     bidder: {
//       name: "Prateush Mishra",
//       image: "https://api.auctionx.dev/assets/avatar/3.png",
//     },
//   },
//   {
//     id: "bid-4",
//     amount: 999.94,
//     time: "12:10:31 PM",
//     bidder: {
//       name: "Praveen Singh",
//       image: "https://api.auctionx.dev/assets/avatar/4.png",
//     },
//   },
//   {
//     id: "bid-5",
//     amount: 999.93,
//     time: "12:10:27 PM",
//     bidder: {
//       name: "Jane Doe",
//       image: "https://api.auctionx.dev/assets/avatar/5.png",
//     },
//   },
// ];

// export default function CurrentBids({
//   userBids,
//   onWinner,
//   isAuctionEnded,
//   onBidCountChange,
// }: CurrentBidsProps) {
//   const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
//   const [localBidCount, setLocalBidCount] = useState(5); // Start with 5 bids
//   const [processedUserBids, setProcessedUserBids] = useState<Set<string>>(new Set());

//   // Initial setup
//   useEffect(() => {
//     onBidCountChange(5); // Set initial count in parent
//   }, [onBidCountChange]);

//   // Effect to handle bid count changes and winner determination
//   useEffect(() => {
//     if (localBidCount === 15 && !isAuctionEnded) {
//       onWinner(bids[0]);
//     }
//   }, [localBidCount, bids, onWinner, isAuctionEnded]);

//   // Effect to update parent when bid count changes
//   useEffect(() => {
//     onBidCountChange(localBidCount);
//   }, [localBidCount, onBidCountChange]);

//   // Effect to handle automatic bids
//   useEffect(() => {
//     if (!isAuctionEnded) {
//       const interval = setInterval(() => {
//         if (localBidCount < 15) {
//           const newBid = generateBid();
//           setBids((prevBids) => {
//             const allBids = [...prevBids, newBid];
//             const uniqueBids = Array.from(
//               new Map(allBids.map((bid) => [bid.id, bid])).values()
//             );
//             return uniqueBids
//               .sort((a, b) => b.amount - a.amount)
//               .slice(0, 5);
//           });
//           setLocalBidCount(count => Math.min(count + 1, 15));
//         }
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [isAuctionEnded, localBidCount]);

//   // Effect to handle user bids
//   useEffect(() => {
//     if (userBids.length > 0 && !isAuctionEnded && localBidCount < 15) {
//       const newUserBids = userBids.filter(bid => !processedUserBids.has(bid.id));

//       if (newUserBids.length > 0) {
//         setBids((prevBids) => {
//           const allBids = [...prevBids, ...newUserBids];
//           const uniqueBids = Array.from(
//             new Map(allBids.map((bid) => [bid.id, bid])).values()
//           );
//           return uniqueBids
//             .sort((a, b) => b.amount - a.amount)
//             .slice(0, 5);
//         });

//         // Update processed bids
//         setProcessedUserBids(prev => {
//           const newSet = new Set(prev);
//           newUserBids.forEach(bid => newSet.add(bid.id));
//           return newSet;
//         });

//         // Only increment bid count once for new bids
//         setLocalBidCount(count => Math.min(count + 1, 15));
//       }
//     }
//   }, [userBids, isAuctionEnded, localBidCount, processedUserBids]);

//   return (
//     <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10">
//       <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         <Clock className="mr-2 text-blue-400" /> Live Bids
//       </h2>
//       <div className="space-y-4">
//         <AnimatePresence initial={false}>
//           {bids.map((bid, index) => (
//             <motion.div
//               key={bid.id}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-105"
//             >
//               <div className="relative w-12 h-12">
//                 <Image
//                   src={bid.bidder.image}
//                   alt={bid.bidder.name}
//                   fill
//                   sizes="48px"
//                   className="rounded-full ring-2 ring-blue-400/50 object-cover"
//                   priority={index < 2}
//                 />
//               </div>
//               <div className="flex-grow">
//                 <div className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   {bid.bidder.name}
//                 </div>
//                 <div className="text-sm text-gray-400">{bid.time}</div>
//               </div>
//               <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
//                 ${bid.amount.toFixed(2)}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       {isAuctionEnded && (
//         <div className="mt-6 p-4 bg-white/10 rounded-xl text-center">
//           <p className="text-lg font-semibold">Auction Ended</p>
//           <p className="text-sm text-gray-300">No more bids can be placed</p>
//         </div>
//       )}

//       <div className="mt-4 text-sm text-gray-400 text-center">
//         Total Bids: {localBidCount}/15
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Bid = {
  id: string;
  amount: number;
  time: string;
  bidder: BidderInfo;
};

interface BidderInfo {
  name: string;
  image: string;
}

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

const generateUniqueBidder = (): BidderInfo => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  const imageId = Math.floor(Math.random() * 15) + 1;
  return {
    name,
    image: `https://api.auctionx.dev/assets/avatar/${imageId}.png`,
  };
};

const generateBid = (): Bid => ({
  id: `bid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  amount: 999.9 + Math.random() * 0.2,
  time: new Date().toLocaleTimeString(),
  bidder: generateUniqueBidder(),
});

interface CurrentBidsProps {
  userBids: Bid[];
  onWinner: (winningBid: Bid) => void;
  isAuctionEnded: boolean;
  onBidCountChange: (count: number) => void;
}

const INITIAL_BIDS: Bid[] = [
  {
    id: "bid-1",
    amount: 999.97,
    time: "12:10:38 PM",
    bidder: {
      name: "Sparsh Kumar",
      image: "https://api.auctionx.dev/assets/avatar/1.png",
    },
  },
  {
    id: "bid-2",
    amount: 999.96,
    time: "12:10:35 PM",
    bidder: {
      name: "Vedant Sharma",
      image: "https://api.auctionx.dev/assets/avatar/2.png",
    },
  },
  {
    id: "bid-3",
    amount: 999.95,
    time: "12:10:32 PM",
    bidder: {
      name: "Prateush Mishra",
      image: "https://api.auctionx.dev/assets/avatar/3.png",
    },
  },
  {
    id: "bid-4",
    amount: 999.94,
    time: "12:10:31 PM",
    bidder: {
      name: "Praveen Singh",
      image: "https://api.auctionx.dev/assets/avatar/4.png",
    },
  },
  {
    id: "bid-5",
    amount: 999.93,
    time: "12:10:27 PM",
    bidder: {
      name: "Jane Doe",
      image: "https://api.auctionx.dev/assets/avatar/5.png",
    },
  },
];

export default function CurrentBids({
  userBids,
  onWinner,
  isAuctionEnded,
  onBidCountChange,
}: CurrentBidsProps) {
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [localBidCount, setLocalBidCount] = useState(5); // Start with 5 bids
  const [processedUserBids, setProcessedUserBids] = useState<Set<string>>(
    new Set()
  );

  // Initial setup
  useEffect(() => {
    onBidCountChange(5); // Set initial count in parent
  }, [onBidCountChange]);

  // Effect to handle bid count changes and winner determination
  useEffect(() => {
    if (localBidCount === 15 && !isAuctionEnded) {
      onWinner(bids[0]);
    }
  }, [localBidCount, bids, onWinner, isAuctionEnded]);

  // Effect to update parent when bid count changes
  useEffect(() => {
    onBidCountChange(localBidCount);
  }, [localBidCount, onBidCountChange]);

  // Effect to handle automatic bids
  useEffect(() => {
    if (!isAuctionEnded) {
      const interval = setInterval(() => {
        if (localBidCount < 15) {
          const newBid = generateBid();
          setBids((prevBids) => {
            const allBids = [...prevBids, newBid];
            const uniqueBids = Array.from(
              new Map(allBids.map((bid) => [bid.id, bid])).values()
            );
            return uniqueBids.sort((a, b) => b.amount - a.amount).slice(0, 5);
          });
          setLocalBidCount((count) => Math.min(count + 1, 15));
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAuctionEnded, localBidCount]);

  // Effect to handle user bids
  useEffect(() => {
    if (userBids.length > 0 && !isAuctionEnded && localBidCount < 15) {
      const newUserBids = userBids.filter(
        (bid) => !processedUserBids.has(bid.id)
      );

      if (newUserBids.length > 0) {
        setBids((prevBids) => {
          const allBids = [...prevBids, ...newUserBids];
          const uniqueBids = Array.from(
            new Map(allBids.map((bid) => [bid.id, bid])).values()
          );
          return uniqueBids.sort((a, b) => b.amount - a.amount).slice(0, 5);
        });

        // Update processed bids
        setProcessedUserBids((prev) => {
          const newSet = new Set(prev);
          newUserBids.forEach((bid) => newSet.add(bid.id));
          return newSet;
        });

        // Only increment bid count once for new bids
        setLocalBidCount((count) => Math.min(count + 1, 15));
      }
    }
  }, [userBids, isAuctionEnded, localBidCount, processedUserBids]);

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        <Clock className="mr-2 text-blue-400" /> Live Bids
      </h2>
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {bids.map((bid, index) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {isAuctionEnded && (
        <div className="mt-6 p-4 bg-white/10 rounded-xl text-center">
          <p className="text-lg font-semibold">Auction Ended</p>
          <p className="text-sm text-gray-300">No more bids can be placed</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400 text-center">
        Total Bids: {localBidCount}/15
      </div>
    </div>
  );
}
