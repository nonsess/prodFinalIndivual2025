import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ActiveWorkout from "../pages/ActiveWorkout/ActiveWorkout";
import Exercises from "../pages/Exercises/Exercises";
import History from "../pages/History/History";
import Intro from "../pages/Intro/Intro";
import Profile from "../pages/Profile/Profile";
import Workouts from "../pages/Workouts/Workouts";

export const AppRoutes = () => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');

    return (
        <BrowserRouter basename="/">
        <Routes>
          <Route path="intro" element={<Intro />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/workouts/:id" element={<ActiveWorkout />} />
          <Route path="history" element={<History />} />
          <Route path="/" element={<Navigate to={hasSeenIntro ? "exercises" : "intro"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    )
}