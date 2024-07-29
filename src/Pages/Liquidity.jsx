import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { useState } from "react";

function Liquidity() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };
  return (
    <div className="Liquidity">
      <div>
        <Navigation />
        <div className="max-w-screen-xl m-auto">
          <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
            <div className="mt-6">
              <h1 className="text-3xl text-textSecondary font-semibold">
                Liquidity
              </h1>
              <p className="text-textPrimary text-sm font-medium mt-1">
                Add liquidity to earn yield
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between mt-6 sm:mt-20">
              <div className="max-w-[800px] w-full">
                <img
                  src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1722295305/g2jidqd4kvkoo4dlb566.webp"
                  alt="error"
                  width="200"
                  className="m-auto"
                />
                <p className="text-textSecondary text-center mt-3 text-xl font-semibold">
                  No position
                </p>
                <p className="text-textPrimary text-center mt-3 text-sm font-semibold">
                  You have no LP positions
                </p>
              </div>
              <div className="my-6 max-w-md w-full m-auto md:m-0">
                <div className="p-3 border border-stone-700 rounded-xl drop-shadow-xl">
                  <div className="mb-8 px-3 flex items-center justify-between">
                    <div className="flex items-center text-textPrimary gap-3">
                      <h1 className="text-textSecondary">Deposite</h1>
                      <h1>Zap in</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-gear text-textSecondary text-xl"></i>
                    </div>
                  </div>

                  <div
                    className="border border-stone-700 rounded-xl p-3"
                    onClick={openWalletModal}
                  >
                    <p className="text-left text-textPrimary font-semibold">
                      token
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
                      token
                    </p>
                    <div className="flex justify-between">
                      <div className="text-textPrimary font-semibold">
                        <h1 className="text-3xl">0.0</h1>
                      </div>
                      <div className="flex items-center p-2 rounded-full bg-[#1a1b20]">
                        <div className="rounded-full bg-[#27282e] p-0.5">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="text-textSecondary size-5 "
                          >
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                          </svg>
                        </div>
                        <h1 className="text-textSecondary font-semibold ms-2 me-2">
                          Select token
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
          </div>
        </div>
        <MobileNav />
        <Footer />
      </div>
    </div>
  );
}

export default Liquidity;
