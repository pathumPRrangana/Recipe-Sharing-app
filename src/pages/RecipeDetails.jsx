import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import { FavoriteContext } from '../context/FavoriteContext';
import Timer from './timer';

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === id);
    setRecipe(foundRecipe);
  }, [id, recipes]);

  if (!recipe) {
    return <Typography variant="h6">Recipe not found</Typography>;
  }

  const imageSrc =
    recipe.imageUrl || recipe.image || 'https://via.placeholder.com/500x300?text=No+Image';

  const cookingTime = parseInt(
    String(recipe.cookingTime || '').replace(/\D/g, '')
  );

  const handleFavorite = () => {
    if (favorites.some((fav) => fav.id === recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const renderIngredients = () => {
    if (!Array.isArray(recipe.ingredients)) return null;

    return recipe.ingredients.map((ingredient, index) => {
      if (typeof ingredient === 'string') {
        // User-added recipe (ingredients as string array)
        return <li key={index}>{ingredient}</li>;
      } else if (typeof ingredient === 'object' && ingredient.name) {
        // Mock/seeded recipe format
        return (
          <li key={index}>
            {ingredient.name}
            {Array.isArray(ingredient.alternatives) && ingredient.alternatives.length > 0 && (
              <div style={{ marginTop: '5px', fontSize: '0.9rem', color: 'gray' }}>
                <strong>Substitutes:</strong> {ingredient.alternatives.join(', ')}
              </div>
            )}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              alt={recipe.title}
              height="300"
              image={imageSrc}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {recipe.title}
              </Typography>

              {cookingTime && <Timer cookingTime={cookingTime} />}

              <Typography variant="body1" color="textSecondary">
                Rating: {recipe.rating || 'N/A'}
              </Typography>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleFavorite}
                sx={{ mt: 2 }}
              >
                {favorites.some((fav) => fav.id === recipe.id)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Ingredients</Typography>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul>{renderIngredients()}</ul>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No ingredients available.
            </Typography>
          )}

          <Typography variant="h5" mt={3}>
            Instructions
          </Typography>
          <Typography variant="body1">
            {recipe.instructions || 'No instructions provided.'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
