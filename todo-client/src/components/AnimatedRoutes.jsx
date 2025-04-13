import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import Task from '../pages/Task';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import AllTasks from '../pages/AllTasks';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageTransition}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div {...pageTransition}>
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
                <motion.div {...pageTransition}>
                    <Calendar />
                </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <motion.div {...pageTransition}>
                <Dashboard />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <motion.div {...pageTransition}>
                <Task />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <motion.div {...pageTransition}>
                <AllTasks />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <motion.div {...pageTransition}>
                <Profile />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <motion.div {...pageTransition}>
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
