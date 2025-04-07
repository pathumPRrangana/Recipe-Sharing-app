import { setData } from "./utils";

export const seedMockData = () => {
  if (localStorage.getItem("recipes")) return;

  const recipes = [
    {
      id: "1",
      title: "Spaghetti Bolognese",
      cookingTime: "45 min",
      rating: 4.5,
      image: "https://img.taste.com.au/iefuclj7/w1200-h630-cfill/taste/2016/11/spaghetti-bolognese-106560-1.jpeg",
      ingredients: ["Spaghetti", "Tomato", "Beef", "Onion", "Garlic"],
      instructions: "Boil pasta. Cook beef. Mix with sauce. Done.",
    },
  ];

  const users = [
    {
      id: "user1",
      username: "test",
      password: "1234",
      favorites: ["1"],
    },
  ];

  setData("recipes", recipes);
  setData("users", users);
};
/*export const clearMockData = () => {
  localStorage.removeItem("recipes");
  localStorage.removeItem("users");
};*/