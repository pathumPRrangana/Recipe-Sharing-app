import { delay, getData, setData } from "./utils";

export const signupUser = async ({ username, password }) => {
  await delay(400);
  const users = getData("users");
  if (users.some((u) => u.username === username)) {
    throw new Error("Username already exists.");
  }
  const newUser = { id: Date.now().toString(), username, password, favorites: [] };
  users.push(newUser);
  setData("users", users);
  return newUser;
};

export const loginUser = async ({ username, password }) => {
  await delay(400);
  const users = getData("users");
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) throw new Error("Invalid credentials.");
  return user;
};

export const toggleFavorite = async (userId, recipeId) => {
  await delay(300);
  const users = getData("users");
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) throw new Error("User not found.");

  const user = users[userIndex];
  const isFavorite = user.favorites.includes(recipeId);
  user.favorites = isFavorite
    ? user.favorites.filter((id) => id !== recipeId)
    : [...user.favorites, recipeId];

  users[userIndex] = user;
  setData("users", users);
  return user.favorites;
};
