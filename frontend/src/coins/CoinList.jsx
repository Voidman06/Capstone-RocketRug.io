import { Link } from "react-router-dom";

export default function CoinList({ coins = [] }) {
  return (
    <ul className="coin-list">
      {coins.map((coin) => (
        <CoinItem key={coin.id} coin={coin} />
      ))}
    </ul>
  );
}

function CoinItem({ coin }) {
  return (
    <Link to={`/coins/${coin.id}`}>
      <li className="coin-item">
        <img
          className="coin-image"
          src={coin.photo_url}
          alt={coin.name}
          width="75"
          height="75"
        />
        <p>{coin.name}</p>
      </li>
    </Link>
  );
}
