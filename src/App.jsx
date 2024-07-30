import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Nami from "./Components/Nami";
import Eternl from "./Components/Eternl";
import EternlAddWallet from "./Components/EternlAddWallet";
import EternlRestoreWallet from "./Components/EternlRestoreWallet";
import NamiNewWallet from "./Components/NamiNewWallet";
import Market from "./Pages/Market";
import Trade from "./Pages/Trade";
import Farm from "./Pages/Farm";
import Staking from "./Pages/Staking";
import Liquidity from "./Pages/Liquidity";
import Analytics from "./Pages/Analytics";
import LaunchBowl from "./Pages/LaunchBowl";
import Governance from "./Pages/Governance";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nami" element={<Nami />} />
        <Route path="/namiWallet" element={<NamiNewWallet />} />
        <Route path="/eternl" element={<Eternl />} />
        <Route path="/eternlAddWallet" element={<EternlAddWallet />} />
        <Route path="/eternlRestoreWallet" element={<EternlRestoreWallet />} />
        <Route path="/market" element={<Market />} />
        <Route path="/app/minswap" element={<Trade />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/liquidity" element={<Liquidity />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/launch-bowl" element={<LaunchBowl />} />
        <Route path="/governance" element={<Governance />} />
      </Routes>
    </div>
  );
}

export default App;
