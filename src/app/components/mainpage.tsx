// "use client";

// import React, { useState, useCallback } from "react";
// import { CloudLightningIcon as Lightning, Coins } from "lucide-react";
// import Image from "next/image";
// import CurrentBids from "./currentbids";
// import CircularProgressBar from "./CircularProgressBar";
// import Navbar from "./Navbar";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";

// type TabType = "Bid" | "My Bids" | "Redeem" | "How to";

// type Bid = {
//   id: string;
//   amount: number;
//   time: string;
//   bidder: {
//     name: string;
//     image: string;
//   };
// };

// const Home: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>("Bid");
//   const [bidAmount, setBidAmount] = useState<string>("");
//   const [playsBalance, setPlaysBalance] = useState<number>(10000);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [userBids, setUserBids] = useState<Bid[]>([]);
//   const [winner, setWinner] = useState<Bid | null>(null);
//   const [isAuctionEnded, setIsAuctionEnded] = useState(false);

//   const { toast } = useToast();

//   const handleBidSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isAuctionEnded) {
//       toast({
//         variant: "destructive",
//         title: "Auction Ended",
//         description:
//           "This auction has already ended. You cannot place new bids.",
//         action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
//       });
//       return;
//     }
//     const amount = parseFloat(bidAmount);
//     if (isNaN(amount) || amount <= 0) {
//       toast({
//         variant: "destructive",
//         title: "Invalid bid amount",
//         description: "Please enter a valid positive number.",
//         action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
//       });
//       return;
//     }

//     const newBid: Bid = {
//       id: `user-bid-${Date.now()}-${Math.random()
//         .toString(36)
//         .substring(2, 9)}`,
//       amount: amount,
//       time: new Date().toLocaleTimeString(),
//       bidder: {
//         name: "Sparsh",
//         image: "https://api.auctionx.dev/assets/avatar/8.png",
//       },
//     };

//     setUserBids((prevBids) => {
//       const updatedBids = [...prevBids, newBid];
//       return updatedBids;
//     });
//     setBidAmount("");
//     toast({
//       title: "Bid placed successfully",
//       description: `Your bid of $${amount.toFixed(2)} has been placed.`,
//     });
//   };

//   const handleBuyPlays = () => {
//     console.log("Buy PLAYS clicked");
//   };

//   const handleTabClick = (tab: TabType) => {
//     if (tab === "Bid") {
//       setActiveTab(tab);
//     } else {
//       setActiveTab(tab);
//       setIsDrawerOpen(true);
//     }
//   };

//   const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (isNaN(Number(value))) {
//       toast({
//         variant: "destructive",
//         title: "Invalid input",
//         description: "Please enter a valid number.",
//         action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
//       });
//     } else {
//       setBidAmount(value);
//     }
//   };

//   const handleWinner = useCallback((winningBid: Bid) => {
//     setWinner(winningBid);
//     setIsAuctionEnded(true);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-purple-950 to-blue-950 text-white flex flex-col">
//       <div className="p-6 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <div className="relative w-12 h-12">
//             <Image
//               src="https://api.auctionx.dev/assets/avatar/8.png"
//               alt="Sparsh"
//               fill
//               sizes="48px"
//               className="rounded-full border-2 border-yellow-400 object-cover"
//               priority
//             />
//             <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-purple-950"></div>
//           </div>
//           <div>
//             <div className="text-sm font-semibold">Sparsh</div>
//             <div className="flex items-center">
//               <Coins className="w-4 h-4 mr-1 text-yellow-400" />
//               <span className="text-yellow-400 font-bold">
//                 {playsBalance} PLAYS
//               </span>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={handleBuyPlays}
//           className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg hover:scale-105"
//         >
//           <Coins className="w-4 h-4 mr-2" />
//           Buy PLAYS
//         </button>
//       </div>

//       <div className="flex-grow flex flex-col items-center justify-center p-6 pb-24">
//         <div className="w-full max-w-6xl">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="w-full lg:w-2/3">
//               <div className="rounded-3xl shadow-2xl overflow-hidden border border-white/10 bg-[url('https://bigdealz.auctionx.dev/_next/static/media/BG.557edf8d.png')] bg-cover bg-center">
//                 <div className="p-8 md:p-12">
//                   <div className="text-center mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
//                     English Auction
//                   </div>
//                   <div className="text-center mb-8 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
//                     AirPods 4
//                   </div>
//                   <div className="relative w-full aspect-square mb-20 flex justify-center items-center">
//                     <div className="relative w-full h-full">
//                       <Image
//                         src="https://api.auctionx.dev/assets/uploads/1730104758278-cropped-image-1730104757147.jpg"
//                         alt="Product"
//                         fill
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         className="object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
//                         priority
//                         quality={90}
//                       />
//                     </div>
//                     <CircularProgressBar percentage={90} />
//                   </div>

//                   {isAuctionEnded ? (
//                     <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
//                       <h3 className="text-2xl font-bold mb-2">
//                         Auction Completed
//                       </h3>
//                       <p className="text-lg">
//                         Thank you for participating. You cannot bid now.
//                       </p>
//                     </div>
//                   ) : (
//                     <form onSubmit={handleBidSubmit} className="mb-8">
//                       <div className="relative group">
//                         <input
//                           type="text"
//                           value={bidAmount}
//                           onChange={handleBidChange}
//                           placeholder="Enter your bid amount..."
//                           className="w-full py-4 px-6 bg-white/5 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 backdrop-blur-sm border border-white/10 group-hover:bg-white/10"
//                         />
//                         <button
//                           type="submit"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-blue-600 hover:to-purple-600"
//                         >
//                           <Lightning className="w-6 h-6" />
//                         </button>
//                       </div>
//                     </form>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="w-full lg:w-1/3">
//               <div className="sticky top-6 z-10">
//                 <CurrentBids
//                   userBids={userBids}
//                   onWinner={handleWinner}
//                   isAuctionEnded={isAuctionEnded}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Navbar activeTab={activeTab} setActiveTab={handleTabClick} />

