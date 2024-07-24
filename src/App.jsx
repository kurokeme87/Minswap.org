import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ConnectWallet from "./Components/Modals/ConnectWallet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
      </Routes>
    </div>
  );
}

export default App;
