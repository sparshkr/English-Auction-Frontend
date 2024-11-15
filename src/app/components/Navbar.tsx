"use client";

import React, { useState } from "react";
import {
  CloudLightningIcon as Lightning,
  Star,
  Droplet,
  HelpCircle,
} from "lucide-react";
import NavItem from "./NavItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type TabType = "Bid" | "My Bids" | "Redeem" | "How to";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const isDesktop = useMediaQuery("(min-width: 8px)");

  const handleTabClick = (tab: TabType) => {
    if (tab === "Bid") {
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
      setIsOpen(true);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "My Bids":
        return (
          <>
            <DialogHeader>
              <DialogTitle>My Bids</DialogTitle>
              <DialogDescription className="text-gray-200">
                View and manage your current bids
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p>Here you can view and manage your current bids.</p>
            </div>
          </>
        );
      case "Redeem":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Redeem Rewards</DialogTitle>
              <DialogDescription className="text-gray-200">
                Exchange your PLAYS for exciting prizes
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p>Redeem your PLAYS for exciting rewards!</p>
            </div>
          </>
        );
      case "How to":
        return (
          <>
            <DialogHeader>
              <DialogTitle>How to Play</DialogTitle>
              <DialogDescription className="text-gray-200">
                Learn the rules and strategies
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p>Learn how to participate in auctions and win great prizes!</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const ModalContent = () => (
    <>
      {renderContent()}
      <DialogFooter>
        <DialogClose asChild>
          <Button
            className="w-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            variant="outline"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );

  return (
    <>
      {/* {isDesktop ? (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setActiveTab("Bid");
            }
          }}
        >
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-950 to-blue-950 text-white">
            <ModalContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setActiveTab("Bid");
            }
          }}
        >
          <DrawerContent className="fixed inset-x-4 bottom-[100px] max-w-md mx-auto rounded-[22px] bg-gradient-to-br from-purple-950 to-blue-950 text-white">
            <ModalContent />
          </DrawerContent>
        </Drawer>
      )} */}

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setActiveTab("Bid");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-950 to-blue-950 text-white">
          <ModalContent />
        </DialogContent>
      </Dialog>

      {/* Navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 z-10">
        <nav className="bg-gray-900/80 backdrop-blur-md rounded-[22px] p-2 flex space-x-2 shadow-2xl border border-white/10">
          <NavItem
            icon={<Lightning />}
            label="Bid"
            isActive={activeTab === "Bid"}
            onClick={() => handleTabClick("Bid")}
          />
          <NavItem
            icon={<Star />}
            label="My Bids"
            isActive={activeTab === "My Bids"}
            onClick={() => handleTabClick("My Bids")}
          />
          <NavItem
            icon={<Droplet />}
            label="Redeem"
            isActive={activeTab === "Redeem"}
            onClick={() => handleTabClick("Redeem")}
          />
          <NavItem
            icon={<HelpCircle />}
            label="How to"
            isActive={activeTab === "How to"}
            onClick={() => handleTabClick("How to")}
          />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
