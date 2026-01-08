import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoins } from "../api/api";

export default function BookList({ coins, syncCoins }) {
  return (
    <ul>
      {coins.map((coin) => (
        <CoinItem key={coin.id} coin={coin} syncCoins={syncCoins} />
      ))}
    </ul>
  );
}
function CoinItem({ coin }) {
  return (
    <li className="coinItem">
      <Link to={`/coins/${coin.id}`}>{coin.name}</Link>
      <img src={coin.photoUrl} alt={coin.name} width="45" height="45" />
      <p>Made by {coin.name}</p>
    </li>
  );
}
