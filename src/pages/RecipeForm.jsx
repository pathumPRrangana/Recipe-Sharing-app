import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRecipe } from "../context/RecipeContext";

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  const { createRecipe, updateRecipe, getRecipeById } = useRecipe();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipe data if editing
  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        setLoading(true);
        try {
          const recipeData = await getRecipeById(id);
          if (recipeData) {
            setRecipe(recipeData);
          } else {
            setError("Recipe not found.");
          }
        } catch {
          setError("Error loading recipe.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRecipe();
  }, [id, getRecipeById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Reset error message before submitting

    const { title, ingredients, instructions, imageUrl } = recipe;

    // Basic validation
    if (!title || !ingredients || !instructions) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      instructions,
      imageUrl,
      createdBy: userEmail || localStorage.getItem("userEmail"), // Ensure fallback for userEmail
    };

    try {
      if (id) {
        // Update existing recipe
        await updateRecipe(id, newRecipe);
        navigate("/my-recipes");
      } else {
        // Create new recipe
        await createRecipe(newRecipe);
        navigate("/");
      }
    } catch {
      setError("Error processing recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Recipe" : "Create Recipe"}
      </Typography>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Recipe Title"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleInputChange}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleInputChange}
          fullWidth
          required
          multiline
          rows={6}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Image URL (optional)"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {id ? "Update Recipe" : "Create Recipe"}
        </Button>
      </form>
    </Box>
  );
};

export default RecipeForm;
