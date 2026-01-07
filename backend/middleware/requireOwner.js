import { getCoinById } from "#db/queries/coins";

/** Requires the coin admin */
export default async function requireOwner(req, res, next) {
  try {
    const user_id = req.user.id;
    const coin = req.coin;

    if (coin.creator_id !== user_id) {
      return res.status(403).send("Forbidden");
    }

    next();
  } catch (error) {
    next(error);
  }
}
