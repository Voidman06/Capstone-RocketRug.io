import { NavLink } from "react-router";

import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";

import { getAccount } from "../api/api";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <header className="navbar">
      <NavLink id="brand" to="/">
        <img
          src="/rocket-2-svgrepo-com.svg"
          alt="RocketRug.io Logo"
          width="24"
        />
        <p>RocketRug.io</p>
      </NavLink>
      <nav id="user-links">
        {token && user ? (
          <>
            <p>
              <strong>Balance:</strong> ${user.wallet}
            </p>
            <NavLink to="/coins">Coins</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/coins/create">Create Coin</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/login" onClick={logout}>
              Log Out
            </NavLink>
          </>
        ) : token ? (
          <p>Loading...</p>
        ) : (
          <>
            <NavLink to="/coins">Coins</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
