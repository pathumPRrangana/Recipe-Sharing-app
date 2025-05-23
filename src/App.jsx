import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { AuthProvider } from "./context/AuthContext";
import { RecipeProvider } from "./context/RecipeContext";
import { FavoriteProvider } from "./context/FavoriteContext";

import RecipeFeed from "./pages/RecipeFeed";
import RecipeForm from "./pages/RecipeForm";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyRecipes from "./pages/MyRecipes";

import { seedMockData } from "./services/mockApi/mockData";

// 🌙 Custom theme context
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './context/ThemeContext';
import ThemeToggle from "./components/ThemeToggle"; // Adjust path if needed

// 🔁 Wrapper to apply dynamic theme based on context
const MuiThemeWrapper = () => {
  const { theme } = useThemeContext();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

// 🔁 Main app
const App = () => {
  useEffect(() => {
    seedMockData(); // Seed the mock data once on initial load
  }, []);

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <RecipeProvider>
          <FavoriteProvider>
            <MuiThemeWrapper />
          </FavoriteProvider>
        </RecipeProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
};

// 🔁 Layout with AppBar and routes
const AppLayout = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Recipe Sharing Platform
          </Typography>

          {/* 🌗 Theme toggle button */}
          <ThemeToggle />

          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          {userEmail ? (
            <>
              <Button color="inherit" onClick={() => navigate("/create")}>Create</Button>
              <Button color="inherit" onClick={() => navigate("/my-recipes")}>My Recipes</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RecipeFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
