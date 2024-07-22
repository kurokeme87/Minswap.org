import { Link } from "react-router-dom";
import Navigation from "../Components/Navigation";

function Home() {
  return (
    <div className="Home">
      <Navigation />

      <div className="max-w-screen-2xl m-auto">
        <div className="pt-[100px] sm:pt-[200px] px-2 sm:px-20 text-center">
          <div>
            <img
              src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721581302/bszyn9g5o2be3isirw50.svg"
              alt="homeicons"
              className="m-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl text-textSecondary font-semibold mt-8">
            Where Cardano community <br /> comes to trade.
          </h1>

          <div className="my-6 px-2">
            <div className="max-w-sm m-auto">
              <div className="border border-stone-700 rounded-xl p-3">
                <p className="text-left text-textPrimary font-semibold">
                  You pay
                </p>
                <div className="flex justify-between">
                  <div className="text-textPrimary font-semibold">
                    <h1 className="text-3xl">0.0</h1>
                  </div>
                  <div className="flex items-center p-2 rounded-full bg-[#1a1b20]">
                    <img
                      src="https://app.minswap.org/images/assets/cardano.png"
                      className="size-6 me-2"
                      alt="icon"
                    />
                    <h1 className="text-textSecondary font-semibold me-2">
                      ADA
                    </h1>
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      data-slot="icon"
                      className="text-textSecondary size-4"
                    >
                      <path d="M12 16L6 10H18L12 16Z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="absolute mt-[-20px] z-[1] rounded-full border border-stone-700  p-2 shadow-lg bg-[#111217]">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon size-5 shrink-0 text-white"
                  >
                    <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                  </svg>
                </div>
              </div>

              <div className="border border-stone-700 rounded-xl p-3 mt-1">
                <p className="text-left text-textPrimary font-semibold">
                  You receive
                </p>
                <div className="flex justify-between">
                  <div className="text-textPrimary font-semibold">
                    <h1 className="text-3xl">0.0</h1>
                  </div>
                  <div className="flex items-center p-2 rounded-full bg-[#1a1b20]">
                    <div className="rounded-full bg-[#27282e] p-0.5">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-textSecondary size-5 "
                      >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    </div>
                    <h1 className="text-textSecondary font-semibold ms-2 me-2">
                      Select token
                    </h1>
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      data-slot="icon"
                      className="text-textSecondary size-4"
                    >
                      <path d="M12 16L6 10H18L12 16Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-textPrimary font-medium max-w-[390px] m-auto">
            <p>
              Trade your favorite Cardano tokens with low fees, earn yields and
              stake for real yield.
            </p>
          </div>
        </div>

        <div className="px-4 md:px-20 md:mx-14 mt-[150px]">
          <div>
            <h1 className="text-textSecondary font-semibold text-3xl">
              DeFi Beats Here: Our Numbers
            </h1>
            <p className="text-textPrimary font-medium mt-7">
              See Minswap's impact on Cardano DeFi with real-time data.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-between mt-10">
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">
                6.06B ₳
              </h1>
              <p className="text-textPrimary font-bold text-sm">
                Traded on Minswap
              </p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">
                4,182,299
              </h1>
              <p className="text-textPrimary font-bold text-sm">
                Successful trades
              </p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">
                149.01M ₳
              </h1>
              <p className="text-textPrimary font-bold text-sm">TVL</p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">
                167,388
              </h1>
              <p className="text-textPrimary font-bold text-sm">
                Active traders
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-screen-xl m-auto px-5 mt-[70px] md:mt-[120px]">
            <h1 className="text-3xl text-textSecondary font-bold mb-5">
              Trade Smarter, Not Harder
            </h1>
            <div className="flex flex-wrap justify-between">
              <img
                src="/one.png"
                className="w-full md:w-[48%] mb-5 rounded-lg"
                alt="one"
              />
              <img
                src="/two.png"
                className="w-full md:w-[48%] mb-5 rounded-lg"
                alt="two"
              />
              <img
                src="/three.png"
                className="w-full md:w-[48%] mb-5 rounded-lg"
                alt="three"
              />
              <img
                src="/four.png"
                className="w-full md:w-[48%] mb-5 rounded-lg"
                alt="four"
              />
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl m-auto p-5">
          <Link to="https://play.google.com/store/apps/details?id=org.minswap.app&pli=1">
            {" "}
            <img
              src="/banner.png"
              className="rounded-xl hidden md:block"
              alt="banner"
            />
            <img
              src="/bannermobile.png"
              className="rounded-xl md:hidden block w-full"
              alt="banner"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
