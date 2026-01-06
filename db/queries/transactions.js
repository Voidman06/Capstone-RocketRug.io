import db from "#db/client";

export async function logTransaction(user_id, coin_id, type, amount, price) {
  const sql = `
    INSERT INTO transactions (user_id, coin_id, type, amount, price, log_time)
    VALUES
        ($1, $2, $3, $4, $5, NOW())
    RETURNING *
      
    FROM coins WHERE id = $1;
    RETURNING *;
    `;
  const {
    rows: [log],
  } = await db.query(sql, [user_id, coin_id, type, amount, price]);
  return log;
}
