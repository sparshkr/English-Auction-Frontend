import React from "react";

interface Bid {
  amount: number;
  time: string;
}

export default function currentbids() {
  const bids: Bid[] = [
    { amount: 999.97, time: "12:10:38 PM" },
    { amount: 999.96, time: "12:10:35 PM" },
    { amount: 999.95, time: "12:10:32 PM" },
    { amount: 999.94, time: "12:10:31 PM" },
    { amount: 999.93, time: "12:10:27 PM" },
    { amount: 999.92, time: "12:10:22 PM" },
    { amount: 999.91, time: "12:10:18 PM" },
    { amount: 999.9, time: "12:10:16 PM" },
  ];

  return (
    <div className="bg-purple-900 text-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Current Bids</h2>
      <div className="space-y-2">
        {bids.map((bid, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              ${bid.amount.toFixed(2)}
            </span>
            <span className="text-sm text-purple-300">{bid.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
