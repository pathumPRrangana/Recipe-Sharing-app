export const delay = (ms) => new Promise((res) => setTimeout(res, ms));



// utils.js or wherever the setData function is located

// utils.js
export const setData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));  // Store data in localStorage
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  };
  
  export const getData = (key) => {
    // Retrieve data from localStorage by key, parse it and return the result
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  
  
  
  