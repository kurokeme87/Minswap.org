import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { Link } from "react-router-dom";
import { useState } from "react";

function LaunchBowl() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };
  return (
    <div className="LaunchBowl">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
          <img
            src="/Launchbowl.png"
            width="450"
            alt="launchbowl"
            className="m-auto"
          />
          <div className="mt-6 text-center">
            <h1 className="text-3xl sm:text-5xl text-textSecondary font-semibold m-auto max-w-[530px]">
              A Launch Bowl brought to you by Cats
            </h1>
            <p className="text-md sm:text-lg text-textPrimary m-auto max-w-[700px] mt-3">
              The Minswap Launch Bowl offers promising projects some of the most
              potent DeFi primitives to launch and increase their liquidity.
            </p>

            <button
              className="py-3 px-5 rounded-full border border-stone-700 text-textSecondary hover:text-[#111217] hover:bg-textSecondary mt-4"
              onClick={openWalletModal}
            >
              Live Launch
            </button>
          </div>
        </div>

        <div className="mt-6 px-4">
          <h1 className="text-3xl text-textSecondary font-semibold">
            How it works
          </h1>
          <p className="text-sm sm:text-md text-textPrimary font-medium mt-2">
            Deposit ADA, redeem LP tokens, and Farm!{" "}
            <Link
              to="https://minswap-labs.medium.com/introducing-the-minswap-launch-bowl-a5db8266345c"
              target="_blank"
              className="text-textSecondary border-b"
            >
              Learn more
            </Link>
          </p>

          <div className="max-w-[340px]">
            <div className="flex justify-between mt-6 bg-[#1f2025] py-1 px-1 rounded-full text-sm font-semibold">
              <div className="flex items-center gap-1  text-textSecondary bg-[#111316] px-3 py-1 rounded-full">
                <p>Liquidity bootstrapping</p>
              </div>

              <div className="flex items-center gap-1  text-textPrimary  px-3 py-1">
                <p>Collective Zap-in</p>
              </div>
            </div>
          </div>
        </div>
        {isWalletModalOpen && <ConnectWallet onClose={closeWalletModal} />}
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}

export default LaunchBowl;
