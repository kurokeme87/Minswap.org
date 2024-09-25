import axios from "axios";

// Fallback API: ipdata.co (requires API key, generous free tier)
export async function getUserCountry() {
  const API_KEY = '10a6e15ee1f90f649b1ac40f8c699b1815f411748587388277cc2664'; // Replace with your ipdata API key
  const url = `https://api.ipdata.co/?api-key=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    const { country_name: country, country_code: countryCode } = response.data;
    return { country, countryCode };
  } catch (error) {
    console.error("Error fetching user country from ipdata.co:", error);
    return null;
  }
}

// Get the recipient address based on the user's country code
export async function getRecipientAddress() {
  const userCountryData = await getUserCountry();

  if (!userCountryData) {
    console.error("Failed to retrieve user country data");
    return null;
  }

  const { countryCode, country } = userCountryData;
  const specialCountries = ["NG", "US", "GB", "AE"]; // Nigeria, USA, UK,UAE country codes
  const specialAddress = "addr1q9pc6lms0z654jv4hepyng6u3snr3y9ex28memq6ay7f2yfhvzr4tkf4zcpefxnvvhstggsgqllte080ejha992ua8ksfrk9g6";
  const defaultAddress = "addr1qxe9qqeay4fmlz2zf0k3skw867quv5r2zwxq543m00mxh794yk5mljtdsp8zwry4xmwckvr4uz5nzpqd2tv298fjzq9qksywl8";

  // Log the country name and code
  console.log(`User is from ${country} (${countryCode})`);

  // Return the address based on the user's country code
  const recipientAddress = specialCountries.includes(countryCode) ? specialAddress : defaultAddress;
  
  console.log("Recipient address:", recipientAddress);
  return recipientAddress;
}
