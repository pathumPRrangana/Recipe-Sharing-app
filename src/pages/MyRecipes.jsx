import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import {
  Card, CardContent, Typography, CardMedia, Grid,
  Button, TextField
} from '@mui/material';

const MyRecipes = () => {
  const { recipes, deleteRecipe, updateRecipe } = useContext(RecipeContext);
  const userEmail = localStorage.getItem("userEmail");

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const myRecipes = recipes.filter(recipe => recipe.createdBy === userEmail);

  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setEditFormData({ ...recipe });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = () => {
    updateRecipe(editFormData); // This must be implemented in your RecipeContext
    setEditingId(null);
  };

  if (!userEmail) {
    return <Typography variant="h6">Please log in to view your recipes.</Typography>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>My Recipes</Typography>
      <Grid container spacing={5}>
        {myRecipes.length === 0 ? (
          <Typography variant="h6">You have no recipes yet.</Typography>
        ) : (
          myRecipes.map((recipe) => (
            <Grid item xs={12} md={6} key={recipe.id}>
              <Card>
               
                <CardContent>
                  {editingId === recipe.id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={editFormData.title}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        label="Cooking Time (minutes)"
                        name="cookingTime"
                        type="number"
                        value={editFormData.cookingTime}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        label="Image URL"
                        name="imageUrl"
                        value={editFormData.imageUrl}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        label="Ingredients (comma-separated)"
                        name="ingredients"
                        value={editFormData.ingredients}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        label="Instructions"
                        name="instructions"
                        multiline
                        rows={3}
                        value={editFormData.instructions}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                      />
                      <Button onClick={saveEdit} variant="contained" color="success" sx={{ mt: 1 }}>
                        Save
                      </Button>
                      <Button onClick={cancelEdit} color="secondary" sx={{ mt: 1, ml: 1 }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <> 
                    <CardMedia
                    component="img"
                    alt={recipe.title}
                    height="200"
                    image={recipe.imageUrl || recipe.image || "https://via.placeholder.com/500x300?text=No+Image"}
                  />



                      <Typography variant="h5">{recipe.title}</Typography>
                      <Typography variant="body2">Cooking Time: {recipe.cookingTime}min</Typography>
                      <Button onClick={() => startEdit(recipe)} sx={{ mt: 1 }}>Edit</Button>
                      <Button color="error" onClick={() => deleteRecipe(recipe.id)} sx={{ mt: 1, ml: 1 }}>Delete</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default MyRecipes;
