import db from "#db/client";

export async function logTransaction(
  user_id,
  coin_id,
  trans_type,
  amount,
  price
) {
  const sql = `
    INSERT INTO transactions 
        (user_id, coin_id, trans_type, amount, price, log_time)
    VALUES
        ($1, $2, $3, $4, $5, NOW())
    RETURNING *
    `;
  const {
    rows: [log],
  } = await db.query(sql, [user_id, coin_id, trans_type, amount, price]);
  return log;
}
