import {
  getCoinById,
  updateCoinValue,
  updateCoinValueChange,
  updateCoinLiquidity,
  getLastCoinBookmarkLog,
  logCoinStats,
} from "#db/queries/coins";
import { updateUserWallet, getUserById } from "#db/queries/users";
import { logTransaction } from "#db/queries/transactions";

export async function buyCoins(user_id, coin_id, amount) {
  const amt = Number(amount);
  if (amt <= 0) throw new Error("Invalid amount");

  const coin = await getCoinById(coin_id);
  if (!coin || coin.rugpulled) throw new Error("Coin unavailable");

  const user = await getUserById(user_id);
  if (user.wallet < coin.value * amt * 1.1)
    throw new Error("Insufficient funds");

  const tradeValue = coin.value * amt;
  const tax = tradeValue * 0.1;

  const volatilityFactor =
    Number(coin.volatility_lvl) + (Math.random() * 0.1 - 0.05);

  const priceDelta = coin.value * volatilityFactor;
  const liquidityDelta = tradeValue * 0.25;

  await updateUserWallet(user_id, -(tradeValue + tax));
  await updateUserWallet(coin.creator_id, tax);

  await updateCoinValue(coin_id, priceDelta);
  await updateCoinValueChange(coin_id, priceDelta);
  await updateCoinLiquidity(coin_id, liquidityDelta);

  await logTransaction(user_id, coin_id, "buy", amt, tradeValue + tax);
  await logCoinStats(coin_id, false);
}

export async function sellCoins(user_id, coin_id, amount) {
  const amt = Number(amount);
  if (amt <= 0) throw new Error("Invalid amount");

  const coin = await getCoinById(coin_id);
  if (!coin || coin.rugpulled) throw new Error("Coin unavailable");

  const tradeValue = coin.value * amt;
  const tax = tradeValue * 0.1;

  const volatilityFactor =
    Number(coin.volatility_lvl) + (Math.random() * 0.1 - 0.05);

  const priceDelta = -(coin.value * volatilityFactor);
  const liquidityDelta = -(tradeValue * 0.25);

  await updateUserWallet(user_id, tradeValue - tax);
  await updateUserWallet(coin.creator_id, tax);

  await updateCoinValue(coin_id, priceDelta);
  await updateCoinValueChange(coin_id, priceDelta);
  await updateCoinLiquidity(coin_id, liquidityDelta);

  await logTransaction(user_id, coin_id, "sell", amt, tradeValue - tax);
  await logCoinStats(coin_id, false);
}
