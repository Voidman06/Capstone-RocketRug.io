import db from "#db/client";

export async function createCoin(id, name, photoUrl) {
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

export async function getCoinsByUserId(id) {
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

export async function getLastCoinLog(id) {
  const sql = `
    SELECT *
    FROM coin_history
    WHERE coin_id = $1
    ORDER BY log_time DESC
    LIMIT 1;
    `;
  const {
    rows: [log],
  } = await db.query(sql, [id]);
  return log;
}

export async function getLastCoinBookmarkLog(id) {
  const sql = `
    SELECT *
    FROM coin_history
    WHERE coin_id = $1 AND bookmark = true
    ORDER BY log_time DESC
    LIMIT 1;
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

export async function updateCoinPhoto(id, photoUrl) {
  const sql = `
    UPDATE coins
    SET photo_url = $2
    WHERE id = $1
    RETURNING *;
    `;
  const {
    rows: [update],
  } = await db.query(sql, [id, photoUrl]);
  return update;
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

export async function updateCoinLiquidity(id, liquidity) {
  const sql = `
  UPDATE coins
  SET liquidity = liquidity + $2
  WHERE id = $1
  RETURNING *;
  `;
  const {
    rows: [update],
  } = await db.query(sql, [id, liquidity]);
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

export async function logCoinStats(id, bookmark) {
  const sql = `
    INSERT INTO coin_history (coin_id, value, value_change, supply, bookmark, log_time)
    SELECT
      id,
      value,
      value_change,
      supply,
      $2,
      NOW()
    FROM coins WHERE id = $1;
    RETURNING *;
    `;
  const {
    rows: [log],
  } = await db.query(sql, [id, bookmark]);
  return log;
}
