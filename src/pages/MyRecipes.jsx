import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const { recipes, deleteRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const myRecipes = recipes.filter(recipe => recipe.createdBy === userEmail);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>My Recipes</Typography>
      <Grid container spacing={3}>
        {myRecipes.map((recipe) => (
          <Grid item xs={12} md={6} key={recipe.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{recipe.title}</Typography>
                <Typography variant="body2">Cooking Time: {recipe.cookingTime}</Typography>
                <Button onClick={() => navigate(`/recipe/${recipe.id}`)} sx={{ mt: 1 }}>View</Button>
                <Button onClick={() => navigate(`/edit/${recipe.id}`)} sx={{ mt: 1, ml: 1 }}>Edit</Button>
                <Button color="error" onClick={() => deleteRecipe(recipe.id)} sx={{ mt: 1, ml: 1 }}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyRecipes;
