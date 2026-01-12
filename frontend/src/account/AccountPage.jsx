import { useEffect } from "react";

export default function AccountDetails({ account, syncAccount }) {
  useEffect(() => {
    syncAccount;
  });

  return (
    <>
      <h1>Welcome, {account.username}!</h1>
      <ul>
        <h2>E-Mail Address</h2>
        <p>E-Mail: {account.email}</p>
      </ul>
      <ul>
        <h2>Transactions</h2>
        <p>E-Mail: {account.email}</p>
      </ul>
    </>
  );
}
