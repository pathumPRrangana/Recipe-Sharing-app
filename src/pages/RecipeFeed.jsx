
import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';

const RecipeFeed = () => {
  const { recipes } = useContext(RecipeContext);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    if (search === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.cookingTime.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [search, recipes]);

  const handleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.id === recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search by title or ingredient"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <CardMedia
                component="img"
                alt={recipe.title}
                height="200"
                image={recipe.imageUrl}
              />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="textSecondary">{`Cooking Time: ${recipe.cookingTime}`}</Typography>
                <Typography variant="body2" color="textSecondary">{`Rating: ${recipe.rating}`}</Typography>
                <Button variant="contained" color="primary" href={`/recipe/${recipe.id}`} fullWidth>
                  View Recipe
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleFavorite(recipe)}
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  {favorites.some((fav) => fav.id === recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeFeed;
