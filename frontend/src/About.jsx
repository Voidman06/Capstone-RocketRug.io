export default function About() {
  return (
    <>
      <div className="about-page">
        <h1>About Us</h1>
        <p>
          RugRocket.io is a <strong>parody cryptocurrency simulator</strong>{" "}
          created to highlight the dark side of the market. New users begin with
          $100 in virtual funds and can either invest in crypto coins or make
          their own with a $25 deposit.
        </p>
        <p>
          Creators of a coin are granted an admin panel that grants them special
          controls and stats, including a <strong>Rug Pull</strong> button,
          which will immediately drop a coin's value and transfers the liquidity
          pool value in the creator's account wallet.
        </p>
        <h3>DISCLAIMERS</h3>
        <p>
          This simulator is purely made for entertainment and educational
          purposes and is a completely safe environment for users to play with
          the simplified mechanics behind the works of a crypto coin. It does
          not endorse or encourage malicious behavior within the real crypto
          market.
        </p>
        {/* <p>
          We will not implement any features that involve real-life currencies,
          however, tips/gratuities are welcome.
        </p> */}
        <p>
          The simulator may not be entirely accurate to real-world
          cryptocurrency systems.
        </p>
      </div>
    </>
  );
}
