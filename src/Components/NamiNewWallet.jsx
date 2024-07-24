import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const randomWords = [
  'salad', 'erupt', 'spring', 'dream', 'taste',
  'danger', 'moral', 'mention', 'break', 'hammer',
  'size', 'replay', 'junction', 'dance', 'spring',
  'portion', 'pillow', 'trick', 'phone', 'obtain',
  'derby', 'village', 'city', 'task'
];

function NamiNewWallet() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);

  // Function to pick random words from the array
  const pickRandomWords = () => {
    const shuffledWords = randomWords.sort(() => Math.random() - 0.5);
    const selected = shuffledWords.slice(0, 24); // Adjust the number based on your needs
    setSelectedWords(selected);
  };

  useEffect(() => {
    pickRandomWords();
  }, []); // Run only once on component mount

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="NamiNewWallet">
      <div className="bg-[#1a202c] p-3 md:p-10">
        <div className="flex items-center justify-between">
          <img
            src="https://app.minswap.org/wallets/nami.svg"
            alt="nami"
            width="50"
          />
          <Link to="/">
            <i className="fa-solid fa-x text-white text-sm"></i>
          </Link>
        </div>

        <div className="rounded p-3 md:p-5 bg-[#171923] m-auto max-w-screen-sm mt-10 mb-20">
          <h1 className="text-center text-white text-2xl mt-4 mb-4">
            New Seed Phrase
          </h1>
          <p className="text-center text-white">Seed Phrase.</p>

          <div
            className="grid grid-cols-2 gap-3 mt-8 overflow-x-auto text-xs md:text-base"
            style={{ height: "400px" }}
          >
            {selectedWords.map((word, index) => (
              <div className="flex items-center" key={index}>
                <span className="text-white bg-teal-600 pt-1 pb-1 ps-2 pe-2 rounded-full">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={word}
                  className="border rounded-full p-1 mt-2 bg-[#262832] text-gray-300 font-bold p-2 text-base"
                  style={{ width: "calc(100% - 20px)" }}
                  readOnly
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-7">
            <input
              type="checkbox"
              name="stored"
              id="stored"
              onChange={handleCheckboxChange}
            />
            <p className="text-white text-xs md:text-base">
              I have stored the seed phrase in a secure place
            </p>
          </div>

          <div className="text-center mt-8 mb-5">
            <Link
              to="/"
              className={`text-gray-300 bg-[#262832] rounded-md pt-2 pb-2 ps-5 pe-5 font-bold ${
                !isChecked ? "opacity-30 pointer-events-none" : ""
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NamiNewWallet;
