const API = import.meta.env.VITE_API;

// coins
export async function getCoins() {
  const response = await fetch(API + `/coins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw Error("Failed to fetch coins");
  }

  return response.json();
}

export async function getCoinById(id) {
  const response = await fetch(API + `/coins/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw Error("Failed to fetch coin");
  }

  return response.json();
}

export async function createCoin(token, name, photoUrl) {
  const response = await fetch(API + `/coins/createcoin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ name, photoUrl }),
  });

  if (!response.ok) {
    throw Error(response.message || "Failed to create coin");
  }

  return response.json();
}

export async function buyCoin(token, amount, id) {
  const response = await fetch(API + `/coins/${id}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw Error(response.message || "Failed to buy coin");
  }

  const message = await response.text();
  return message;
}

export async function sellCoin(token, amount, id) {
  const response = await fetch(API + `/coins/${id}/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw Error(response.message || "Failed to sell coin");
  }

  const message = await response.text();
  return message;
}

export async function rugPullCoin(token, id) {
  const response = await fetch(API + `/coins/${id}/rugpull`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error("Failed to rugpull coin");
  }

  const message = await response.text();
  return message;
}

// users
export async function getUsers() {
  const response = await fetch(API + `/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(API + `/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw Error("Failed to fetch user");
  }

  return response.json();
}

export async function getAccount(token) {
  const response = await fetch(API + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error("Failed to fetch account");
  }

  return response.json();
}
