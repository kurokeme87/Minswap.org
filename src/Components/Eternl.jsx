import { useState } from "react";
import { Link } from "react-router-dom";

function Eternl({ closeModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Eternl fixed inset-0 backdrop-blur-sm z-50 bg-[#131826]  z-50">
      <nav className="bg-[#131826] pt-3 ps-3 pe-3 pb-1">
        <div className="flex items-center justify-between">
          <img
            src="https://eternl.io/images/img-logo-small.png"
            className="w-28"
            alt="icon"
          />
          <div className="text-white flex gap-3">
            <i className="fa-solid fa-sync"></i>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-plug"></i>
            <i className="fa-solid fa-sun"></i>
            <i
              className={`fa-solid ${
                isMenuOpen ? "fa-x" : "fa-bars"
              } md:hidden`}
              onClick={handleToggle}
            ></i>
          </div>
        </div>
        <div className="bg-[#404040] p-1 rounded-md">
          <p className="text-center text-gray-300 text-xs font-bold">
            Epoch: 488 : 068453 /432000 ( 15 . 85 % ~4d 04:59:07) · ₳ 1 =
            $0.4497
          </p>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="bg-[#262626] text-center">
          <div
            className="navi bg-[#383838] absolute left-3 rounded flex flex-col justify-between"
            style={{ height: "85vh" }}
          >
           <Link to="/eternlAddWallet">
           <div className="flex items-center gap-3 border border-stone-500 p-4">
              <i className="fa-solid fa-wallet text-white"></i>
              <div className="text-white text-left font-bold">
                <h1>Add Wallet</h1>
                <p>Create or restore a wallet.</p>
              </div>
            </div>
           </Link>
            <div>
              <div>
                <div className="flex items-center gap-3 border border-stone-500 p-4">
                  <i className="fa-solid fa-plug text-white"></i>
                  <div className="text-white text-left font-bold">
                    <h1>DApp browser</h1>
                    <p>Connect to Cardano wallet.</p>
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 md:p-20 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-5">
          Eternl
        </h1>
        <h2 className="text-lg md:text-3xl text-[#4ade80] font-bold mb-5">
          A Cardano light wallet.
        </h2>
        <p
          className="text-white text-md md:text-xl m-auto text-center"
          style={{ maxWidth: "800px" }}
        >
          Our Mission: Establish Eternl as one of the major Cardano wallets by
          implementing features requested by the Cardano community.
        </p>

        <div className="flex items-center gap-3 justify-center text-center p-4 font-bold">
          <Link to="/eternlAddWallet"className="bg-[#646f7e] text-white pt-3 pb-3 ps-6 pe-6 md:text-xl rounded-md"> 
            Open Wallet
          </Link>
          <button className="bg-[#383838] text-[#646f7e] pt-3 pb-3 ps-6 pe-6 md:text-xl rounded-md">
            Learn More
          </button>
        </div>
        <div className="mb-12 text-center">
          <p className="text-[#4ade80] text-lg md:text-3xl font-bold">
            Browser Extension (DApp connector & DApp Browser)
          </p>
          <p className="text-white text-lg md:text-3xl">
            For Chrome, Edge, Brave and Opera browser extensions visit:
          </p>
          <p className="text-gray-500 font-bold text-md md:text-xl">
            Chrome Web Store
          </p>
        </div>
        <div className="text-center">
          <p className="text-[#4ade80] text-lg md:text-xl font-bold">
            Mobile Apps (DApp Browser)
          </p>
          <p className="text-white text-lg">
            Your Cardano wallet "to go", now with DApp support:
          </p>
          <p className="text-gray-500 font-bold md:text-lg">
            App Store (iOS) Play Store (Android)
          </p>
        </div>
      </div>
      <footer className="text-white text-center flex items-center justify-center p-1 text-xs gap-2 bg-gradient-to-r from-purple-900 via-purple-500 to-blue-900 mt-10">
        <p>©2024 · v1.12.5 ( web ) · Imprint ·</p>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-telegram"></i>
        <i className="fa-brands fa-discord"></i>
      </footer>
    </div>
  );
}

export default Eternl;
