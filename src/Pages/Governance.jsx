import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";
import { useState } from "react";
import ConnectWallet from "../Components/Modals/ConnectWallet";
import { Link } from "react-router-dom";

function Governance() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const ExternalLink = ({ href, text, icon }) => {
    return (
      <div
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
        className="group inline-flex shrink-0 cursor-pointer items-center space-x-2 rounded-full border px-4 py-1.5 border-bd-pri-df text-textSecondary font-semibold hover:border-bd-pri-hv hover:border-2 active:border-2 active:text-textSecondary active:border-bd-pri-pressed hover:px-[15px] hover:py-[5px] active:px-[15px] active:py-[5px]"
      >
        <span className="size-4 shrink-0 [&>svg]:size-4 text-textPrimary text-sm group-hover:text-textPrimary text-sm group-active:text-textSecondary">
          {icon === "document" ? (
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="remixicon"
            >
              <path d="M21 9V20.9925C21 21.5511 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.44694 2 3.99826 2H14V8C14 8.55228 14.4477 9 15 9H21ZM21 7H16V2.00318L21 7ZM8 7V9H11V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="remixicon"
            >
              <path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10V12H9V10H7ZM11 10V12H13V10H11ZM15 10V12H17V10H15Z"></path>
            </svg>
          )}
        </span>
        <span className="text-label-sm-sec">{text}</span>
      </div>
    );
  };
  const VoteOption = ({ text, percentage, votes, checked }) => {
    const bgClass = checked
      ? "border border-[#9da7dc]  bg-[#232a3d]"
      : "bg-[#1a1b20]";

    return (
      <div
        className={`flex items-center justify-between space-x-4 rounded-xl p-4 ${bgClass}`}
      >
        {checked && (
          <label className="group flex cursor-pointer items-center gap-x-2 text-label-sm-pri [&>input]:hidden">
            <div className="relative size-6 shrink-0 cursor-pointer border-2 p-0.5 shadow-base border-itr-tone-hl bg-itr-tone-hl text-textSecondary group-hover:border-itr-tone-hl rounded-full">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
              >
                <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
              </svg>
            </div>
          </label>
        )}
        {!checked && <div className="size-5 shrink-0"></div>}
        <div className="flex-1 space-y-2">
          <div className="line-clamp-3 text-label-md-sec md:line-clamp-1">
            {text}
          </div>
        </div>
        <div className="space-y-2 self-start text-right md:self-center">
          <div className="text-textSecondary text-textSecondary">
            {percentage}
          </div>
          <div className="shrink-0 text-p-lg text-textSecondary">{votes}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="Governance">
      <Navigation />
      <div className="max-w-screen-xl m-auto">
        <div className="pt-[80px] sm:pt-[130px] pb-[100px] px-5 lg:px-0">
          <div className="mt-6">
            <h1 className="text-3xl text-textSecondary font-semibold">
              Proposals
            </h1>
            <p className="text-textPrimary text-sm font-medium mt-1">
              Vote on Minswap proposals
            </p>
          </div>
          <div className="max-w-[300px]">
            <div className="flex justify-between mt-6 bg-[#1f2025] py-1 px-1 rounded-full text-sm font-semibold">
              <div className="flex items-center gap-1  text-textSecondary bg-[#111316] px-3 py-1 rounded-full">
                <p>All</p>
              </div>

              <div className="flex items-center gap-1  text-textPrimary  px-3 py-1">
                <p>Active</p>
              </div>
              <div className="flex items-center gap-1  text-textPrimary  px-3 py-1">
                <p>Closed</p>
              </div>
              <div className="flex items-center gap-1  text-textPrimary  px-3 py-1">
                <p>Upcoming</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              className="relative flex w-full flex-col gap-y-4 rounded-2xl border border-bd-pri-sub p-6 shadow-base transition-colors duration-200 hover:cursor-pointer hover:border-2 hover:border-bd-pri-hv hover:p-[23px] hover:shadow-lg active:border-2 active:p-[23px]"
              href="/governance"
            >
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sf-pri-sub p-2">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 shrink-0 text-[#0CD15B]"
                  >
                    <path
                      d="M5.89196 1.20471C5.89196 0.916078 6.13244 0.646274 6.6134 0.395294C7.09436 0.131765 7.7272 0 8.51192 0C9.11944 0 9.5118 0.12549 9.689 0.376471C9.81557 0.552157 9.87885 0.715294 9.87885 0.865882V1.43059C11.3091 1.58118 12.3026 1.84471 12.8595 2.22118C13.0873 2.37176 13.2013 2.51608 13.2013 2.65412C13.2013 3.30667 13.043 4.00941 12.7266 4.76235C12.4229 5.51529 12.1254 5.89176 11.8343 5.89176C11.7837 5.89176 11.6192 5.83529 11.3407 5.72235C10.5054 5.35843 9.80924 5.17647 9.25234 5.17647C8.7081 5.17647 8.33472 5.22667 8.13221 5.32706C7.94236 5.42745 7.84744 5.58431 7.84744 5.79765C7.84744 5.99843 7.98666 6.15529 8.26511 6.26823C8.54356 6.38118 8.88529 6.48157 9.29031 6.56941C9.70798 6.64471 10.1573 6.77647 10.6383 6.96471C11.1319 7.15294 11.5875 7.37882 12.0052 7.64235C12.4229 7.90588 12.7709 8.30118 13.0494 8.82824C13.3278 9.34274 13.467 9.8698 13.467 10.4094C13.467 10.949 13.4164 11.3945 13.3152 11.7459C13.2139 12.0973 13.0367 12.4612 12.7836 12.8376C12.5431 13.2141 12.1697 13.5529 11.6635 13.8541C11.1698 14.1427 10.575 14.3561 9.87885 14.4941V14.7953C9.87885 15.0839 9.63837 15.3537 9.15741 15.6047C8.67645 15.8682 8.04362 16 7.25889 16C6.65137 16 6.25901 15.8745 6.08181 15.6235C5.95525 15.4478 5.89196 15.2847 5.89196 15.1341V14.5694C5.06927 14.4941 4.35416 14.3749 3.74664 14.2118C2.58221 13.898 2 13.5592 2 13.1953C2 12.4925 2.10125 11.7647 2.30376 11.0118C2.50627 10.2463 2.74675 9.86353 3.0252 9.86353C3.07583 9.86353 3.60108 10.0329 4.60097 10.3718C5.60086 10.7106 6.35393 10.88 6.86021 10.88C7.36648 10.88 7.69555 10.8298 7.84744 10.7294C7.99932 10.6165 8.07526 10.4596 8.07526 10.2588C8.07526 10.058 7.93603 9.88863 7.65758 9.75059C7.37913 9.6 7.03107 9.48078 6.6134 9.39294C6.19572 9.3051 5.74008 9.16706 5.24647 8.97882C4.76551 8.79059 4.31619 8.57098 3.89852 8.32C3.48084 8.06902 3.13278 7.69882 2.85433 7.20941C2.57588 6.72 2.43666 6.14902 2.43666 5.49647C2.43666 3.18745 3.58843 1.83843 5.89196 1.44941V1.20471Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 text-label-md-sec text-textSecondary font-semibold">
                  Minswap Team
                </div>
                <div className="group inline-flex shrink-0 items-center space-x-1 rounded-full bg-[#7f1d1d6b] px-4 py-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-red-500Sub"></span>
                  <p className="text-label-xs-sec text-red-500">Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-x-1.5">
                <ExternalLink
                  href="https://cloudflare-ipfs.com/ipfs/QmU9YE4ppi8N8MjGk4FzHiNaeXps8DN72Hzt8Sfqd9UuvB"
                  text="IPFS"
                  icon="document"
                />
                <ExternalLink
                  href="https://forum.minswap.org/t/minswap-v2-fee-structure-and-min-ada-fee-mip-2-1-poll-check/5731"
                  text="Discussion"
                  icon="chat"
                />
              </div>

              <div className="space-y-1">
                <h5 className="font-interDisplay text-title-h5 text-textSecondary font-semibold">
                  Minswap V2 Fee Structure and MIN/ADA Fee
                </h5>
                <span className="text-p-sm text-textPrimary text-sm">
                  Ended at 2024-07-09 10:00 GMT+1
                </span>
              </div>

              <p className="line-clamp-2 text-p-sm text-textPrimary text-sm">
                Background Minswap Labs has been working on Minswap V2 since
                before it was announced in November 2023 at the Cardano Summit.
                This new Smart Contract brings a set of improvements in scaling,
                composability, new features and more which you can find here.
                Deployment of a new Smart contract requires laying out an
                initial plan for how Minswap V2 will work, potential Fee Sharing
                programs and the Fee on MIN/ADA. We desc
              </p>

              <div className="space-y-2.5 text-textSecondary">
                <VoteOption
                  text="Yes, pass this Proposal"
                  percentage="99.96%"
                  votes="223.03M"
                  checked={true}
                />
                <VoteOption
                  text="No, do not pass this Proposal"
                  percentage="0.04%"
                  votes="81.148K"
                  checked={false}
                />
              </div>
            </Link>
          </div>

          <div className="mt-6">
            <Link
              className="relative flex w-full flex-col gap-y-4 rounded-2xl border border-bd-pri-sub p-6 shadow-base transition-colors duration-200 hover:cursor-pointer hover:border-2 hover:border-bd-pri-hv hover:p-[23px] hover:shadow-lg active:border-2 active:p-[23px]"
              href="/governance"
            >
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sf-pri-sub p-2">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 shrink-0 text-[#0CD15B]"
                  >
                    <path
                      d="M5.89196 1.20471C5.89196 0.916078 6.13244 0.646274 6.6134 0.395294C7.09436 0.131765 7.7272 0 8.51192 0C9.11944 0 9.5118 0.12549 9.689 0.376471C9.81557 0.552157 9.87885 0.715294 9.87885 0.865882V1.43059C11.3091 1.58118 12.3026 1.84471 12.8595 2.22118C13.0873 2.37176 13.2013 2.51608 13.2013 2.65412C13.2013 3.30667 13.043 4.00941 12.7266 4.76235C12.4229 5.51529 12.1254 5.89176 11.8343 5.89176C11.7837 5.89176 11.6192 5.83529 11.3407 5.72235C10.5054 5.35843 9.80924 5.17647 9.25234 5.17647C8.7081 5.17647 8.33472 5.22667 8.13221 5.32706C7.94236 5.42745 7.84744 5.58431 7.84744 5.79765C7.84744 5.99843 7.98666 6.15529 8.26511 6.26823C8.54356 6.38118 8.88529 6.48157 9.29031 6.56941C9.70798 6.64471 10.1573 6.77647 10.6383 6.96471C11.1319 7.15294 11.5875 7.37882 12.0052 7.64235C12.4229 7.90588 12.7709 8.30118 13.0494 8.82824C13.3278 9.34274 13.467 9.8698 13.467 10.4094C13.467 10.949 13.4164 11.3945 13.3152 11.7459C13.2139 12.0973 13.0367 12.4612 12.7836 12.8376C12.5431 13.2141 12.1697 13.5529 11.6635 13.8541C11.1698 14.1427 10.575 14.3561 9.87885 14.4941V14.7953C9.87885 15.0839 9.63837 15.3537 9.15741 15.6047C8.67645 15.8682 8.04362 16 7.25889 16C6.65137 16 6.25901 15.8745 6.08181 15.6235C5.95525 15.4478 5.89196 15.2847 5.89196 15.1341V14.5694C5.06927 14.4941 4.35416 14.3749 3.74664 14.2118C2.58221 13.898 2 13.5592 2 13.1953C2 12.4925 2.10125 11.7647 2.30376 11.0118C2.50627 10.2463 2.74675 9.86353 3.0252 9.86353C3.07583 9.86353 3.60108 10.0329 4.60097 10.3718C5.60086 10.7106 6.35393 10.88 6.86021 10.88C7.36648 10.88 7.69555 10.8298 7.84744 10.7294C7.99932 10.6165 8.07526 10.4596 8.07526 10.2588C8.07526 10.058 7.93603 9.88863 7.65758 9.75059C7.37913 9.6 7.03107 9.48078 6.6134 9.39294C6.19572 9.3051 5.74008 9.16706 5.24647 8.97882C4.76551 8.79059 4.31619 8.57098 3.89852 8.32C3.48084 8.06902 3.13278 7.69882 2.85433 7.20941C2.57588 6.72 2.43666 6.14902 2.43666 5.49647C2.43666 3.18745 3.58843 1.83843 5.89196 1.44941V1.20471Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 text-label-md-sec text-textSecondary font-semibold">
                  Minswap Team
                </div>
                <div className="group inline-flex shrink-0 items-center space-x-1 rounded-full bg-[#7f1d1d6b] px-4 py-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-red-500Sub"></span>
                  <p className="text-label-xs-sec text-red-500">Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-x-1.5">
                <ExternalLink
                  href="https://cloudflare-ipfs.com/ipfs/QmU9YE4ppi8N8MjGk4FzHiNaeXps8DN72Hzt8Sfqd9UuvB"
                  text="IPFS"
                  icon="document"
                />
                <ExternalLink
                  href="https://forum.minswap.org/t/minswap-v2-fee-structure-and-min-ada-fee-mip-2-1-poll-check/5731"
                  text="Discussion"
                  icon="chat"
                />
              </div>

              <div className="space-y-1">
                <h5 className="font-interDisplay text-title-h5 text-textSecondary font-semibold">
                  V2 Launch, POL Migration, & Fee Discount
                </h5>
                <span className="text-p-sm text-textPrimary text-sm">
                  Ended at 2024-07-09 10:00 GMT+1
                </span>
              </div>

              <p className="line-clamp-2 text-p-sm text-textPrimary text-sm">
                Minswap Labs has been working on Minswap V2 since before it was
                announced in November 2023 at the Cardano Summit. This new Smart
                Contract brings a set of improvements in scaling, composability,
                new features and more which you can find here. Migration to a
                new Smart contract requires two main verticals: Detailed
                instructions around the V2 contracts and the
              </p>

              <div className="space-y-2.5 text-textSecondary">
                <VoteOption
                  text="Yes, pass this Proposal"
                  percentage="99.96%"
                  votes="223.03M"
                  checked={true}
                />
                <VoteOption
                  text="No, do not pass this Proposal"
                  percentage="0.04%"
                  votes="81.148K"
                  checked={false}
                />
              </div>
            </Link>
          </div>

          <div className="mt-6">
            <Link
              className="relative flex w-full flex-col gap-y-4 rounded-2xl border border-bd-pri-sub p-6 shadow-base transition-colors duration-200 hover:cursor-pointer hover:border-2 hover:border-bd-pri-hv hover:p-[23px] hover:shadow-lg active:border-2 active:p-[23px]"
              href="/governance"
            >
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sf-pri-sub p-2">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 shrink-0 text-[#0CD15B]"
                  >
                    <path
                      d="M5.89196 1.20471C5.89196 0.916078 6.13244 0.646274 6.6134 0.395294C7.09436 0.131765 7.7272 0 8.51192 0C9.11944 0 9.5118 0.12549 9.689 0.376471C9.81557 0.552157 9.87885 0.715294 9.87885 0.865882V1.43059C11.3091 1.58118 12.3026 1.84471 12.8595 2.22118C13.0873 2.37176 13.2013 2.51608 13.2013 2.65412C13.2013 3.30667 13.043 4.00941 12.7266 4.76235C12.4229 5.51529 12.1254 5.89176 11.8343 5.89176C11.7837 5.89176 11.6192 5.83529 11.3407 5.72235C10.5054 5.35843 9.80924 5.17647 9.25234 5.17647C8.7081 5.17647 8.33472 5.22667 8.13221 5.32706C7.94236 5.42745 7.84744 5.58431 7.84744 5.79765C7.84744 5.99843 7.98666 6.15529 8.26511 6.26823C8.54356 6.38118 8.88529 6.48157 9.29031 6.56941C9.70798 6.64471 10.1573 6.77647 10.6383 6.96471C11.1319 7.15294 11.5875 7.37882 12.0052 7.64235C12.4229 7.90588 12.7709 8.30118 13.0494 8.82824C13.3278 9.34274 13.467 9.8698 13.467 10.4094C13.467 10.949 13.4164 11.3945 13.3152 11.7459C13.2139 12.0973 13.0367 12.4612 12.7836 12.8376C12.5431 13.2141 12.1697 13.5529 11.6635 13.8541C11.1698 14.1427 10.575 14.3561 9.87885 14.4941V14.7953C9.87885 15.0839 9.63837 15.3537 9.15741 15.6047C8.67645 15.8682 8.04362 16 7.25889 16C6.65137 16 6.25901 15.8745 6.08181 15.6235C5.95525 15.4478 5.89196 15.2847 5.89196 15.1341V14.5694C5.06927 14.4941 4.35416 14.3749 3.74664 14.2118C2.58221 13.898 2 13.5592 2 13.1953C2 12.4925 2.10125 11.7647 2.30376 11.0118C2.50627 10.2463 2.74675 9.86353 3.0252 9.86353C3.07583 9.86353 3.60108 10.0329 4.60097 10.3718C5.60086 10.7106 6.35393 10.88 6.86021 10.88C7.36648 10.88 7.69555 10.8298 7.84744 10.7294C7.99932 10.6165 8.07526 10.4596 8.07526 10.2588C8.07526 10.058 7.93603 9.88863 7.65758 9.75059C7.37913 9.6 7.03107 9.48078 6.6134 9.39294C6.19572 9.3051 5.74008 9.16706 5.24647 8.97882C4.76551 8.79059 4.31619 8.57098 3.89852 8.32C3.48084 8.06902 3.13278 7.69882 2.85433 7.20941C2.57588 6.72 2.43666 6.14902 2.43666 5.49647C2.43666 3.18745 3.58843 1.83843 5.89196 1.44941V1.20471Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 text-label-md-sec text-textSecondary font-semibold">
                  Minswap Team
                </div>
                <div className="group inline-flex shrink-0 items-center space-x-1 rounded-full bg-[#7f1d1d6b] px-4 py-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-red-500Sub"></span>
                  <p className="text-label-xs-sec text-red-500">Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-x-1.5">
                <ExternalLink
                  href="https://cloudflare-ipfs.com/ipfs/QmU9YE4ppi8N8MjGk4FzHiNaeXps8DN72Hzt8Sfqd9UuvB"
                  text="IPFS"
                  icon="document"
                />
                <ExternalLink
                  href="https://forum.minswap.org/t/minswap-v2-fee-structure-and-min-ada-fee-mip-2-1-poll-check/5731"
                  text="Discussion"
                  icon="chat"
                />
              </div>

              <div className="space-y-1">
                <h5 className="font-interDisplay text-title-h5 text-textSecondary font-semibold">
                  Minswap Catalyst Improvement Proposal
                </h5>
                <span className="text-p-sm text-textPrimary text-sm">
                  Ended at 2024-07-09 10:00 GMT+1
                </span>
              </div>

              <p className="line-clamp-2 text-p-sm text-textPrimary text-sm">
                Minswap Catalyst Improvement Proposal The current strategy for
                Minswap LPs to vote on Catalyst Proposals consists of a group of
                community volunteers that filter all Catalyst Proposals into a
                List of Top 50 Proposals according to a series of criteria (like
                prioritize open-source). Then, MIN holders choose the Top 20
                amongst that List and those get voted. This proposal
              </p>

              <div className="space-y-2.5 text-textSecondary">
                <VoteOption
                  text="Yes, pass this Proposal"
                  percentage="99.96%"
                  votes="223.03M"
                  checked={true}
                />
                <VoteOption
                  text="No, do not pass this Proposal"
                  percentage="0.04%"
                  votes="81.148K"
                  checked={false}
                />
              </div>
            </Link>
          </div>

          <div className="mt-6">
            <Link
              className="relative flex w-full flex-col gap-y-4 rounded-2xl border border-bd-pri-sub p-6 shadow-base transition-colors duration-200 hover:cursor-pointer hover:border-2 hover:border-bd-pri-hv hover:p-[23px] hover:shadow-lg active:border-2 active:p-[23px]"
              href="/governance"
            >
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sf-pri-sub p-2">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 shrink-0 text-[#0CD15B]"
                  >
                    <path
                      d="M5.89196 1.20471C5.89196 0.916078 6.13244 0.646274 6.6134 0.395294C7.09436 0.131765 7.7272 0 8.51192 0C9.11944 0 9.5118 0.12549 9.689 0.376471C9.81557 0.552157 9.87885 0.715294 9.87885 0.865882V1.43059C11.3091 1.58118 12.3026 1.84471 12.8595 2.22118C13.0873 2.37176 13.2013 2.51608 13.2013 2.65412C13.2013 3.30667 13.043 4.00941 12.7266 4.76235C12.4229 5.51529 12.1254 5.89176 11.8343 5.89176C11.7837 5.89176 11.6192 5.83529 11.3407 5.72235C10.5054 5.35843 9.80924 5.17647 9.25234 5.17647C8.7081 5.17647 8.33472 5.22667 8.13221 5.32706C7.94236 5.42745 7.84744 5.58431 7.84744 5.79765C7.84744 5.99843 7.98666 6.15529 8.26511 6.26823C8.54356 6.38118 8.88529 6.48157 9.29031 6.56941C9.70798 6.64471 10.1573 6.77647 10.6383 6.96471C11.1319 7.15294 11.5875 7.37882 12.0052 7.64235C12.4229 7.90588 12.7709 8.30118 13.0494 8.82824C13.3278 9.34274 13.467 9.8698 13.467 10.4094C13.467 10.949 13.4164 11.3945 13.3152 11.7459C13.2139 12.0973 13.0367 12.4612 12.7836 12.8376C12.5431 13.2141 12.1697 13.5529 11.6635 13.8541C11.1698 14.1427 10.575 14.3561 9.87885 14.4941V14.7953C9.87885 15.0839 9.63837 15.3537 9.15741 15.6047C8.67645 15.8682 8.04362 16 7.25889 16C6.65137 16 6.25901 15.8745 6.08181 15.6235C5.95525 15.4478 5.89196 15.2847 5.89196 15.1341V14.5694C5.06927 14.4941 4.35416 14.3749 3.74664 14.2118C2.58221 13.898 2 13.5592 2 13.1953C2 12.4925 2.10125 11.7647 2.30376 11.0118C2.50627 10.2463 2.74675 9.86353 3.0252 9.86353C3.07583 9.86353 3.60108 10.0329 4.60097 10.3718C5.60086 10.7106 6.35393 10.88 6.86021 10.88C7.36648 10.88 7.69555 10.8298 7.84744 10.7294C7.99932 10.6165 8.07526 10.4596 8.07526 10.2588C8.07526 10.058 7.93603 9.88863 7.65758 9.75059C7.37913 9.6 7.03107 9.48078 6.6134 9.39294C6.19572 9.3051 5.74008 9.16706 5.24647 8.97882C4.76551 8.79059 4.31619 8.57098 3.89852 8.32C3.48084 8.06902 3.13278 7.69882 2.85433 7.20941C2.57588 6.72 2.43666 6.14902 2.43666 5.49647C2.43666 3.18745 3.58843 1.83843 5.89196 1.44941V1.20471Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 text-label-md-sec text-textSecondary font-semibold">
                  Minswap Team
                </div>
                <div className="group inline-flex shrink-0 items-center space-x-1 rounded-full bg-[#7f1d1d6b] px-4 py-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-red-500Sub"></span>
                  <p className="text-label-xs-sec text-red-500">Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-x-1.5">
                <ExternalLink
                  href="https://cloudflare-ipfs.com/ipfs/QmU9YE4ppi8N8MjGk4FzHiNaeXps8DN72Hzt8Sfqd9UuvB"
                  text="IPFS"
                  icon="document"
                />
                <ExternalLink
                  href="https://forum.minswap.org/t/minswap-v2-fee-structure-and-min-ada-fee-mip-2-1-poll-check/5731"
                  text="Discussion"
                  icon="chat"
                />
              </div>

              <div className="space-y-1">
                <h5 className="font-interDisplay text-title-h5 text-textSecondary font-semibold">
                  Listing $MIN on MEXC with CLS as Market Makers
                </h5>
                <span className="text-p-sm text-textPrimary text-sm">
                  Ended at 2024-07-09 10:00 GMT+1
                </span>
              </div>

              <p className="line-clamp-2 text-p-sm text-textPrimary text-sm">
                This is a Proposal to approve the listing of the $MIN Token on
                the MEXC CEX with CLS as Market Makers. The Proposal includes
                removing 1mn USD of MIN/ADA POL for Market Making needs. In the
                Proposal, you can find reasoning behind why Listing $MIN on a
                MEXC is a worthwhile initiative, why MEXC is one of the best CEX
                for the moment, why Market Making as aBackground Minswap Labs
                has been working on Minswap V2 since before it was announced in
                November 2023 at the Cardano Summit. This new Smart Contract
                brings a set of improvements in scaling, composability, new
                features and more which you can find here. Deployment of a new
                Smart contract requires laying out an initial plan for how
                Minswap V2 will work, potential Fee Sharing programs and the Fee
                on MIN/ADA. We desc
              </p>

              <div className="space-y-2.5 text-textSecondary">
                <VoteOption
                  text="Yes, pass this Proposal"
                  percentage="99.96%"
                  votes="223.03M"
                  checked={true}
                />
                <VoteOption
                  text="No, do not pass this Proposal"
                  percentage="0.04%"
                  votes="81.148K"
                  checked={false}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}

export default Governance;
