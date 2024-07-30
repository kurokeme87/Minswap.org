import { Link } from "react-router-dom";
import { useState } from "react";
import ConnectWallet from "./Modals/ConnectWallet";

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="MobileNav fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-[#111218] w-full shrink-0 sm:hidden text-xs">
        <div className="flex items-center bg-[#ffffff0a]">
          <Link
            className="space-y-0.5 p-2 text-center cursor-pointer flex flex-col items-center text-[#ffffff7a] flex-1"
            to="/app/minswap"
          >
            <div className="relative size-6">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon mx-auto block size-6 shrink-0"
              >
                <path d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z"></path>
              </svg>
            </div>
            <span className="block text-label-xs-sec">Trade</span>
          </Link>
          <Link
            className="space-y-0.5 p-2 text-center cursor-pointer flex flex-col items-center text-[#ffffff7a] flex-1"
            to="/market"
          >
            <div className="relative size-6">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon mx-auto block size-6 shrink-0"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM15.5 8.5L10.5 10.5L8.5 15.5L13.5 13.5L15.5 8.5Z"></path>
              </svg>
            </div>
            <span className="block text-label-xs-sec">Market</span>
          </Link>
          <Link
            className="space-y-0.5 p-2 text-center cursor-pointer flex flex-col items-center text-[#ffffff7a] flex-1"
            to="/farm"
          >
            <div className="relative size-6">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon mx-auto block size-6 shrink-0"
              >
                <path d="M20.998 3V5C20.998 8.86599 17.864 12 13.998 12H12.998V13H17.998V20C17.998 21.1046 17.1026 22 15.998 22H7.99805C6.89348 22 5.99805 21.1046 5.99805 20V13H10.998V10C10.998 6.13401 14.1321 3 17.998 3H20.998ZM5.49805 2C8.02667 2 10.263 3.25136 11.6216 5.1686C10.6026 6.51084 9.99805 8.18482 9.99805 10V11H9.49805C5.35591 11 1.99805 7.64214 1.99805 3.5V2H5.49805Z"></path>
              </svg>
            </div>
            <span className="block text-label-xs-sec">Farm</span>
          </Link>
          <div
            className="space-y-0.5 p-2 text-center cursor-pointer flex flex-col items-center text-[#ffffff7a] flex-1"
            onClick={toggleMenu}
          >
            <div className="relative size-6">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon mx-auto block size-6 shrink-0"
              >
                <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </div>
            <span className="block text-label-xs-sec">Menu</span>
          </div>

          {isMenuOpen && (
            <nav className="bg-[#111217] h-[100vh] text-textSecondary px-5 pt-20 fixed top-0 left-0 right-0 z-[-100]">
              <ul className=" flex flex-col gap-5 text-base">
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
                <Link to="/analytics">
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
          )}
        </div>
      </nav>

       {isWalletModalOpen && <ConnectWallet onClose={closeWalletModal} />}
    </div>
  );
}

export default MobileNav;
