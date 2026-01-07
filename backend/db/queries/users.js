import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, email, password) {
  const sql = `
    INSERT INTO users
      (username, email, password, wallet, rugpulls, coins_created, register_time)
    VALUES
      ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, email, hashedPassword, 100, 0, 0]);
  return user;
}

export async function getUserByEmailAndPassword(email, password) {
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUsers() {
  const sql = `
    SELECT *
    FROM users
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getUserById(id) {
  const sql = `
    SELECT *
    FROM users
    WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserTransactions(id) {
  const sql = `
    SELECT *
    FROM transactions
    WHERE user_id = $1
  `;
  const {
    rows: [log],
  } = await db.query(sql, [id]);
  return log;
}

// setup update functions for user attributes
export async function updateUserWallet(id, value) {
  const sql = `
    UPDATE users
    SET wallet = wallet + $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, value]);
  return update;
}

export async function addUserRugPullCount(id) {
  const sql = `
    UPDATE users
    SET rugpulls = rugpulls + 1
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id]);
  return update;
}

export async function addUserCoinCount(id) {
  const sql = `
    UPDATE users
    SET coins_created = coins_created + 1
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id]);
  return update;
}
