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
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>RocketRug.io</p>
      </NavLink>
      <NavLink to="/coins">Coins</NavLink>
      <NavLink to="/about">About</NavLink>
      <nav>
        {token && user ? (
          <>
            <NavLink to="/coins/create">Create Coin</NavLink>
            <p>Balance: ${user.wallet}</p>
            <NavLink to="/account">Account</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : token ? (
          <p>Balance: loading...</p>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>,
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
