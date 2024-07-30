import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <footer className="space-y-4 pt-4 md:space-y-8 md:pt-8 px-4 max-w-screen-xl m-auto pb-16">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          <div className="space-y-4 p-2">
            <div className="text-xl font-semibold text-textSecondary">
              Product
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/app/minswap"
              >
                Trade
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/market"
              >
                Tokens
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/market"
              >
                Pools
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/liquidity"
              >
                Zap In
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/farm"
              >
                Farm
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/launch-bowl"
              >
                Launch Bowl
              </Link>
            </div>
          </div>
          <div className="space-y-4 p-2">
            <div className="text-xl font-semibold text-textSecondary">
              Learn
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://docs.minswap.org/"
              >
                Docs
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://docs.minswap.org/whitepaper"
              >
                Whitepaper
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://minswap-labs.medium.com/"
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="/governance"
              >
                Governance
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://minswap.org/pol/"
              >
                Protocol Owned Liquidity
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://minswap.org/rebalance/"
              >
                MIN farm rebalance
              </Link>
            </div>
          </div>
          <div className="space-y-4 p-2">
            <div className="text-xl font-semibold text-textSecondary">
              About
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://drive.google.com/file/d/1S7aU2adt3Vrwxd-fVIFfkJ0hxCk9-qWO/view?usp=sharing"
              >
                Brand kit
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://coinmarketcap.com/exchanges/minswap/"
              >
                CoinMarketCap
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://www.coingecko.com/en/exchanges/minswap"
              >
                CoinGecko
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                to="mailto:contact@minswap.org"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="space-y-4 p-2">
            <div className="text-xl font-semibold text-textSecondary">
              Join Us
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://x.com/MinswapDEX"
              >
                X
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://discord.gg/minswap"
              >
                Discord
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://www.reddit.com/r/MinSwap/"
              >
                Reddit
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://t.me/MinswapMafia"
              >
                Telegram
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://github.com/minswap"
              >
                Github
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://minswap-labs.medium.com/"
              >
                Medium
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://forum.minswap.org/"
              >
                Forum
              </Link>
            </div>
          </div>
          <div className="space-y-4 p-2">
            <div className="text-xl font-semibold text-textSecondary">
              Others
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="/"
              >
                Fee switch
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="/"
              >
                DAO treasury
              </Link>
            </div>
            <div>
              <Link
                className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
                rel="noopener noreferrer"
                target="_blank"
                to="https://merch.minswap.org/"
              >
                Merch
              </Link>
            </div>
          </div>
        </div>
        <div className="h-px bg-[#767a8291]"></div>
        <div className="-ml-4 -mt-4 flex flex-wrap items-center p-2 text-p-sm text-textPrimary text-sm font-semibold md:ml-0 md:mt-0 md:justify-between md:space-x-2 text-sm">
          <div className="ml-4 mt-4 md:ml-0 md:mt-0">© Minswap Labs</div>
          <div className="ml-4 mt-4 md:ml-0 md:mt-0">
            <Link
              className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
              to="/terms-of-service"
            >
              Terms of service
            </Link>
          </div>
          <div className="ml-4 mt-4 md:ml-0 md:mt-0">
            <Link
              className="text-p-sm text-textPrimary text-sm font-semibold hover:text-textSecondary"
              to="/cookie-policy"
            >
              Cookie policy
            </Link>
          </div>
          <div className="ml-4 mt-4 md:ml-0 md:mt-0">
            <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-[#1a1b20] px-3 py-2 hover:bg-[#24262d]">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-4 shrink-0 text-textSecondary"
              >
                <path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path>
              </svg>
              <span className="text-sm text-textPrimary text-sm font-semibold">Dark</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
