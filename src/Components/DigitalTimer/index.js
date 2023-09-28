import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const DigitalTimer = () => {
  const initialState = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  };

  const [timerState, setTimerState] = useState(initialState);

  const handleInput = (e) => {
    const value = parseInt(e.target.value);

    if (typeof value === "number" && isFinite(value)) {
      if (value > 0 ) {
        setTimerState((prevState) => ({
          ...prevState,
          timerLimitInMinutes: parseInt(e.target.value),
          timeElapsedInSeconds:0,
        }));
      }else{
        alert("enter > 0")
      }
    } else {
      alert("enter a number");
    }
  };

  const intervalId = useRef();

  const incrementTimeElapsedInSeconds = () => {
    setTimerState((prevState) => ({
      ...prevState,
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }));
  };

  const clearTimerInterval = () => {
    clearInterval(intervalId.current);
  };

  const onDecreaseTimerLimitInMinutes = () => {
    if (timerState.timerLimitInMinutes > 1) {
      setTimerState((prevState) => ({
        ...prevState,
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }));
    }
  };

  const onIncreaseTimerLimitInMinutes = () => {
    setTimerState((prevState) => ({
      ...prevState,
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }));
  };

  const onResetTimer = () => {
    clearTimerInterval();
    setTimerState(initialState);
  };

  const onStartOrPauseTimer = () => {
    const isTimerRunning = timerState.isTimerRunning;
    const isTimerCompleted =
      timerState.timeElapsedInSeconds === timerState.timerLimitInMinutes * 60;

    if (isTimerCompleted) {
      setTimerState((prevState) => ({
        ...prevState,
        timeElapsedInSeconds: 0,
      }));
    }

    if (isTimerRunning) {
      clearTimerInterval();
    } else {
      intervalId.current = setInterval(incrementTimeElapsedInSeconds, 1000);
    }

    setTimerState((prevState) => ({
      ...prevState,
      isTimerRunning: !prevState.isTimerRunning,
    }));
  };

  const getElapsedSecondsInTimeFormat = () => {
    const totalRemainingSeconds =
      timerState.timerLimitInMinutes * 60 - timerState.timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, []);

  return (
    <div className="app-container">
      <h1 className="heading">Digital Timer</h1>
      <div className="digital-timer-container">
        <div className="timer-display-container">
          <div className="elapsed-time-container">
            <h1 className="elapsed-time">{getElapsedSecondsInTimeFormat()}</h1>
            <p className="timer-state">
              {timerState.isTimerRunning ? "Running" : "Paused"}
            </p>
          </div>
        </div>
        <div className="controls-container">
          <div className="timer-controller-container">
            <button
              className="timer-controller-btn"
              onClick={onStartOrPauseTimer}
              type="button"
            >
              <img
                alt={timerState.isTimerRunning ? "pause icon" : "play icon"}
                className="timer-controller-icon"
                src={
                  timerState.isTimerRunning
                    ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                }
              />
              <p className="timer-controller-label">
                {timerState.isTimerRunning ? "Pause" : "Start"}
              </p>
            </button>
            <button
              className="timer-controller-btn"
              onClick={onResetTimer}
              type="button"
            >
              <img
                alt="reset icon"
                className="timer-controller-icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              />
              <p className="timer-controller-label">Reset</p>
            </button>
          </div>
          <div className="timer-limit-controller-container">
            <p className="limit-label">Set Timer limit</p>
            <div className="timer-limit-controller">
              <button
                className="limit-controller-button"
                disabled={timerState.isTimerRunning}
                onClick={onDecreaseTimerLimitInMinutes}
                type="button"
              >
                -
              </button>
              <div className="limit-label-and-value-container">
                {timerState.isTimerRunning ? (
                  <p className="limit-value">
                    {timerState.timerLimitInMinutes}
                  </p>
                ) : (
                  <input
                    type="text"
                    className="limit-value"
                    onChange={handleInput}
                    value={timerState?.timerLimitInMinutes}
                  />
                )}
              </div>
              <button
                className="limit-controller-button"
                disabled={timerState.isTimerRunning}
                onClick={onIncreaseTimerLimitInMinutes}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTimer;
