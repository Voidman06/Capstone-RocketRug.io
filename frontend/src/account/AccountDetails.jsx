import { useEffect } from "react";

export default function AccountDetails({ account, syncAccount }) {
  useEffect(() => {
    syncAccount;
  });

  return (
    <>
      <h1>Welcome, {account.username}!</h1>
      <ul>
        <h2>Account Details</h2>
        <p>E-Mail: {account.email}</p>
        <p>Balance: {account.wallet}</p>
      </ul>
      <ul>
        <h2>Stats</h2>
        <p>Coins Created: {account.coins_created}</p>
        <p>Rugpulls: {account.rugpulls}</p>
      </ul>
    </>
  );
}
