import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, email, password) {
  const sql = `
    INSERT INTO users
      (username, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, email, hashedPassword]);
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
