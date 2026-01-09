import { Link } from "react-router-dom";

export default function CoinList({ coins = [] }) {
  if (!Array.isArray(coins)) {
    console.log("coins prop:", coins, Array.isArray(coins));
    return <p>Invalid coin data</p>;
  }

  if (!coins.length) {
    return <p>No coins available.</p>;
  }

  return (
    <ul>
      {coins.map((coin) => (
        <CoinItem key={coin.id} coin={coin} />
      ))}
    </ul>
  );
}

function CoinItem({ coin }) {
  return (
    <li className="coinItem">
      <Link to={`/coins/${coin.id}`}>{coin.name}</Link>
      <img src={coin.photo_url} alt={coin.name} width="45" height="45" />
    </li>
  );
}
