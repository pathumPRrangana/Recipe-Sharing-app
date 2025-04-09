import { setData } from "./utils";  // Import setData function

export const seedMockData = () => {
  const existingRecipes = JSON.parse(localStorage.getItem("recipes"));
  const existingUsers = JSON.parse(localStorage.getItem("users"));

  console.log("Seeding mock data...");

  // Log existing data to see if it's being retrieved correctly
  console.log("Existing recipes:", existingRecipes);
  console.log("Existing users:", existingUsers);

  // If recipes already exist in localStorage, do not add new data
  if (existingRecipes && existingRecipes.length > 0) return;

  // Seed data
  const recipes = [
    {
      id: "1",
      title: "Spaghetti Bolognese",
      ingredients: [
        {
          name: "Spaghetti",
          alternatives: ["Zucchini noodles", "Rice noodles"]
        },
        {
          name: "Tomato",
          alternatives: ["Tomato paste", "Tomato sauce"]
        }
      ],
      cookingTime: "30 min",
      rating: 4.5,
      instructions: "Cook pasta, make sauce, combine.",
      image: "https://www.tamingtwins.com/wp-content/uploads/2025/01/spaghetti-bolognese-10.jpg" // Add a valid image URL here
    },
    
    {
      id: "2",
      title: "Chicken Curry",
      ingredients: [
        {
          name: "Chicken",
          alternatives: ["Tofu", "Paneer"]
        },
        {
          name: "Curry Powder",
          alternatives: ["Garam Masala", "Cumin"]
        }
      ],
      cookingTime: "30 min",
      rating: 4.0,
      instructions: "Cook chicken. Add curry powder. Stir in coconut milk.",
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg"
    }
   
  ];

  const users = [
    {
      id: "user1",
      username: "test",
      password: "1234",
      favorites: ["1"],
    },
  ];

  // Log the data being saved to localStorage
  console.log("Seeding recipes:", recipes);
  console.log("Seeding users:", users);

  // Save data to localStorage
  setData("recipes", recipes);  // Store the recipes with updated image URLs
  setData("users", users);  // Store users data (if needed)
};
