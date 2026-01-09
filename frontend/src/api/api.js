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
    throw Error(data.message || "Failed to fetch coins");
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
  let data;

  if (!response.ok) {
    throw Error(data.message || "Failed to fetch coin");
  }

  return response.json();
}

export async function createCoin(token, id) {
  const response = await fetch(API + `/coins/${id}/createcoin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error(data.message || "Failed to create coin");
  }

  return response.json();
}

export async function buyCoin(token, id) {
  const response = await fetch(API + `/coins/${id}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error(data.message || "Failed to buy coin");
  }

  return response.json();
}

export async function sellCoin(token, id) {
  const response = await fetch(API + `/coins/${id}/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error(data.message || "Failed to sell coin");
  }

  return response.json();
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
    throw Error(data.message || "Failed to rugpull coin");
  }

  return response.json();
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
    throw Error(data.message || "Failed to fetch users");
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
    throw Error(data.message || "Failed to fetch user");
  }

  return response.json();
}
