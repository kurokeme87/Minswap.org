import tokenList from "../data/tokenList";
import { getWalletBalance } from "./walletUtils"; 

async function updateTokenBalances(walletApi, cardanoWasm) {
  try {
    // Fetch wallet balance (ADA and tokens)
    const walletBalance = await getWalletBalance(walletApi, cardanoWasm);
    const { adaBalance, tokens } = walletBalance;

    console.log("Wallet balance:", walletBalance);

    // Update ADA balance in tokenList
    const updatedTokenList = tokenList.map((token) => {
      if (token.symbol === "ADA") {
        // Update ADA balance
        return {
          ...token,
          balance: adaBalance.toFixed(2), // ADA balance in ADA units
        };
      }

      // Match by assetName (symbol)
      const matchingToken = tokens.find(
        (t) => t.assetName === token.symbol // Match by token symbol (assetName)
      );

      // If a matching token is found, update its balance; otherwise, keep the balance as is
      return matchingToken
        ? { ...token, balance: (matchingToken.amount / 1_000_000).toFixed(2) } // Convert Lovelace (smallest unit) to token units
        : token;
    });

    return updatedTokenList;
  } catch (error) {
    console.error("Error updating token balances:", error);
    return tokenList; // Return the original token list if there's an error
  }
}

export default updateTokenBalances;
