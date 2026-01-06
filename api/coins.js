import express from "express";
const router = express.Router();
export default router;

import {
  createCoin,
  getCoins,
  getCoinById,
  getCoinHistory,
  getCoinTransactions,
  updateCoinRugPulled,
  updateCoinValue,
  updateCoinLiquidity,
} from "#db/queries/coins";

import {
  updateUserWallet,
  addUserCoinCount,
  addUserRugPullCount,
} from "#db/queries/users";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import requireOwner from "#middleware/requireOwner";

router
  .route("/createcoin")
  .post(requireBody(["name", "photoUrl"]), requireUser, async (req, res) => {
    try {
      const { name, photoUrl } = req.body;
      const userId = req.user.id;
      const coin = await createCoin(userId, name, photoUrl);
      addUserCoinCount(userId);
      res.status(201).send(coin);
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).send("Internal server error.");
    }
  });

router.get("/", async (req, res) => {
  const coins = await getCoins();
  res.status(200).send(coins);
});

router.param("id", async (req, res, next, id) => {
  const coinId = Number(id);
  if (isNaN(coinId)) return res.status(400).send("Invalid coin id.");

  try {
    const coin = await getCoinById(coinId);
    if (!coin) return res.status(404).send("Coin not found.");
    req.coin = coin;
    next();
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

router.get("/:id", async (req, res) => {
  return res.status(200).send(req.coin);
});

router.get("/:id/history", async (req, res) => {
  const coinId = req.coin.id;

  try {
    const history = await getCoinHistory(coinId);
    return res.status(200).send(history);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

router.get("/:id/transactions", async (req, res) => {
  const coinId = req.coin.id;

  try {
    const transactions = await getCoinTransactions(coinId);
    return res.status(200).send(transactions);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

router.patch("/:id/rugpull", requireOwner, async (req, res) => {
  const coinId = req.coin.id;
  const ownerId = req.coin.creator_id;
  const coinValue = req.coin.value;
  const coinLiquidity = req.coin.liquidity;

  try {
    updateCoinRugPulled(coinId);
    updateCoinValue(coinId, -coinValue);
    updateUserWallet(ownerId, coinLiquidity);
    addUserRugPullCount(ownerId);
    res.status(200).send("Coin has been rugpulled.");
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

// Optional
router.patch("/:id/mint", requireOwner, async (req, res) => {
  return res.send("To be worked on");
});

router.patch("/:id/burn", requireOwner, async (req, res) => {
  return res.send("To be worked on");
});
