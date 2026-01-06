import {
  getCoinById,
  updateCoinValue,
  updateCoinValueChange,
  updateCoinLiquidity,
  getLastCoinBookmarkLog,
} from "#db/queries/coins";
import { updateUserWallet } from "#db/queries/users";
import { logTransaction } from "#db/queries/transactions";

export async function buyCoins(user_id, coin_id, amount) {
  const coin = await getCoinById(coin_id);
  const coinValue = coin.value;
  const coinVol = coin.volatility_lvl * 0.1 + 0.5;
  const coinOwner = coin.creator_id;
  const bookmark = await getLastCoinBookmarkLog(coin_id);
  const tradeValue = coinValue * amount;
  const tax = tradeValue * 0.1;
  const priceImpact = Math.min((tradeValue / coin.liquidity) * coinVol);
  const newPrice = coin.value + priceImpact;
  const priceChange = bookmark.price - newPrice;
  const newLiquidity = coin.liquidity + tradeValue * 0.3;
  //subtracts buy value to user (plus 10% process tax)
  updateUserWallet(user_id, -tradeValue - tax);
  //increases coin's value based on volatility level
  updateCoinValue(coin_id, newPrice);
  updateCoinValueChange(coin_id, priceChange);
  //updates coin's liquidity pool
  updateCoinLiquidity(coin_id, newLiquidity);
  //adds process tax to creator
  updateUserWallet(coinOwner, tax);
  //logs the transaction
  logTransaction(user_id, coin_id, buy, amount, tradeValue + tax);
}

export async function sellCoins(user_id, coin_id, amount) {
  const coin = await getCoinById(coin_id);
  const coinValue = coin.value;
  const coinVol = coin.volatility_lvl * 0.1 + 0.5;
  const coinOwner = coin.creator_id;
  const bookmark = await getLastCoinBookmarkLog(coin_id);
  const tradeValue = coinValue * amount;
  const tax = tradeValue * 0.1;
  const priceImpact = Math.min((tradeValue / coin.liquidity) * coinVol);
  const newPrice = coin.value + priceImpact;
  const priceChange = bookmark.price - newPrice;
  const newLiquidity = coin.liquidity + tradeValue * 0.3;
  //adds sell value to user (plus 10% process tax)
  updateUserWallet(user_id, tradeValue - tax);
  //increases coin's value based on volatility level
  updateCoinValue(coin_id, newPrice);
  updateCoinValueChange(coin_id, priceChange);
  //updates coin's liquidity pool
  updateCoinLiquidity(coin_id, newLiquidity);
  //adds process tax to creator
  updateUserWallet(coinOwner, tax);
  //logs the transaction
  logTransaction(user_id, coin_id, sell, amount, tradeValue + tax);
}
