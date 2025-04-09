import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { Button } from "@mui/material";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeToggle;
