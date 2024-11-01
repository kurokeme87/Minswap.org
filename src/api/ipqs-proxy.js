import axios from 'axios';

export default async function handler(req, res) {
  const { ip } = req.query;
  const API_KEY = import.meta.env.VITE_REACT_APP_IPQS_API_KEY;
  const url = `https://ipqualityscore.com/api/json/ip/${API_KEY}/${ip}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
