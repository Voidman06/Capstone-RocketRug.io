import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { createCoin, getAccount } from "../api/api";

export default function CoinCreate() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (!user) {
    return (
      <div className="page">
        <h1>Create a Coin</h1>
        <p>You must be logged in to create a coin.</p>
        <Link to="/login">Log in here.</Link>
      </div>
    );
  }

  const tryCreate = async (formData) => {
    setError(null);
    setLoading(true);

    const name = formData.get("name");
    const photoUrl = formData.get("photo_url");
    try {
      await createCoin(name, photoUrl);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="page">
      <h1>Create a Coin</h1>
      <form action={tryCreate}>
        <label>
          Coin Name
          <input type="text" name="name" required />
        </label>
        <label>
          Icon Image URL
          <input type="text" name="photo_url" required />
        </label>
        <button disabled={loading}>
          {loading ? "Creating..." : "Create ($25)"}
        </button>
        {error && <output>{error}</output>}
      </form>
    </div>
  );
}
