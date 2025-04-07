import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, toggleFavorite } from "../../services/mockApi/userApi";


export const login = createAsyncThunk("auth/login", async (credentials) => {
  return await loginUser(credentials);
});

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  return await signupUser(credentials);
});

export const toggleFavoriteRecipe = createAsyncThunk(
  "auth/toggleFavorite",
  async ({ userId, recipeId }) => {
    return await toggleFavorite(userId, recipeId);
  }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
  };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {

    loginUser: (state, action) => {
        const { username, password } = action.payload;
        // Mock user authentication (In reality, you’d send this to an API)
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const stored = localStorage.getItem("user");
      if (stored) state.user = JSON.parse(stored);
    },

    signupUser: (state, action) => {
        const { username, password } = action.payload;
        // Save user in localStorage for mock auth
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
      },
      logoutUser: (state) => {
        localStorage.removeItem('user');
        state.user = null;
      },
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(login.rejected, signup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(toggleFavoriteRecipe.fulfilled, (state, action) => {
        if (state.user) state.user.favorites = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;