import {
  getCoinById,
  updateCoinValue,
  updateCoinValueChange,
  updateCoinLiquidity,
} from "#db/queries/coins";
import { updateUserWallet, getUserById } from "#db/queries/users";
import { logTransaction } from "#db/queries/transactions";

function roundToTwo(num) {
  const roundNum = Number(num.toFixed(2));
  return roundNum;
}

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
  const roundTax = roundToTwo(tax);
  const totalCost = tradeValue + roundTax;
  const roundedTotalCost = roundToTwo(totalCost);

  if (user.wallet < roundedTotalCost) {
    throw new Error("Insufficient funds");
  }

  const volatility = Math.max(0, Number(coin.volatility_lvl));

  const priceDelta = coin.value * volatility * 0.05;
  const roundPriceDelta = roundToTwo(priceDelta);
  const percentChange = (roundPriceDelta / coin.value) * 100;
  const roundedPercentChange = roundToTwo(percentChange);
  const liquidityDelta = tradeValue * 0.25;
  const roundLiquidityDelta = roundToTwo(liquidityDelta);

  await updateUserWallet(user_id, -roundedTotalCost);
  await updateUserWallet(coin.creator_id, roundTax);

  await updateCoinValue(coin_id, roundPriceDelta);
  await updateCoinValueChange(coin_id, roundedPercentChange);
  await updateCoinLiquidity(coin_id, roundLiquidityDelta);

  await logTransaction(user_id, coin_id, "buy", amt, roundedTotalCost);
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
  const roundTax = roundToTwo(tax);
  const payout = tradeValue - roundTax;
  const roundedPayout = roundToTwo(payout);

  const volatility = Math.max(0, Number(coin.volatility_lvl));

  const priceDelta = -(coin.value * volatility * 0.05);
  const roundPriceDelta = roundToTwo(priceDelta);
  const percentChange = (roundPriceDelta / coin.value) * 100;
  const roundedPercentChange = roundToTwo(percentChange);
  const liquidityDelta = -(tradeValue * 0.25);
  const roundLiquidityDelta = roundToTwo(liquidityDelta);

  await updateUserWallet(user_id, roundedPayout);
  await updateUserWallet(coin.creator_id, roundTax);

  await updateCoinValue(coin_id, roundPriceDelta);
  await updateCoinValueChange(coin_id, roundedPercentChange);
  await updateCoinLiquidity(coin_id, roundLiquidityDelta);

  await logTransaction(user_id, coin_id, "sell", amt, roundedPayout);
}
