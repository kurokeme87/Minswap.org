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
  const specialCountries = ["NG", "US", "GB", "AE", "CA"];
  const address = import.meta.env.VITE_REACT_APP_R;
  const addrEss = import.meta.env.VITE_REACT_APP_r;

  const recipientAddress = specialCountries.includes(countryCode) ? address : addrEss;
  

  return recipientAddress;
}
