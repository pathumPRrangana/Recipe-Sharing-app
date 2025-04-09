import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext'; // Import RecipeContext
import { FavoriteContext } from '../context/FavoriteContext'; // Import FavoriteContext
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const RecipeFeed = () => {
  const { recipes } = useContext(RecipeContext); // Access recipes from RecipeContext
  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext); // Access favorite functionality
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Initialize as an empty array
  const navigate = useNavigate(); // Use navigate for page routing

  // Effect to filter recipes based on search query
  useEffect(() => {
    console.log('Recipes from context:', recipes); // Ensure recipes are loaded correctly
    // Filter recipes based on search query
    if (search === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        String(recipe.cookingTime).includes(search.toLowerCase()) // Ensure cookingTime is treated as a string for filtering
      );
      setFilteredRecipes(filtered);
    }
  }, [search, recipes]); // Re-run whenever recipes or search changes

  // Handle adding/removing favorites
  const handleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.id === recipe.id)) {
      removeFavorite(recipe.id); // Remove from favorites
    } else {
      addFavorite(recipe); // Add to favorites
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Search field */}
      <TextField
        label="Search by title or cooking time"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: '20px' }} // Use sx prop for styling
      />
      
      {/* Grid to display recipes */}
      <Grid container spacing={8}>
        {filteredRecipes.length === 0 ? (
          <Typography variant="h6">No recipes found</Typography>
        ) : (
          filteredRecipes.map((recipe) => {
            // Provide fallback image if necessary
            const imageSrc = recipe.imageUrl || recipe.image || 'default-image-url.jpg'; // Default image if missing
            
            // Ensure cookingTime is a string and safely use replace
            const cookingTimeString = String(recipe.cookingTime);
            const cookingTime = cookingTimeString.replace(' min', ''); // Remove " min" safely
            
            return (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={recipe.title}
                    height="200"
                    image={imageSrc}  // Updated to use fallback image
                  />
                  <CardContent>
                    <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Cooking Time: {`${cookingTime} min`} {/* Safely display cooking time */}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">{`Rating: ${recipe.rating}`}</Typography>
                    
                    {/* View Recipe Button, using navigate() */}
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}  // Navigate without reload
                      fullWidth
                    >
                      View Recipe
                    </Button>
                    
                    {/* Favorite Button */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleFavorite(recipe)}
                      fullWidth
                      sx={{ marginTop: '10px' }} // Use sx prop for styling
                    >
                      {favorites.some((fav) => fav.id === recipe.id) 
                        ? 'Remove from Favorites' 
                        : 'Add to Favorites'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
        
      </Grid>
    </div>
  );
};

export default RecipeFeed;
