import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <img
          src="/rocket-2-svgrepo-com.svg"
          alt="RocketRug.io Logo"
          width="50"
        />
        <h1>Welcome to RocketRug.io!</h1>
        <h2>"Hop on, we're going to the moon!"</h2>
        <h3>
          The <em>safest</em> place to experience the crypto market.
        </h3>
        <section className="home-links">
          <Link to="/coins">View Coin Listing</Link>
          <Link to="/about">Learn More</Link>
          <Link to="/register">Register an Account</Link>
        </section>
      </div>
    </>
  );
}
