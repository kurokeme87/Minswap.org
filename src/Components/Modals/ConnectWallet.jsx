function ConnectWallet({ onClose }) {

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ConnectWallet">
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-24 bg-black bg-opacity-50 backdrop-blur"  onClick={handleBackdropClick}>
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

          <div className="flex-1 overflow-y-auto px-4 md:px-6 flex flex-col justify-between">
            <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
              <div className="flex-1 space-y-1 overflow-y-auto">
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
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
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
                  <img
                    src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831775/abhvehnlx6umoknjxw5f.svg"
                    className="size-8 shrink-0 invert"
                    alt="ledger"
                  />
                  <div className="flex-1">
                    <h1 className="text-textSecondary text-md font-semibold">
                      Ledger
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
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
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
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
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
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
                  <img
                    src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831870/gwe5i02najzyogs8jqcj.svg"
                    className="size-8 shrink-0"
                    alt="walletconnect"
                  />
                  <div className="flex-1">
                    <h1 className="text-textSecondary text-md font-semibold">
                      WalletConnect
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
                <div className="flex items-center cursor-pointer gap-x-4 p-3 ">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
