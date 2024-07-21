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

          <div>
            <div>

            </div>
          </div>

          <div className="text-textPrimary font-medium">
            <p>Trade your favorite Cardano tokens with low fees, <br /> earn yields and stake for real yield.</p>
          </div>
        </div>

        <div className="px-4 md:px-20 mt-[150px]">
          <div>
            <h1 className="text-textSecondary font-semibold text-3xl">DeFi Beats Here: Our Numbers</h1>
            <p className="text-textPrimary font-medium mt-7">See Minswap's impact on Cardano DeFi with real-time data.</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-between mt-10">
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">6.06B ₳</h1>
              <p className="text-textPrimary font-bold text-sm">Traded on Minswap</p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">4,182,299</h1>
              <p className="text-textPrimary font-bold text-sm">Successful trades</p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">149.01M ₳</h1>
              <p className="text-textPrimary font-bold text-sm">TVL</p>
            </div>
            <div className="bg-[#1a1b20] rounded-lg p-5 w-full sm:w-[280px]">
              <h1 className="text-textSecondary font-semibold text-4xl">167,388</h1>
              <p className="text-textPrimary font-bold text-sm">Active traders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
