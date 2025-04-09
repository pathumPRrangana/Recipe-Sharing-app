import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { useRecipe } from '../context/RecipeContext';

const RecipeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL
  const { createRecipe, updateRecipe, recipes } = useRecipe(); // Access create and update functions

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState(''); // Store as string for user input
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [rating, setRating] = useState('');

  // Populate form fields when editing a recipe
  useEffect(() => {
    if (id) {
      const recipeToEdit = recipes.find((recipe) => recipe.id === id);
      if (recipeToEdit) {
        setTitle(recipeToEdit.title);
        setImage(recipeToEdit.image || recipeToEdit.imageUrl || '');
        setIngredients(
          Array.isArray(recipeToEdit.ingredients)
            ? recipeToEdit.ingredients.join(', ')
            : ''
        );
        setInstructions(recipeToEdit.instructions);
        setCookingTime(recipeToEdit.cookingTime);
        setRating(recipeToEdit.rating);
      }
    }
  }, [id, recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients) {
      alert('Title and Ingredients are required!');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');

    const newRecipe = {
      id: id || crypto.randomUUID(),
      title,
      image,
      ingredients: ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient), // Remove empty strings
      instructions,
      cookingTime: Number(cookingTime) || 0,
      rating: Number(rating) || 0,
      createdBy: userEmail,
    };

    if (id) {
      updateRecipe(newRecipe);
    } else {
      createRecipe(newRecipe);
    }

    navigate('/');
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">{id ? 'Edit Recipe' : 'Create a Recipe'}</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Recipe Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={image}
                onChange={(e) => setImage(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Ingredients (comma separated)"
                variant="outlined"
                fullWidth
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Instructions"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
              <TextField
                label="Cooking Time (in minutes)"
                variant="outlined"
                fullWidth
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            <TextField
                label="Rating (0 - 5)"
                variant="outlined"
                fullWidth
                type="number"
                value={rating}
                onChange={(e) => {
                 const value = parseFloat(e.target.value);
                 if (value >= 0 && value <= 5) {
                   setRating(e.target.value);
                 } else if (e.target.value === '') {
                   setRating('');
                 }
                }}
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                sx={{ marginBottom: '20px' }}
                 />

              <Button variant="contained" color="primary" type="submit" fullWidth>
                {id ? 'Update Recipe' : 'Create Recipe'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RecipeForm;
