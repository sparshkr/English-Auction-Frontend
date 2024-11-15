import React from "react";
type TabType = "Bid" | "My Bids" | "Redeem" | "How to";
interface NavItemProps {
  icon: React.ReactNode;
  label: TabType;
  isActive: boolean;
  onClick: () => void;
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

export default NavItem;
