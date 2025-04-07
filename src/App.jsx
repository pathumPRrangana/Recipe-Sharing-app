import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
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

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
  },
});

const AppLayout = ({ children }) => {
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
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            Recipe Sharing Platform
          </Typography>
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
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <FavoriteProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<RecipeFeed />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/create" element={<RecipeForm />} />
                  <Route path="/edit/:id" element={<RecipeForm />} />
                  <Route path="/recipe/:id" element={<RecipeDetails />} />
                  <Route path="/my-recipes" element={<MyRecipes />} /> {/* ✅ New route */}
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </ThemeProvider>
        </FavoriteProvider>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
