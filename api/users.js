import express from "express";
const router = express.Router();
export default router;

import {
  createUser,
  getUserByEmailAndPassword,
  getUsers,
  getUserById,
  getUserTransactions,
} from "#db/queries/users";

import { getCoinsByUserId } from "#db/queries/coins";

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router
  .route("/register")
  .post(requireBody(["username", "email", "password"]), async (req, res) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);

    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["email", "password"]), async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);
    if (!user) return res.status(401).send("Invalid email or password.");

    const token = await createToken({ id: user.id });
    res.send(token);
  });

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).send(users);
});

router.get("/me", requireUser, (req, res) => {
  res.send(req.user);
});

router.param("id", async (req, res, next, id) => {
  const userId = Number(id);
  if (isNaN(userId)) return res.status(400).send("Invalid user id.");

  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).send("User not found.");
    req.user = user;
    next();
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

router.get("/:id", async (req, res) => {
  return res.status(200).send(req.user);
});

router.get("/:id/transactions", async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await getUserTransactions(userId);
    return res.status(200).send(transactions);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});

router.get("/:id/coins", async (req, res) => {
  const userId = req.user.id;

  try {
    const coins = await getCoinsByUserId(userId);
    return res.status(200).send(coins);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send("Internal server error.");
  }
});
