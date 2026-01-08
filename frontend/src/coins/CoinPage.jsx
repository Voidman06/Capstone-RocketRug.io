import { useState, useEffect } from "react";
import { getCoins } from "../api/api";

import CoinList from "./CoinList";

export default function CoinPage() {
  const [coins, setCoins] = useState([]);

  const syncCoins = async () => {
    const data = await getCoins();
    setCoins(data);
  };

  useEffect(() => {
    syncCoins();
  }, []);

  return (
    <>
      <h1>Coin Listing</h1>
      <CoinList coins={coins} />
    </>
  );
}
