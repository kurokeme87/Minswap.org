import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { useState } from "react";

function Analytics() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="Analytics">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
          <div>
            <h1 className="text-textSecondary text-3xl font-medium">
              DEX Overview
            </h1>
            <p className="text-textPrimary font-medium text-sm">
              Track important metrics in real-time.
            </p>
          </div>

          <div
            className="bg-[#1a1b20] hidden sm:block px-3 rounded-xl mt-8 cursor-pointer"
            onClick={openWalletModal}
          >
            <img src="analytics.png" alt="analy" />
            <img src="analyticstwo.png" alt="analy" />
          </div>

          <div
            className="mt-4 block sm:hidden cursor-pointer"
            onClick={openWalletModal}
          >
            <img src="analymobile.png" alt="analy" />
            <img src="analymobiletwo.png" alt="analy" />
            <img src="analymobilethree.png" alt="analy" />
            <img src="analymobilefour.png" alt="analy" />
          </div>

          <div
            className="mt-4 hidden sm:block cursor-pointer"
            onClick={openWalletModal}
          >
            <img src="analytable.png" alt="analy" />
            <img src="analytabletwo.png" alt="analy" />
          </div>
          <div
            className="mt-4 block sm:hidden cursor-pointer"
            onClick={openWalletModal}
          >
            <img src="analymob.png" alt="analy" />
            <img src="analymobtwo.png" alt="analy" />
          </div>

          {/* <div className="mt-20 max-w-xl m-auto text-center">
            <img
              src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722295212/rtvohkmcvdlzl8lww1ae.svg"
              width="250"
              className="m-auto"
              alt="error"
            />
            <h1 className="text-textSecondary font-bold text-xl mt-5">
              Something goes wrong... ฅ^._.^ฅ
            </h1>
            <p className="text-textPrimary text-sm mt-3 mb-4">
              We’re sorry, this one could not be found.
            </p>
            <button
              className="flex m-auto select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#8aaaff]  border-transparent text-black font-medium hover:bg-itr-tentSec-df hover:border-transparent hover:text-itr-tone-tent active:bg-itr-tentSec-sub active:border-transparent active:text-itr-tone-tent disabled:border-transparent disabled:bg-sf-pri-dis disabled:text-itr-tentSec-dis px-6 py-2.5 rounded-full"
              onClick={openWalletModal}
            >
              <span>Retry</span>
            </button>
          </div> */}
        </div>
        {isWalletModalOpen && <ConnectWallet onClose={closeWalletModal} />}
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}

export default Analytics;
