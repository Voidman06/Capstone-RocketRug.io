import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getCoinById,
  buyCoin,
  sellCoin,
  getUserById,
  rugPullCoin,
  getAccount,
} from "../api/api";

export default function CoinDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [coin, setCoin] = useState(null);
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

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

  useEffect(() => {
    async function fetchAccount(token) {
      if (token) {
        try {
          const userData = await getAccount(token);
          setUser(userData);
        } catch (error) {
          setError(error.message);
        }
      }
    }

    fetchAccount(token);
  }, [token]);

  function buyCoinHandler(formData) {
    const amount = formData.get("amount");
    buyCoin(amount);
  }

  function sellCoinHandler(formData) {
    const amount = formData.get("amount");
    sellCoin(amount);
  }

  function panelCheck() {
    if (!user || user === null) {
      return (
        <section>
          <p>Want to invest in this coin?</p>
          <Link to="/register">Register now!</Link>
        </section>
      );
    }
    if (user) {
      return (
        <section>
          <h2>Investment Panel</h2>
          <h3>Your Balance: ${user.wallet}</h3>
          <form action={buyCoinHandler}>
            <label>
              <input type="number" name="amount" min="1" />
            </label>
            <button>Buy Coin</button>
          </form>
          <form action={sellCoinHandler}>
            <label>
              <input type="number" name="amount" min="1" />
            </label>
            <button>Sell Coin</button>
          </form>
        </section>
      );
    }
    if (admin) {
      return (
        <section>
          <h2>Admin Control Panel</h2>
          <h3>Current Coin Supply: {coin.supply}</h3>
          <button>Mint Coin</button>
          <button>Burn Coin</button>
          <button>Rugpull Coin</button>
        </section>
      );
    }
  }

  if (loading || !coin || !owner) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="coin_page">
      <section>
        <h1>{coin.name}</h1>
        <img
          src={coin.photo_url}
          alt={coin.name}
          width="130"
          height="130"
        ></img>
        <h3>Made by: {owner.username}</h3>
        <h2>
          ${coin.value} ${coin.value_change}
        </h2>
      </section>
      <section className="coin_panel">{panelCheck()}</section>
    </div>
  );
}
