import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useContext(RecipeContext);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext);

  // Find the recipe based on the ID
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false;

  const handleFavorite = () => {
    if (recipe) {
      if (isFavorite) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe);
      }
    }
  };

  useEffect(() => {
    if (!recipe) {
      console.error('Recipe not found');
    }
  }, [recipe]);

  // If recipe is not found
  if (!recipe) {
    return <Typography variant="h6">Recipe not found</Typography>;
  }

  // Handle case where ingredients are a string and split them
  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : recipe.ingredients ? recipe.ingredients.split(',') : [];

  // Conditionally render cooking time and rating if valid
  const renderCookingTime = recipe.cookingTime && recipe.cookingTime !== 'N/A' ? `Cooking Time: ${recipe.cookingTime}` : null;
  const renderRating = recipe.rating && recipe.rating !== 0 ? `Rating: ${recipe.rating}` : null;

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4">{recipe.title}</Typography>

              {renderCookingTime && (
                <Typography variant="body1" color="textSecondary">{renderCookingTime}</Typography>
              )}
              
              {renderRating && (
                <Typography variant="body1" color="textSecondary">{renderRating}</Typography>
              )}

              <Button variant="contained" color="primary" onClick={handleFavorite} sx={{ mt: 2 }}>
                {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
              </Button>

              {recipe.createdBy === localStorage.getItem("userEmail") && (
                <Box mt={2}>
                  <Button onClick={() => navigate(`/edit/${recipe.id}`)} sx={{ mr: 1 }}>Edit</Button>
                  <Button color="error" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5">Ingredients</Typography>
          <ul>
            {ingredientsList.length > 0 ? (
              ingredientsList.map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No ingredients listed.</Typography>
            )}
          </ul>

          <Typography variant="h5">Instructions</Typography>
          <Typography variant="body1">{recipe.instructions}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDetails;