//       {winner && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
//             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Congratulations!
//             </h2>
//             <p className="text-xl mb-4">
//               {winner.bidder.name} wins with a bid of $
//               {winner.amount.toFixed(2)}!
//             </p>
//             <button
//               onClick={() => setWinner(null)}
//               className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
"use client";

import React, { useState, useCallback } from "react";
import { CloudLightningIcon as Lightning, Coins, Trophy } from "lucide-react";
import Image from "next/image";
import CurrentBids from "./currentbids";
import CircularProgressBar from "./CircularProgressBar";
import Navbar from "./Navbar";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";
type TabType = "Bid" | "My Bids" | "Redeem" | "How to";

type Bid = {
  id: string;
  amount: number;
  time: string;
  bidder: {
    name: string;
    image: string;
  };
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Bid");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [playsBalance, setPlaysBalance] = useState<number>(10000);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [winner, setWinner] = useState<Bid | null>(null);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [bidCount, setBidCount] = useState<number>(5); // Track total bid count, starting at 5

  const { toast } = useToast();

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuctionEnded) {
      toast({
        variant: "destructive",
        title: "Auction Ended",
        description:
          "This auction has already ended. You cannot place new bids.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid bid amount",
        description: "Please enter a valid positive number.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }

    const newBid: Bid = {
      id: `user-bid-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      amount: amount,
      time: new Date().toLocaleTimeString(),
      bidder: {
        name: "Sparsh",
        image: "https://api.auctionx.dev/assets/avatar/8.png",
      },
    };

    setUserBids((prevBids) => {
      const updatedBids = [...prevBids, newBid];
      return updatedBids;
    });
    setBidAmount("");
    toast({
      title: "Bid placed successfully",
      description: `Your bid of $${amount.toFixed(2)} has been placed.`,
    });
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

  const handleWinner = useCallback((winningBid: Bid) => {
    setWinner(winningBid);
    setIsAuctionEnded(true);
  }, []);

  // Calculate progress percentage
  const calculateProgress = () => {
    // 5 is starting bid count, 15 is ending bid count
    const progress = ((bidCount - 5) / (15 - 5)) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ensure between 0 and 100
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 to-blue-950 text-white flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Image
              src="https://api.auctionx.dev/assets/avatar/8.png"
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
                    <CircularProgressBar percentage={calculateProgress()} />
                  </div>

                  {isAuctionEnded ? (
                    <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <h3 className="text-2xl font-bold mb-2">
                        Auction Completed
                      </h3>
                      <p className="text-lg">
                        Thank you for participating. You cannot bid now.
                      </p>
                    </div>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="sticky top-6 z-10">
                <CurrentBids
                  userBids={userBids}
                  onWinner={handleWinner}
                  isAuctionEnded={isAuctionEnded}
                  onBidCountChange={setBidCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={handleTabClick} />

      {/* {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-3xl shadow-2xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="text-xl mb-4">
              {winner.bidder.name} wins with a bid of $
              {winner.amount.toFixed(2)}!
            </p>
            <button
              onClick={() => setWinner(null)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
      {/* <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", duration: 0.7, bounce: 0.4 },
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative bg-gradient-to-br from-purple-900/90 to-blue-900/90 p-12 rounded-3xl shadow-2xl border border-white/20 text-center max-w-xl mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Trophy className="w-16 h-16 text-yellow-400" />
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                  Congratulations!
                </h2>
                <p className="text-xl mb-4">
                  {winner.bidder.name} wins with a bid of $
                  {winner.amount.toFixed(2)}!
                </p>
                <button
                  onClick={() => setWinner(null)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full text-white font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", duration: 0.7, bounce: 0.4 },
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative mx-4 max-w-xl w-full bg-gradient-to-br from-indigo-900 to-purple-900 pt-16 pb-8 px-8 rounded-3xl shadow-2xl border border-white/10"
            >
              {/* Trophy Icon with Glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                className="absolute left-[45%] -translate-x-1/2 -top-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 text-yellow-400 blur-lg opacity-70">
                    <Trophy className="w-16 h-16" />
                  </div>
                  <Trophy className="w-16 h-16 text-yellow-400 relative animate-pulse" />
                </div>
              </motion.div>

              {/* Content Container */}
              <motion.div
                className="space-y-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Title with Rainbow Gradient */}
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Congratulations!
                </h2>

                {/* Winner Text with Glow */}
                <p className="text-xl text-white font-medium">
                  {winner.bidder.name} wins with a bid of{" "}
                  <span className="font-bold text-yellow-300">
                    ${winner.amount.toFixed(2)}!
                  </span>
                </p>

                {/* Enhanced Close Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWinner(null)}
                  className="mt-4 inline-flex items-center px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg transition-shadow hover:shadow-xl"
                >
                  Close
                </motion.button>
              </motion.div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-white/10 rounded-tl-3xl -translate-x-2 -translate-y-2" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-white/10 rounded-br-3xl translate-x-2 translate-y-2" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
