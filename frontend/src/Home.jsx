import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Welcome to RocketRug.io!</h1>
      <Link to="/coins">View Coin Listing</Link>
      <Link to="/about">Learn More</Link>
      <Link to="/register">Register an Account</Link>
    </>
  );
}
