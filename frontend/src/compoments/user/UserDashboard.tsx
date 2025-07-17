
import React, { useState } from 'react';
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
  const [selectedConversation, setSelectedConversation] = useState<Prompt | null>(null);
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.auth);
  const navigate=useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <div className="dashboard-wrapper">
      <div className="welcome">
        <h2>שלום, {name || 'משתמש'}</h2>
        <button className="logout" onClick={handleLogout}>להתנתק</button>
      </div>

      <div className="dashboard-container">
        <div className="sidebar">
          <ConversationList onSelect={(prompt: Prompt) => setSelectedConversation(prompt)} />
        </div>
        <div className="main-content">
          <ConversationView data={selectedConversation} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
