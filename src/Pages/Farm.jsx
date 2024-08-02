import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { useState } from "react";

function Farm() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="Farm">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
          <div className="mt-8">
            <h1 className="text-textSecondary text-2xl font-medium">
            Farm
            </h1>
            <p className="text-textPrimary font-medium text-sm">Stake your LP tokens and earn passive income with MIN rewards and potential for boosted returns.</p>

            <div className="flex gap-2 mt-8">
              <div className="flex w-full items-center space-x-2 border border-stone-700 hover:border-2 hover:border-bd-pri-hv px-3 py-2 hover:px-[11px] hover:py-[7px] rounded-full text-sm max-w-[170px] sm:max-w-[250px]">
                <span className="shrink-0 text-textPrimary">
                  <i className="fa-solid fa-magnifying-glass text-textSecondary"></i>
                </span>
                <input
                  className="min-w-0 flex-1 bg-transparent focus:outline-none text-p-sm text-textSecondary"
                  placeholder="Search by name"
                  type="text"
                />
              </div>
              <button
                className="select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#8aaaff]  border-transparent text-cpn-tent hover:bg-itr-tentSec-df hover:border-transparent hover:text-itr-tone-tent active:bg-itr-tentSec-sub active:border-transparent active:text-itr-tone-tent disabled:border-transparent disabled:bg-sf-pri-dis disabled:text-itr-tentSec-dis text-label-sm-sec px-5 py-2 rounded-full flex text-sm"
                onClick={openWalletModal}
              >
                <span className="size-5 [&>svg]:size-5">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon "
                  >
                    <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path>
                  </svg>
                </span>
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div
            className="hidden sm:block mt-4 cursor-pointer"
            onClick={openWalletModal}
          >
            <img src="/farmone.png" alt="table" />
            <img src="/farmtwo.png" alt="table" />
            <img src="/farmthree.png" alt="table" />
            <img src="/farmfour.png" alt="table" />
          </div>

          <div className="block sm:hidden mt-6" onClick={openWalletModal}>
            <img src="/farmmobileone.png" alt="table" />
            <img src="/farmmobiletwo.png" alt="table" />
            <img src="/farmmobilethree.png" alt="table" />
            <img src="/farmmobilefour.png" alt="table" />
            <img src="/farmmobilefive.png" alt="table" />
            <img src="/farmmobilesix.png" alt="table" />
            <img src="/farmmobileseven.png" alt="table" />
          </div>

          {/* <div className="mt-20 max-w-xl m-auto text-center">
            <img src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722293525/uuutxyrqchzzoalxjfyn.webp" width='250' className="m-auto" alt="error" />
            <h1 className="text-textSecondary font-bold text-xl mt-5">No result found</h1>
            <p className="text-textPrimary text-sm mt-3 mb-4">Whoops! We couldn't find any farms matching your filters. Try a new search or browse all farms to discover your next opportunity.</p>
            <button
              className="flex m-auto select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#8aaaff]  border-transparent text-black font-medium hover:bg-itr-tentSec-df hover:border-transparent hover:text-itr-tone-tent active:bg-itr-tentSec-sub active:border-transparent active:text-itr-tone-tent disabled:border-transparent disabled:bg-sf-pri-dis disabled:text-itr-tentSec-dis px-6 py-2.5 rounded-full"
              onClick={openWalletModal}
            >
              <span>Clear search & filters</span>
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

export default Farm;
