import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getCoin, buyCoin, sellCoin, getUserById } from "../api/api";

export default function CoinDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState();

  const [coin, setCoin] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    async function fetchCoinAndOwner() {
      try {
        const coinData = await getCoin(id);
        if (!response.ok) {
          throw new Error("Failed to fetch coin");
        }

        const result = await response.json();
        setCoin(result);

        const ownerData = await getUserById(coinData.creator_id);
        setOwner(ownerData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinAndOwner();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="page">
      <h1>{coin.name}</h1>

      <section>
        <h2>Made by: {owner.username}</h2>
      </section>

      <section>
        <pre>{JSON.stringify(coin, null, 2)}</pre>
      </section>
    </div>
  );
}
