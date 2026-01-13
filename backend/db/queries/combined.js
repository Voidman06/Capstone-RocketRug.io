import {
  getCoinById,
  updateCoinValue,
  updateCoinValueChange,
  updateCoinLiquidity,
} from "#db/queries/coins";
import { updateUserWallet, getUserById } from "#db/queries/users";
import { logTransaction } from "#db/queries/transactions";

export async function buyCoins(user_id, coin_id, amount) {
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    throw new Error("Invalid amount");
  }

  const coin = await getCoinById(coin_id);
  if (!coin || coin.rugpulled) {
    throw new Error("Coin unavailable");
  }

  const user = await getUserById(user_id);

  const tradeValue = coin.value * amt;
  const tax = tradeValue * 0.1;
  const totalCost = tradeValue + tax;

  if (user.wallet < totalCost) {
    throw new Error("Insufficient funds");
  }

  const volatility = Math.max(0, Number(coin.volatility_lvl));

  const priceDelta = coin.value * volatility * 0.05;

  const liquidityDelta = tradeValue * 0.25;

  await updateUserWallet(user_id, -totalCost);
  await updateUserWallet(coin.creator_id, tax);

  await updateCoinValue(coin_id, priceDelta);
  await updateCoinValueChange(coin_id, priceDelta);
  await updateCoinLiquidity(coin_id, liquidityDelta);

  await logTransaction(user_id, coin_id, "buy", amt, totalCost);
}

export async function sellCoins(user_id, coin_id, amount) {
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    throw new Error("Invalid amount");
  }

  const coin = await getCoinById(coin_id);
  if (!coin || coin.rugpulled) {
    throw new Error("Coin unavailable");
  }

  const tradeValue = coin.value * amt;
  const tax = tradeValue * 0.1;
  const payout = tradeValue - tax;

  const volatility = Math.max(0, Number(coin.volatility_lvl));

  const priceDelta = -(coin.value * volatility * 0.05);

  const liquidityDelta = -(tradeValue * 0.25);

  await updateUserWallet(user_id, payout);
  await updateUserWallet(coin.creator_id, tax);

  await updateCoinValue(coin_id, priceDelta);
  await updateCoinValueChange(coin_id, priceDelta);
  await updateCoinLiquidity(coin_id, liquidityDelta);

  await logTransaction(user_id, coin_id, "sell", amt, payout);
}
