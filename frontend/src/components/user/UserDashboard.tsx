
import React, { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import '../../styles/dashboard.css';
import '../../styles/all.css';
import { Prompt } from '../../types/prompt';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { name, role } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };
  useEffect(() => {
    if (role !== 'user') navigate('/login');
  }, [role]);

  return (
    <div className="dashboard-wrapper">
      <div className="welcome">
        <h2>שלום, {name || 'משתמש'}</h2>
        <button className="logout" onClick={handleLogout}>להתנתק</button>
      </div>

      <div className="dashboard-container">
        <div className="sidebar">
          <ConversationList />
        </div>
        <div className="main-content">
          <ConversationView />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
