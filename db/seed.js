import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createCoin } from "#db/queries/coins";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  //users
  await createUser(
    "BippityBoppity",
    "bippityboppity@rocketrug.io",
    "thi$1SApazsw@rd41sUre!"
  );
  await createUser(
    "CryptoVictim",
    "cryptovictim@rocketrug.io",
    "thi$1SApazsw@rd41sUre!"
  );

  //coins
  await createCoin(
    1,
    "Bippity Coin",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F013%2F937%2F801%2Foriginal%2Fbitcoin-logo-vector.jpg&f=1&nofb=1&ipt=d56e1331f56a624345b81ec6506b5e938a1d46481fa39d9b055dea9869ea710d"
  );
}
