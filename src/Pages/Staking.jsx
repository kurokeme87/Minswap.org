import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { useState } from "react";

function Staking() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };
  return (
    <div className="Staking">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
          <div>
            <h1 className="text-textSecondary text-3xl font-medium">
              MIN Staking
            </h1>
            <p className="text-textPrimary font-medium text-sm">
              Stake your MIN today to start earning rewards and boosting your
              portfolio.
            </p>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
            <div className="border border-stone-700  rounded-xl drop-shadow-xl p-4 text-center w-full max-h-[250px]">
              <div className="flex items-center gap-3 justify-center mt-6">
                <div className="border rounded-full p-3 border-stone-700">
                  <img
                    src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831689/wedc8sye9jw3nj6kyyaj.svg"
                    alt="icon"
                    width='28'
                  />
                </div>
                <div className="border rounded-full px-3 py-4 border-stone-700">
                  <img
                    src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831870/gwe5i02najzyogs8jqcj.svg"
                    alt="icon"
                  />
                </div>
                <div className="border rounded-full p-3 border-stone-700">
                  <img
                    src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831902/ofozmzoru4hd8fembeie.svg"
                    alt="icon"
                  />
                </div>
              </div>
              <h1 className="text-textSecondary text-xl font-medium mt-4 mb-3">
                Connect your wallet to Stake
              </h1>
              <p className="text-textPrimary font-medium text-xs mb-3">
                Your wallet needs to be connected to be able to stake or view
                your staked positions
              </p>
              <div className="m-auto max-w-md text-center">
                <button
                  className="bg-[#8aaaff] hover:bg-textSecondary duration-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base"
                  onClick={openWalletModal}
                >
                  <i className="fa-solid fa-wallet text-[#030b25] text-lg me-2 hidden lg:inline"></i>{" "}
                  Connect <span className="hidden lg:inline">Wallet</span>
                </button>
              </div>
            </div>

            <div className="my-6 max-w-md w-full m-auto md:m-0">
              <div className="p-3 border border-stone-700 rounded-xl drop-shadow-xl">
                <div className="mb-8 px-3 flex items-center justify-between">
                  <div className="flex items-center text-textPrimary gap-3">
                    <h1 className="text-textSecondary">Market</h1>
                    <h1>Limit</h1>
                    <h1 className="flex items-center">
                      More{" "}
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        data-slot="icon"
                        className="text-textPrimary size-4 ms-1"
                      >
                        <path d="M12 16L6 10H18L12 16Z"></path>
                      </svg>
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="invert !size-5"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path>
                    </svg>
                    <i className="fa-solid fa-gear text-textSecondary text-xl"></i>
                  </div>
                </div>

                <div
                  className="border border-stone-700 rounded-xl p-3"
                  onClick={openWalletModal}
                >
                  <p className="text-left text-textPrimary font-semibold">
                    You pay
                  </p>
                  <div className="flex justify-between">
                    <div className="text-textPrimary font-semibold">
                      <h1 className="text-3xl">0.0</h1>
                    </div>
                    <div className="flex items-center p-2 rounded-full bg-[#1a1b20]">
                      <img
                        src="https://app.minswap.org/images/assets/cardano.png"
                        className="size-6 me-2"
                        alt="icon"
                      />
                      <h1 className="text-textSecondary font-semibold me-2">
                        ADA
                      </h1>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        data-slot="icon"
                        className="text-textSecondary size-4"
                      >
                        <path d="M12 16L6 10H18L12 16Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="absolute mt-[-20px] z-[1] rounded-full border border-stone-700  p-2 shadow-lg bg-[#111217]">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="remixicon size-5 shrink-0 text-white"
                    >
                      <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                    </svg>
                  </div>
                </div>

                <div
                  className="border border-stone-700 rounded-xl p-3 mt-1"
                  onClick={openWalletModal}
                >
                  <p className="text-left text-textPrimary font-semibold">
                    You receive
                  </p>
                  <div className="flex justify-between">
                    <div className="text-textPrimary font-semibold">
                      <h1 className="text-3xl">0.0</h1>
                    </div>
                    <div className="flex items-center p-2 rounded-full bg-[#1a1b20]">
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722255889/mdosxta1vhvuogxsykst.png"
                        alt="min"
                        width="30"
                      />
                      <h1 className="text-textSecondary font-semibold ms-2 me-2">
                        MIN
                      </h1>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        data-slot="icon"
                        className="text-textSecondary size-4"
                      >
                        <path d="M12 16L6 10H18L12 16Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-1 border border-stone-700 p-3 rounded-xl"
                  onClick={openWalletModal}
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-textPrimary">Select your route</h1>
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      data-slot="icon"
                      className="text-textSecondary size-4"
                    >
                      <path d="M12 16L6 10H18L12 16Z"></path>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-textSecondary mt-2">
                    <p className="text-sm">Most Liquidity</p>
                    <div className="flex items-center gap-1">
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722255895/ehdf8yiie4xtunawwskn.png"
                        alt="min"
                        width="20"
                      />
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textPrimary size-4 shrink-0"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722255889/mdosxta1vhvuogxsykst.png"
                        alt="min"
                        width="20"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="bg-[#8aaaff] hover:bg-textSecondary duration-100 px-3 sm:px-5 py-3 sm:py-3 rounded-full font-medium text-sm sm:text-base w-full mt-3"
                  onClick={openWalletModal}
                >
                  Connect <span className="hidden lg:inline">Wallet</span>
                </button>
              </div>
              {isWalletModalOpen && (
                <ConnectWallet onClose={closeWalletModal} />
              )}
            </div>
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

export default Staking;
