import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../../services/mockApi/recipeApi";

export const fetchRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  return await getAllRecipes();
});

export const addRecipe = createAsyncThunk("recipes/add", async (recipe) => {
  return await createRecipe(recipe);
});

export const editRecipe = createAsyncThunk("recipes/edit", async ({ id, updated }) => {
  return await updateRecipe(id, updated);
});

export const removeRecipe = createAsyncThunk("recipes/delete", async (id) => {
  await deleteRecipe(id);
  return id;
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload);
      });
  },
});

export default recipesSlice.reducer;