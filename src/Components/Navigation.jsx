import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "./Modals/ConnectWallet";

function Navigation() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navRef = useRef(null);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navRef.current.classList.add("nav-shadow");
      } else {
        navRef.current.classList.remove("nav-shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="Navigation">
      <div
        className="bg-primaryColor fixed left-0 right-0 p-3 md:p-5 z-[200]"
        ref={navRef}
      >
        <div className="max-w-screen-2xl m-auto z-100">
          <div className="flex items-center justify-between px-2 md:px-4">
            <div className="flex items-center gap-6">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721491707/xqjsie1x0o884byjfbmz.svg"
                  alt="logo"
                  className="w-10 sm:w-7"
                />
              </Link>
              <div className="hidden lg:flex justify-between lg:gap-3 text-textPrimary font-semibold">
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-3 py-2 rounded-full">
                  <Link to="/app/minswap">Trade</Link>
                </div>
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-3 py-2 rounded-full">
                  <Link to="/market">Market</Link>
                </div>
                <div className="group hover:bg-[#303137] px-3 py-2 rounded-full">
                  <Link
                    to="/"
                    className="flex items-center hover:text-[#a3b7ea] duration-100"
                  >
                    Earn
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      data-slot="icon"
                      className="size-4 duration-300 group-hover:rotate-180"
                    >
                      hover:bg-[#303137]
                      <path d="M12 16L6 10H18L12 16Z"></path>
                    </svg>
                  </Link>

                  <div className="absolute hidden group-hover:block mt-[10px] ms-[-10px] border border-stone-800 rounded-xl bg-[#111217] max-w-[150px] w-full">
                    <ul className="flex flex-col justify-evenly text-sm">
                      <Link to="/farm">
                        <li className="border-b border-stone-800 pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] rounded-t-xl flex items-center gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="24"
                            fill="currentColor"
                            className=" block size-4 shrink-0"
                          >
                            <path d="M20.998 3V5C20.998 8.86599 17.864 12 13.998 12H12.998V13H17.998V20C17.998 21.1046 17.1026 22 15.998 22H7.99805C6.89348 22 5.99805 21.1046 5.99805 20V13H10.998V10C10.998 6.13401 14.1321 3 17.998 3H20.998ZM5.49805 2C8.02667 2 10.263 3.25136 11.6216 5.1686C10.6026 6.51084 9.99805 8.18482 9.99805 10V11H9.49805C5.35591 11 1.99805 7.64214 1.99805 3.5V2H5.49805Z"></path>
                          </svg>
                          Farm
                        </li>
                      </Link>
                      <Link to="/staking">
                        <li className="border-b border-stone-800 pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] flex items-center gap-2">
                          <i className="fa-solid fa-coins"></i>
                          Staking
                        </li>
                      </Link>
                      <Link to="/liquidity">
                        <li className="pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] rounded-b-xl flex items-center gap-2">
                          <i className="fa-solid fa-droplet"></i>
                          Liquidity
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>

                <div className="group hover:bg-[#303137] px-5 py-2 rounded-full">
                  <Link to="/" className=" hover:text-[#a3b7ea] duration-100">
                    <i className="fa-solid fa-ellipsis"></i>
                  </Link>

                  <div className="absolute hidden group-hover:block mt-[10px] ms-[-18px] border border-stone-800 rounded-xl bg-[#111217] max-w-[150px] w-full">
                    <ul className="flex flex-col justify-evenly text-sm">
                      <Link to="/analytics">
                        <li className="border-b border-stone-800 pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] rounded-t-xl flex items-center gap-2">
                          <i className="fa-solid fa-chart-simple text-xs"></i>
                          Analytics
                        </li>
                      </Link>
                      <Link to="/launch-bowl">
                        <li className="border-b border-stone-800 pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] flex items-center gap-2">
                          <i className="fa-solid fa-rocket text-xs"></i>
                          Launch Bowl
                        </li>
                      </Link>
                      <Link to="/governance">
                        <li className="pt-2 pb-2 px-3 hover:text-[#a3b7ea] duration-100 hover:bg-[#303137] rounded-b-xl flex items-center gap-2">
                          <i className="fa-solid fa-warehouse text-xs"></i>
                          Governance
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:max-w-[400px] lg:max-w-[300px] w-full">
              <div className="hidden lg:flex items-center justify-between cursor-text border border-stone-700 hover:border-[2px] rounded-full px-4 py-2 w-full">
                <div className="flex items-center flex-grow">
                  <i className="fa-solid fa-magnifying-glass text-textSecondary"></i>
                  <input
                    type="text"
                    className="text-textSecondary placeholder-textPrimary font-medium bg-primaryColor w-100 outline-none ms-3"
                    placeholder="Search by ticker, token, pair"
                  />
                </div>
                <div className="bg-[#303137] px-2 py-1 rounded-lg ml-2">
                  {" "}
                  <svg
                    className="text-textPrimary"
                    fill="none"
                    height="14"
                    viewBox="0 0 6 14"
                    width="6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.77575 0.0341187L2.02575 13.9659H0.224609L3.97461 0.0341187H5.77575Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5">
              <i className="fa-solid fa-magnifying-glass text-textSecondary text-xl lg:hidden"></i>
              <div className="hidden lg:block hover:bg-[#303137] duration-100 px-3 py-2 rounded-full">
                <i className="fa-solid fa-gear text-textSecondary text-xl"></i>
              </div>
              <button
                className="bg-[#8aaaff] hover:bg-textSecondary duration-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base"
                onClick={openWalletModal}
              >
                <i className="fa-solid fa-wallet text-[#030b25] text-lg me-2 hidden lg:inline"></i>{" "}
                Connect <span className="hidden lg:inline">Wallet</span>
              </button>

              {isWalletModalOpen && (
                <ConnectWallet onClose={closeWalletModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden sm:hidden">
        <ul className="bg-[#111217] h-[100vh] text-textSecondary px-5 pt-20 flex flex-col gap-5">
          <li
            className="flex items-center justify-between"
            onClick={openWalletModal}
          >
            Connect Wallet
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="remixicon size-5 shrink-0"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </li>
          <Link to="/liquidity">
            <li className="flex items-center justify-between">
              Liquidity
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
          <Link to="/staking">
            <li className="flex items-center justify-between">
              Staking
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
          <Link to="/launch-bowl">
            <li className="flex items-center justify-between">
              Launch Bowl
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
          <Link to="/governance">
            <li className="flex items-center justify-between">
              Governance
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
          <Link to="analytics">
            <li className="flex items-center justify-between">
              Analytics
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center justify-between">
              Settings
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 shrink-0"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
