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
  const [rugged, setRugged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoinAndOwner() {
      try {
        setLoading(true);
        const coinData = await getCoinById(Number(id));
        setCoin(coinData);
        console.log(coinData);

        setRugged(coinData.rugpulled === true);
        console.log(rugged);

        const ownerData = await getUserById(coinData.creator_id);
        setOwner(ownerData);
        console.log(ownerData);
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
      setLoading(true);
      if (token) {
        try {
          const userData = await getAccount(token);
          setUser(userData);
          console.log(userData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchAccount(token);
  }, [token]);

  useEffect(() => {
    async function checkAdmin() {
      if (user && user.id === owner.id) {
        try {
          setAdmin(true);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    checkAdmin();
  }, [user, owner]);

  async function buyCoinHandler(formData) {
    const amount = formData.get("amount");
    await buyCoin(token, amount, id);
    navigate(0);
  }

  async function sellCoinHandler(formData) {
    const amount = formData.get("amount");
    await sellCoin(token, amount, id);
    navigate(0);
  }

  async function rugPullCoinHandler() {
    await rugPullCoin(token, id);
    navigate(0);
  }

  // function mintCoinHandler(formData) {
  //   const amount = formData.get("amount");
  //   mintCoin(token, amount, id);
  // }

  // function burnCoinHandler(formData) {
  //   const amount = formData.get("amount");
  //   burnCoin(token, amount, id);
  // }

  function panelCheck() {
    if (user && admin === true) {
      return (
        <section>
          <h2>Admin Control Panel</h2>
          <h3>
            Current Supply: {coin.supply} {coin.supply === 1 ? "coin" : "coins"}
          </h3>
          <h3>Liquidity Pool: ${coin.liquidity}</h3>
          {/* <form action={mintCoinHandler}>
            <label>
              <input type="number" name="amount" min="100" />
            </label>
            <button>Mint</button>
          </form>
          <form action={burnCoinHandler}>
            <label>
              <input type="number" name="amount" min="100" />
            </label>
            <button>Burn</button>
          </form> */}
          <button onClick={rugPullCoinHandler}>Rug Pull</button>
        </section>
      );
    }
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
            <button>Buy</button>
          </form>
          <form action={sellCoinHandler}>
            <label>
              <input type="number" name="amount" min="1" />
            </label>
            <button>Sell</button>
          </form>
        </section>
      );
    }
  }

  if (loading === true || !coin || !owner) {
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
        <h2 class>Value: {rugged ? "ERR" : `$${coin.value}`}</h2>
        <h2>Value Change: {rugged ? "ERR" : `${coin.value_change}%`}</h2>
      </section>
      <section className="coin_panel">{panelCheck()}</section>
    </div>
  );
}
