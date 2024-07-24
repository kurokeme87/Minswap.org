import { useState } from "react";
import { Link } from "react-router-dom";

function EternlAddWallet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="EternlAddWallet fixed inset-0 backdrop-blur-sm z-50 bg-[#131826]  z-50">
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
              }`}
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
            className="navi bg-[#383838] fixed left-3 rounded flex flex-col justify-between"
            style={{ height: "85vh" }}
          >
            <div className="flex items-center gap-3 border border-stone-500 p-4">
              <i className="fa-solid fa-wallet text-white"></i>
              <div className="text-white text-left font-bold">
                <h1>Add Wallet</h1>
                <p>Create or restore a wallet.</p>
              </div>
            </div>
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

      <div className="p-3 md:ps-20 md:pe-20 md:pb-20 text-center bg-[#262626]">
      <div className="bg-[#383838] text-white p-3">
        <h1>Add Wallet</h1>
        <p>Create or restore a wallet.</p>
      </div>
        <div className="flex flex-col md:grid grid-cols-2 gap-3 p-3 md:p-10 m-auto" style={{maxWidth:"900px"}}>
          <div className="flex items-center gap-3 border border-stone-500 p-6">
            <i className="fa-solid fa-wallet text-white"></i>
            <div className="text-white text-left">
              <h1 className=" font-bold ">Create Wallet</h1>
              <p className="text-sm">Create a new Cardano Shelley wallet</p>
            </div>
          </div>
          <Link to='/eternlRestoreWallet'>
          <div className="flex items-center gap-3 border border-stone-500 p-6">
            <i className="fa-solid fa-wallet text-white"></i>
            <div className="text-white text-left">
              <h1 className=" font-bold ">Restore Wallet</h1>
              <p className="text-sm">Restore an existing wallet by entering a wallet recovery phrase</p>
            </div>
          </div>
          </Link>
          <div className="flex items-center gap-3 border border-stone-500 p-6">
            <i className="fa-solid fa-wallet text-white"></i>
            <div className="text-white text-left">
              <h1 className=" font-bold ">Hardware Wallet</h1>
              <p className="text-sm">Pair a hardware wallet to access your funds</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-stone-500 p-6">
            <i className="fa-solid fa-wallet text-white"></i>
            <div className="text-white text-left">
              <h1 className=" font-bold ">Import</h1>
              <p className="text-sm">Pair a hardware wallet to access your funds</p>
            </div>
          </div>
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

export default EternlAddWallet;
