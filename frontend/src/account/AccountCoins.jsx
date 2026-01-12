import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function AccountCoins({ coin, syncCoins }) {
  return (
    <ul>
      <h2>Your Active Coins</h2>
      <li className="coin"></li>
    </ul>
  );
}
