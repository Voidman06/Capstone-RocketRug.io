import db from "#db/client";

export async function createToken(id, name, photoUrl) {
  const timestamp = new Date().toISOString();

  const sql = `
    INSERT INTO coins
        (creator_id, name, photo_url, value, value_change, volatility_lvl, liquidity, supply, rugpulled, created_time)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
    RETURNING *
  `;
  const {
    rows: [coin],
  } = await db.query(sql, [id, name, photoUrl, 0, 0, 0, 0, 100, false]);
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

// setup update functions for coin attributes
export async function updateCoinValue(id, value) {
  const sql = `
    UPDATE coins
    SET value = value + $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, value]);
  return update;
}

export async function updateCoinValueChange(id, change) {
  const sql = `
    UPDATE coins
    SET value_change = $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, change]);
  return update;
}

export async function updateCoinVolatility(id, level) {
  const sql = `
    UPDATE coins
    SET volatility_lvl = $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, level]);
  return update;
}

export async function updateCoinSupply(id, supply) {
  const sql = `
    UPDATE coins
    SET supply = supply + $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, supply]);
  return update;
}

export async function updateCoinRugPulled(id, rugpulled) {
  const sql = `
    UPDATE coins
    SET rugpulled = true
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, rugpulled]);
  return update;
}

export async function logCoinStats(id) {
  const sql = `
    INSERT INTO coin_history (coin_id, value, value_change, supply, log_time)
    SELECT
      id,
      value,
      value_change,
      supply,
      NOW()
    FROM coins WHERE id = $1;
    `;
  const {
    rows: [log],
  } = await db.query(sql, [id]);
  return log;
}
