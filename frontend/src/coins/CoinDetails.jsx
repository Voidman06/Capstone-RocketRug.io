import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getCoinById, buyCoin, sellCoin, getUserById } from "../api/api";

export default function CoinDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [coin, setCoin] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    async function fetchCoinAndOwner() {
      try {
        const coinData = await getCoinById(Number(id));
        setCoin(coinData);

        const ownerData = await getUserById(coinData.creator_id);
        setOwner(ownerData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinAndOwner();
  }, [id]);

  if (loading || !coin || !owner) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="page">
      <section>
        <h1>{coin.name}</h1>
        <img
          src={coin.photo_url}
          alt={coin.name}
          width="130"
          height="130"
        ></img>
        <h2>Made by: {owner.username}</h2>
      </section>
      <section></section>
    </div>
  );
}
