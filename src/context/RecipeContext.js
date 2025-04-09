import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { nanoid } from 'nanoid'; // For unique IDs

const RecipeContext = createContext();

// Initial state
const initialState = {
  recipes: [],
};

// Actions
const CREATE_RECIPE = 'CREATE_RECIPE';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';
const SET_RECIPES = 'SET_RECIPES';

// Reducer

const recipeReducer = (state, action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
};

// Hook to use the Recipe context
export const useRecipe = () => useContext(RecipeContext);

// Provider
const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Load recipes from localStorage on mount
  useEffect(() => {
    try {
      const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      dispatch({ type: SET_RECIPES, payload: savedRecipes });
    } catch (error) {
      console.error('Error loading recipes from localStorage', error);
    }
  }, []);

  // Save recipes to localStorage only if there are any
  useEffect(() => {
    if (state.recipes.length > 0) {
      try {
        localStorage.setItem('recipes', JSON.stringify(state.recipes));
      } catch (error) {
        console.error('Error saving recipes to localStorage', error);
      }
    }
  }, [state.recipes]);

  // Create a new recipe
  const createRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: nanoid() };  // Generate unique ID
    dispatch({ type: CREATE_RECIPE, payload: newRecipe });
  };

  // Update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    dispatch({ type: UPDATE_RECIPE, payload: updatedRecipe });
  };

  // Delete a recipe by id
  const deleteRecipe = (id) => {
    dispatch({ type: DELETE_RECIPE, payload: id });
  };

  // Get a recipe by id
  const getRecipeById = (id) => {
    return state.recipes.find((recipe) => recipe.id === id);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        getRecipeById,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
