DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS coins;
DROP TABLE IF EXISTS coin_history;
DROP TABLE IF EXISTS transactions;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  wallet decimal NOT NULL,
  rugpulls integer NOT NULL,
  coins_created integer NOT NULL,
  register_time timestamp NOT NULL
);

CREATE TABLE coins (
  id serial PRIMARY KEY,
  creator_id integer NOT NULL,
  name text NOT NULL UNIQUE,
  photo_url text NOT NULL,
  value decimal NOT NULL,
  value_change decimal NOT NULL,
  volatility_lvl integer NOT NULL,
  liquidity decimal NOT NULL,
  supply integer NOT NULL,
  rugpulled boolean NOT NULL DEFAULT false,
  created_time timestamp NOT NULL
);

CREATE TABLE coin_history (
  id serial PRIMARY KEY,
  coin_id integer NOT NULL,
  value decimal NOT NULL,
  value_change decimal NOT NULL,
  supply integer NOT NULL,
  bookmark boolean NOT NULL,
  log_time timestamp NOT NULL
);

CREATE TABLE transactions (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  coin_id integer NOT NULL,
  trans_type text NOT NULL,
  amount integer NOT NULL,
  price decimal NOT NULL,
  log_time timestamp NOT NULL
);