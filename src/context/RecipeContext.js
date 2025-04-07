import React, { createContext, useState, useEffect, useReducer, useContext } from 'react';

// Create a context
const RecipeContext = createContext();

// Define initial state
const initialState = {
  recipes: [],
};

// Actions
const CREATE_RECIPE = 'CREATE_RECIPE';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';
const SET_RECIPES = 'SET_RECIPES';

// Reducer function to manage recipe actions
const recipeReducer = (state, action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      // Ensure the new recipe has a unique ID
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

// Create and export useRecipe hook for easy consumption of context
export const useRecipe = () => {
  return useContext(RecipeContext);
};

const RecipeProvider = ({ children }) => {
  // Initialize state with the reducer function
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Load recipes from localStorage when the component mounts
  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      try {
        const parsedRecipes = JSON.parse(savedRecipes);
        dispatch({ type: SET_RECIPES, payload: parsedRecipes });
      } catch (error) {
        console.error('Error parsing recipes from localStorage', error);
      }
    } else {
      // Mock data in case no recipes are saved
      const mockRecipes = [
        {
          id: 1,
          title: 'Spaghetti Bolognese',
          cookingTime: '30 minutes',
          rating: 4.5,
          imageUrl: 'https://img.taste.com.au/iefuclj7/w1200-h630-cfill/taste/2016/11/spaghetti-bolognese-106560-1.jpeg',
        },
      
      ];
      dispatch({ type: SET_RECIPES, payload: mockRecipes });
    }
  }, []);

  // Sync recipes with localStorage every time state changes
  useEffect(() => {
    if (state.recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    }
  }, [state.recipes]);

  // Action functions to dispatch state changes
  const createRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() }; // Ensure the new recipe has a unique ID
    dispatch({ type: CREATE_RECIPE, payload: newRecipe });
  };

  const updateRecipe = (updatedRecipe) => {
    dispatch({ type: UPDATE_RECIPE, payload: updatedRecipe });
  };

  const deleteRecipe = (id) => {
    dispatch({ type: DELETE_RECIPE, payload: id });
  };

  const getRecipeById = (id) => {
    return state.recipes.find((recipe) => recipe.id === parseInt(id));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        createRecipe, // Changed to createRecipe for consistency
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
