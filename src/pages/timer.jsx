import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

const Timer = ({ cookingTime }) => {
  const [timeLeft, setTimeLeft] = useState(cookingTime * 60); // Convert cookingTime to seconds (minutes * 60)
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrement time every second
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval); // Stop the timer when it reaches zero
    }

    return () => clearInterval(interval); // Cleanup on component unmount or when stopping timer
  }, [isRunning, timeLeft]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState); // Toggle timer start/stop
  };

  const resetTimer = () => {
    setTimeLeft(cookingTime * 60); // Reset the timer back to initial cooking time (in seconds)
    setIsRunning(false); // Stop the timer
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {/* Display timer countdown */}
      <Typography variant="h6">Timer: {formatTime(timeLeft)}</Typography>

      {/* Start/Pause button */}
      <Button
        variant="contained"
        color={isRunning ? "secondary" : "primary"}
        onClick={handleStartStop}
        sx={{ marginTop: '10px' }}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>

      {/* Reset button */}
      <Button
        variant="outlined"
        color="error"
        onClick={resetTimer}
        sx={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Reset
      </Button>
    </div>
  );
};

export default Timer;
