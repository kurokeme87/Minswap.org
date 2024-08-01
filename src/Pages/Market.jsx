import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import { useState } from "react";
import ConnectWallet from "../Components/Modals/ConnectWallet";

function Market() {
  const [selectedTab, setSelectedTab] = useState("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="Market">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[130px] pb-[100px] px-5 lg:px-0">
          <h1 className="text-sm text-textPrimary font-medium">
            Home / <span className="text-textSecondary">Market</span>
          </h1>
          <div className="mt-6">
            <h1 className="text-3xl text-textSecondary font-semibold">
              Explore the Cardano ecosystem
            </h1>
            <p className="text-textPrimary text-sm font-medium mt-1">
              Uncover insights and dynamics of the Cardano ecosystem beyond mere
              pricing.
            </p>
          </div>

          <div className="max-w-[240px]">
            <div className="flex justify-between mt-6 bg-[#1f2025] py-1 px-1 rounded-full text-sm font-semibold">
              <div className="flex items-center gap-1  text-textSecondary bg-[#111316] px-3 py-1 rounded-full">
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99996 4C9.63177 4 9.33329 4.29848 9.33329 4.66667C9.33329 5.03486 9.63177 5.33333 9.99996 5.33333H13.0571L8.94947 9.44102C8.80968 9.5808 8.73283 9.65692 8.67338 9.70739L8.66663 9.71306L8.65987 9.70739C8.60042 9.65692 8.52357 9.5808 8.38378 9.44101L6.54391 7.60114C6.42496 7.48216 6.30909 7.36626 6.20295 7.27616C6.08639 7.1772 5.93846 7.07082 5.74532 7.00807C5.47752 6.92106 5.18906 6.92106 4.92127 7.00807C4.72813 7.07082 4.5802 7.1772 4.46363 7.27616C4.35749 7.36627 4.24164 7.48215 4.12268 7.60113L0.861888 10.8619C0.601539 11.1223 0.601539 11.5444 0.861888 11.8047C1.12224 12.0651 1.54435 12.0651 1.8047 11.8047L5.05045 8.55899C5.19023 8.4192 5.26709 8.34308 5.32654 8.29261L5.33329 8.28694L5.34005 8.29261C5.3995 8.34308 5.47635 8.4192 5.61613 8.55898L7.45602 10.3989C7.57498 10.5179 7.69083 10.6337 7.79697 10.7238C7.91353 10.8228 8.06146 10.9292 8.2546 10.9919C8.52239 11.0789 8.81086 11.0789 9.07865 10.9919C9.27179 10.9292 9.41972 10.8228 9.53628 10.7238C9.64243 10.6337 9.75828 10.5178 9.87724 10.3989L14 6.27614V9.33333C14 9.70152 14.2984 10 14.6666 10C15.0348 10 15.3333 9.70152 15.3333 9.33333V4.66667C15.3333 4.29848 15.0348 4 14.6666 4H9.99996Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>Top gains</p>
              </div>

              <div className="flex items-center gap-1  text-textPrimary  px-3 py-1">
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.80474 4.19526C1.54439 3.93491 1.12228 3.93491 0.861926 4.19526C0.601577 4.45561 0.601577 4.87772 0.861926 5.13807L4.12271 8.39886C4.24167 8.51785 4.35753 8.63373 4.46367 8.72384C4.58024 8.8228 4.72816 8.92918 4.92131 8.99193C5.1891 9.07894 5.47756 9.07894 5.74535 8.99193C5.9385 8.92918 6.08643 8.8228 6.20299 8.72384C6.30913 8.63373 6.42498 8.51785 6.54394 8.39887L8.38382 6.55899C8.5236 6.4192 8.60046 6.34308 8.65991 6.29261L8.66666 6.28694L8.67342 6.29261C8.73287 6.34308 8.80972 6.4192 8.94951 6.55898L13.0572 10.6667H10C9.63181 10.6667 9.33333 10.9651 9.33333 11.3333C9.33333 11.7015 9.63181 12 10 12H14.6667C15.0349 12 15.3333 11.7015 15.3333 11.3333V6.66667C15.3333 6.29848 15.0349 6 14.6667 6C14.2985 6 14 6.29848 14 6.66667V9.72386L9.87728 5.60114C9.75832 5.48215 9.64246 5.36627 9.53632 5.27616C9.41976 5.1772 9.27183 5.07082 9.07869 5.00807C8.81089 4.92106 8.52243 4.92106 8.25464 5.00807C8.0615 5.07082 7.91357 5.1772 7.797 5.27616C7.69087 5.36626 7.57503 5.48213 7.45608 5.60111L5.61617 7.44102C5.47639 7.5808 5.39953 7.65692 5.34009 7.70739L5.33333 7.71306L5.32657 7.70739C5.26713 7.65692 5.19027 7.5808 5.05049 7.44102L1.80474 4.19526Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>Top dips</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block mt-6" onClick={openWalletModal}>
            <img src="/list.png" alt="list" />
          </div>
          <div className="block sm:hidden mt-4" onClick={openWalletModal}>
            <img src="/listmobile.png" alt="list" />
          </div>

          <div className="space-y-2 mt-20">
            <h2 className="text-textSecondary text-xl font-semibold">
              Crypto prices
            </h2>
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <div className=" space-y-4 bg-base-bg py-2 lg:top-[78px] lg:pt-4">
                  <div className="flex items-center justify-between space-x-2 bg-[#111217] py-2">
                    {/* Tab Selection */}
                    <div className="relative z-0 inline-flex items-center gap-x-1 rounded-full p-1 bg-[#1f2025] text-sm">
                      {["Tokens", "Pools"].map((tab) => (
                        <label key={tab.toLowerCase()} className="z-[1] flex-1">
                          <span
                            className={`relative flex flex-1 cursor-pointer items-center justify-center gap-x-1 whitespace-nowrap rounded-full px-3 py-1 text-center font-medium  ${
                              selectedTab === tab.toLowerCase()
                                ? "text-textSecondary bg-[#111316]"
                                : "text-textPrimary"
                            }`}
                            onClick={() => setSelectedTab(tab.toLowerCase())}
                          >
                            {tab}
                          </span>
                          <input
                            type="radio"
                            name="tab"
                            value={tab.toLowerCase()}
                            checked={selectedTab === tab.toLowerCase()}
                            onChange={() => setSelectedTab(tab.toLowerCase())}
                            className="sr-only"
                          />
                        </label>
                      ))}
                      <div
                        className="absolute left-1 top-1 h-7 w-[72px] rounded-full bg-base-bg transition-all duration-200"
                        style={{
                          transform: `translateX(${
                            selectedTab === "pools" ? "100%" : "0"
                          })`,
                        }}
                      ></div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex min-w-0 flex-1 items-center justify-end space-x-2 ">
                      <div className="space-y-1 rounded-full max-w-[280px] w-full flex-1 min-w-0 hidden lg:block">
                        <div className="flex w-full items-center space-x-2 border border-stone-700 hover:border-2 hover:border-bd-pri-hv px-3 py-2 hover:px-[11px] hover:py-[7px] rounded-full text-sm">
                          <span className="shrink-0 text-textPrimary">
                            <i className="fa-solid fa-magnifying-glass text-textSecondary"></i>
                          </span>
                          <input
                            className="min-w-0 flex-1 bg-transparent focus:outline-none text-p-sm text-textSecondary"
                            placeholder="Search by token name"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="relative">
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
                        <div className="absolute -right-1.5 top-0 flex size-5 items-center justify-center rounded-full bg-[#e6eaff] lg:-right-1 lg:-top-2">
                          <span className="text-xs text-itr-tone-tent">1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Headers */}
                  <div className="hidden sm:block cursor-pointer"  onClick={openWalletModal}>
                    <img src="/market.png" alt="table" />
                    <img src="/markettwo.png" alt="table" />
                  </div>

                  <div className="block sm:hidden"  onClick={openWalletModal}>
                    <img src="/marketmobile.png" alt="table" />
                    <img src="/marketmobiletwo.png" alt="table" />
                    <img src="/marketmobilethree.png" alt="table" />
                  </div>
                </div>

                

                {/* No Results */}
                {/* <div className="flex flex-col items-center gap-y-4 p-6 lg:gap-y-6 lg:p-10">
                  <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 p-0 lg:p-0">
                    <img
                      alt="Empty background"
                      className="size-[156px]"
                      src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722249594/uovnus4svzyn3qitbomo.webp"
                    />
                    <div className="flex flex-col items-center gap-y-2 text-center">
                      <div className="font-semibold text-xl text-textSecondary">
                        No result found
                      </div>
                      <div className="text-sm text-textPrimary lg:max-w-[600px]">
                        There is no result found, try adjust filter
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#8aaaff]  border-transparent text-black font-medium hover:bg-itr-tentSec-df hover:border-transparent hover:text-itr-tone-tent active:bg-itr-tentSec-sub active:border-transparent active:text-itr-tone-tent disabled:border-transparent disabled:bg-sf-pri-dis disabled:text-itr-tentSec-dis px-6 py-2.5 rounded-full"
                    onClick={openWalletModal}
                  >
                    <span>Clear search</span>
                  </button>
                </div> */}
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

export default Market;
