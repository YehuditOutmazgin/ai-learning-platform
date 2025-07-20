import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { getUserFromToken } from './utils/token';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ProtectedRoute from './components/shared/ProtectedRoutes';

const AppRouter = () => {
  const { role, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>           <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
