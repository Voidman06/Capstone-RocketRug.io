import db from "#db/client";

export async function createToken(id, name, photoUrl) {
  const timestamp = new Date().toISOString();

  const sql = `
    INSERT INTO coins
        (creator_id, name, photo_url, value, value_change, volatility_lvl, liquidity, supply, rugpulled, created_time)
    VALUES
        ($1, $2, $3, $5, $4, $4, $4, $6, $4, $7)
    RETURNING *
  `;
  const {
    rows: [coin],
  } = await db.query(sql, [id, name, photoUrl, 0, 1, 100, timestamp]);
  return coin;
}

export async function getCoins() {
  const sql = `
    SELECT *
    FROM coins
    `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getCoinById(id) {
  const sql = `
    SELECT *
    FROM coins
    WHERE id = $1
    `;
  const {
    rows: [coin],
  } = await db.query(sql, [id]);
  return coin;
}

export async function getCoinByUserId(id) {
  const sql = `
    SELECT *
    FROM coins
    WHERE creator_id = $1
    `;
  const {
    rows: [coin],
  } = await db.query(sql, [id]);
  return coin;
}

export async function getCoinHistory(id) {
  const sql = `
    SELECT *
    FROM coin_history
    WHERE coin_id = $1
    `;
  const {
    rows: [log],
  } = await db.query(sql, [id]);
  return log;
}

export async function getCoinTransactions(id) {
  const sql = `
    SELECT *
    FROM transactions
    WHERE coin_id = $1
  `;
  const {
    rows: [log],
  } = await db.query(sql, [id]);
  return log;
}

export async function updateCoinValue(id, value) {
  const sql = `
    UPDATE coins
    SET value = value + $2
    WHERE id = $1
    RETURNING *;
    `;
  const { rows } = await db.query(sql, [id, value]);
  return rows;
}
