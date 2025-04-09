import React, { createContext, useState, useEffect, useContext } from 'react';

// Context creation
const AuthContext = createContext();

// Custom hook for accessing the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }) => {
  // State to store the authenticated user or null
  const [user, setUser] = useState(null);

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // You can add additional validation for the user object here if needed
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }
  }, []);

  // Login function to set user and persist to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function to clear user and remove from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };