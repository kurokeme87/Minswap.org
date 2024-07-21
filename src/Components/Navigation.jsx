import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="Navigation">
      <div className="bg-primaryColor fixed left-0 right-0 p-3 md:p-5 z-10">
        <div className=" max-w-screen-2xl m-auto">
          <div className="flex items-center justify-between px-2 md:px-4">
            <div className="flex items-center gap-6">
              <img
                src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721491707/xqjsie1x0o884byjfbmz.svg"
                alt="logo"
                className="w-10 sm:w-7"
              />
              <div className="hidden lg:flex justify-between lg:gap-3 text-textPrimary font-semibold">
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-3 py-2 rounded-full">
                  <Link to="/">Trade</Link>
                </div>
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-3 py-2 rounded-full">
                  <Link to="/">Market</Link>
                </div>
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-3 py-2 rounded-full">
                  <Link to="/" className="flex items-center">
                    Earn{" "}
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      data-slot="icon"
                      className="remixicon size-4 shrink-0 transition-transform"
                    >
                      <path d="M12 16L6 10H18L12 16Z"></path>
                    </svg>
                  </Link>
                </div>
                <div className="hover:bg-[#303137] hover:text-[#a3b7ea] duration-100 px-5 py-2 rounded-full">
                  <Link to="/">
                    <i className="fa-solid fa-ellipsis"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="xl:max-w-[400px] lg:max-w-[300px] w-full">
              <div className="hidden lg:flex items-center justify-between cursor-text border border-stone-700 hover:border-[2px] rounded-full px-4 py-2 w-full">
                <div className="flex items-center flex-grow">
                  <i className="fa-solid fa-magnifying-glass text-textSecondary"></i>
                  <input
                    type="text"
                    className="text-textSecondary placeholder-textPrimary font-medium bg-primaryColor w-100 outline-none ms-3"
                    placeholder="Search by ticker, token, pair"
                  />
                </div>
                <div className="bg-[#303137] px-2 py-1 rounded-lg ml-2">
                  {" "}
                  <svg
                    className="text-textPrimary"
                    fill="none"
                    height="14"
                    viewBox="0 0 6 14"
                    width="6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.77575 0.0341187L2.02575 13.9659H0.224609L3.97461 0.0341187H5.77575Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5">
              <i className="fa-solid fa-magnifying-glass text-textSecondary text-xl lg:hidden"></i>
              <div className="hidden lg:block hover:bg-[#303137] duration-100 px-3 py-2 rounded-full">
                <i className="fa-solid fa-gear text-textSecondary text-xl"></i>
              </div>
              <button className="bg-[#8aaaff] hover:bg-textSecondary duration-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base">
                <i className="fa-solid fa-wallet text-[#030b25] text-lg me-2 hidden lg:inline"></i>{" "}
                Connect <span className="hidden lg:inline">Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
