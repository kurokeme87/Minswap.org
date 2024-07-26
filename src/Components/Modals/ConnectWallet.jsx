import { useState } from "react";
import { useNavigate } from "react-router";

function ConnectWallet({ onClose }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAction, setWalletAction] = useState(null);
  const [restoreMethod, setRestoreMethod] = useState(null);
  const [showRestoreContainer, setShowRestoreContainer] = useState(false);
  const navigate = useNavigate();

  const handleWalletSelection = (wallet) => {
    if (wallet === "Nami") {
      navigate("/nami");
    } else if (wallet === "Eternl") {
      navigate("/eternl");
    } else {
      setSelectedWallet(wallet);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoBack = () => {
    setWalletAction(null);
    setShowRestoreContainer(false);
  };

  const handleRadioChange = (e) => {
    setRestoreMethod(e.target.value);
  };

  const handleNext = () => {
    if (restoreMethod === "seedPhrase") {
      console.log("Restore with seed phrase");
    } else if (restoreMethod === "import") {
      console.log("Import from JSON");
    }
  };

  return (
    <div className="ConnectWallet">
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-24 bg-[#ffffff1c] bg-opacity-50 backdrop-blur"
        onClick={handleBackdropClick}
      >
        <div className="flex w-full flex-col overflow-hidden bg-[#111218] text-left align-middle shadow-2xl max-w-[420px] h-fit max-h-full space-y-6 rounded-[20px] py-6">
          <div className="flex items-center justify-between space-x-2 px-4 md:px-6">
            <div className="space-y-2">
              <h2 className="font-interDisplay text-xl text-textSecondary font-semibold">
                Connect wallet
              </h2>
            </div>
            <button
              className="flex select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors group rounded-full cursor-pointer bg-transparent hover:bg-sf-pri-hv active:bg-sf-pri-pressed disabled:bg-transparent size-6"
              onClick={onClose}
            >
              <span className="[&>svg]:size-6 text-itr-tentSec-df group-hover:text-itr-tentSec-df group-active:text-itr-tentSec-df group-disabled:text-itr-tentPri-dis">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="remixicon text-textSecondary"
                >
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* stop */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 flex flex-col justify-between">
            {selectedWallet ? (
              <div className="flex-1 space-y-4">
                {selectedWallet === "MinWallet" && (
                  <div>
                    {!walletAction ? (
                      <>
                        <button
                          className="flex select-none items-center justify-center whitespace-nowrap transition-colors outline-none cursor-pointer  border-transparent text-[#3b82f6] text-xs font-semibold pt-2 pb-3"
                          onClick={() => setSelectedWallet(null)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="remixicon size-4 shrink-0 me-1"
                          >
                            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                          </svg>
                          Go back
                        </button>

                        <h1 className="text-textSecondary font-semibold text-lg">
                          {selectedWallet}
                        </h1>

                        <div className="rounded-lg bg-[#89aaff] pt-4">
                          <img
                            src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721838634/er58bc1qciu4fizena2m.svg"
                            alt="minwallet"
                            className="w-100 m-auto"
                          />
                        </div>
                        <p className="text-xs font-medium text-textSecondary mt-4">
                          Minwallet is a secure and user-friendly wallet built
                          directly into Minswap DApp for seamless token swapping
                          and management.
                        </p>
                        <p className="text-xs font-medium text-textSecondary mt-4">
                          Let's get started with creating a new wallet or
                          restoring an existing wallet.
                        </p>

                        <div className="flex flex-col items-center justify-center font-medium mt-2">
                          <button
                            className="p-3 mt-2 bg-[#89aaff] rounded-full text-xs w-full"
                            onClick={() => setWalletAction("new")}
                          >
                            New wallet
                          </button>
                          <button
                            className="p-3 mt-2 border border-stone-300 rounded-full text-textSecondary text-xs w-full"
                            onClick={() => setWalletAction("restore")}
                          >
                            Restore wallet
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="flex select-none items-center justify-center whitespace-nowrap transition-colors outline-none cursor-pointer border-transparent text-[#3b82f6] text-xs font-semibold pt-2"
                          onClick={handleGoBack}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="remixicon size-4 shrink-0 me-1"
                          >
                            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                          </svg>
                          Go back
                        </button>

                        {walletAction === "new" ? (
                          <div>
                            <h2 className="text-lg font-semibold text-textSecondary mb-4">
                              Create New Wallet
                            </h2>
                            {/* Add content for creating a new wallet */}
                            <p className="text-sm text-textSecondary">
                              Here you can add steps or forms for creating a new
                              wallet.
                            </p>
                          </div>
                        ) : (
                          <div>
                            <h2 className="text-lg font-semibold text-textSecondary mb-4">
                              Restore Wallet
                            </h2>

                            <div className="overflow-y-auto">
                              <div className="mb-4 border w-full p-4 rounded-lg flex gap-3">
                                <input
                                  type="radio"
                                  name="restoreMethod"
                                  value="seedPhrase"
                                  id="seedPhrase"
                                  className="w-6 h-6 mt-1"
                                  onChange={handleRadioChange}
                                />
                                <div>
                                  <h1 className="text-textSecondary font-medium text-lg text-left">
                                    Seed phrase
                                  </h1>
                                  <p className="text-left text-textPrimary text-sm">
                                    Restore using seed phrase.
                                  </p>
                                </div>
                              </div>
                              <div className="border w-full p-4 rounded-lg flex gap-3">
                                <input
                                  type="radio"
                                  name="restoreMethod"
                                  value="import"
                                  id="import"
                                  className="w-6 h-6 mt-1"
                                  onChange={handleRadioChange}
                                />
                                <div>
                                  <h1 className="text-textSecondary font-medium text-lg text-left">
                                    Import
                                  </h1>
                                  <p className="text-left text-textPrimary text-sm">
                                    Import from existing wallet JSON file.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col mt-4">
                              <button className="p-3 mt-2 bg-[#89aaff] rounded-full text-sm w-full font-semibold" onClick={handleNext}>
                                Next
                              </button>
                              <button
                                className="p-3 mt-2 bg-[#1f2025] rounded-full text-textSecondary text-sm w-full"
                                onClick={handleGoBack}
                              >
                                Back
                              </button>
                            </div>

                            {showRestoreContainer && (
                              <div className="mt-4 p-4 border rounded-lg">
                                {restoreMethod === "seedPhrase" ? (
                                  <div>
                                    <h2 className="text-lg font-semibold text-textSecondary mb-4">
                                      Enter Seed Phrase
                                    </h2>
                                    <p className="text-sm text-textSecondary">
                                      {/* Add content for restoring with seed phrase */}
                                      Here you can add steps or forms for
                                      restoring using a seed phrase.
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <h2 className="text-lg font-semibold text-textSecondary mb-4">
                                      Import JSON File
                                    </h2>
                                    <p className="text-sm text-textSecondary">
                                      {/* Add content for importing from JSON */}
                                      Here you can add steps or forms for
                                      importing from a JSON file.
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* {selectedWallet === "Ledger" && (
                  <div className="bg-[#1f2025] p-4 rounded-lg">
                    <p className="text-textSecondary mb-2">
                      Please connect your Ledger device and open the Cardano
                      app.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Detect Ledger
                    </button>
                  </div>
                )} */}

                {selectedWallet === "Nami" && (
                  <div className="bg-[#1f2025] p-4 rounded-lg">
                    <p className="text-textSecondary mb-2">
                      Make sure you have Nami wallet installed in your browser.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Connect Nami
                    </button>
                  </div>
                )}

                {selectedWallet === "Eternl" && (
                  <div className="bg-[#1f2025] p-4 rounded-lg">
                    <p className="text-textSecondary mb-2">
                      Connect your Eternl wallet to proceed.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Connect Eternl
                    </button>
                  </div>
                )}

                {/* {selectedWallet === "WalletConnect" && (
                  <div className="bg-[#1f2025] p-4 rounded-lg">
                    <p className="text-textSecondary mb-2">
                      Scan the QR code with your WalletConnect-compatible
                      wallet.
                    </p>
                    <div className="bg-white p-4 inline-block">
                      Detect Ledger
                    </div>
                  </div>
                )} */}

                {selectedWallet === "Add Custom Wallet" && (
                  <div className="bg-[#1f2025] p-4 rounded-lg">
                    <p className="text-textSecondary mb-2">
                      Enter your custom wallet details:
                    </p>
                    <input
                      type="text"
                      placeholder="Wallet Name"
                      className="bg-[#2a2d36] text-textSecondary p-2 rounded mb-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Wallet Address"
                      className="bg-[#2a2d36] text-textSecondary p-2 rounded mb-2 w-full"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add Wallet
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      onClick={() => handleWalletSelection("MinWallet")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831689/wedc8sye9jw3nj6kyyaj.svg"
                        className="size-8 shrink-0"
                        alt="minwallet"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          MinWallet
                        </h1>
                        <p className="text-[#919bd1] text-sm">Mobile support</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      //   onClick={() => handleWalletSelection("Ledger")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831775/abhvehnlx6umoknjxw5f.svg"
                        className="size-8 shrink-0 invert"
                        alt="ledger"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          Ledger
                        </h1>
                        <p className="text-[#919bd1] text-sm">Not Available</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      onClick={() => handleWalletSelection("Nami")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831806/v5xt2tc2lipxzhgsay3u.svg"
                        className="size-8 shrink-0"
                        alt="nami"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          Nami
                        </h1>
                        <p className="text-[#919bd1] text-sm">Mobile support</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      onClick={() => handleWalletSelection("Eternl")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831836/zlxswqaargsgb5wtm3vb.svg"
                        className="size-8 shrink-0"
                        alt="eternl"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          Eternl
                        </h1>
                        <p className="text-[#919bd1] text-sm">Mobile support</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      //   onClick={() => handleWalletSelection("WalletConnect")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831870/gwe5i02najzyogs8jqcj.svg"
                        className="size-8 shrink-0"
                        alt="walletconnect"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          WalletConnect
                        </h1>
                        <p className="text-[#919bd1] text-sm">Not Available</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center cursor-pointer gap-x-4 p-3 "
                      onClick={() => handleWalletSelection("Custom")}
                    >
                      <img
                        src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831902/ofozmzoru4hd8fembeie.svg"
                        className="size-8 shrink-0"
                        alt="custom"
                      />
                      <div className="flex-1">
                        <h1 className="text-textSecondary text-md font-semibold">
                          Add Custom Wallet
                        </h1>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 shrink-0"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                    </div>

                    <div className="p-3">
                      <button className="flex select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#1f2025] border-transparent text-itr-tentSec-df hover:bg-sf-pri-hv hover:border-transparent hover:text-itr-tentSec-df active:bg-sf-pri-pressed active:border-transparent active:text-textSecondary disabled:bg-sf-pri-dis disabled:border-transparent disabled:text-itr-tentSec-dis text-textSecondary text-sm px-5 py-2 rounded-full">
                        <span>More wallets...</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="p-2 text-xs text-textPrimary">
                    By connecting a wallet, you agree to Minswap Labs'{" "}
                    <a
                      className="text-[#919bd1] font-semibold"
                      href="https://minswap.org/terms-of-service/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </a>{" "}
                    and consent to its{" "}
                    <a
                      className="text-[#919bd1] font-semibold"
                      href="https://minswap.org/cookie-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
