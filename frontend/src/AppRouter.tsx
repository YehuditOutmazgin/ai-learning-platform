import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './compoments/auth/Login';
import SignUp from './compoments/auth/SignUp';
import UserDashboard from './compoments/user/UserDashboard';
import AdminDashboard from './compoments/admin/AdminDashboard';
import { getUserFromToken } from './utils/token';

const AppRouter = () => {
  const user = getUserFromToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/prompt"
          element={
            user && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/categories"
          element={
            user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
