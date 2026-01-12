import { Link } from "react-router-dom";

export default function CoinList({ coins = [] }) {
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
      <Link to={`/coins/${coin.id}`}>
        <img src={coin.photo_url} alt={coin.name} width="45" height="45" />
        <p>{coin.name}</p>
        <p>
          ${coin.value} ${coin.value_change}
        </p>
      </Link>
    </li>
  );
}
