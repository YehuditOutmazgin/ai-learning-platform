import React, { useState } from 'react';
import '../../styles/admin-dashboard.css';
import UserList from './UserList';
import AdminConversationList from './AdminConversationList';
// import AdminConversationView from './AdminConversationView';
import CategoryManager from './CategoryManager';
import { Prompt } from '../../types/prompt';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { name } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="admin-dashboard">
      <div className="welcome">
        <h2>שלום, {name || 'משתמש'}</h2>
        <button className="logout" onClick={handleLogout}>להתנתק</button>
      </div>       <div className="admin-content">
        <div className="admin-sidebar">
          <UserList 
          // onSelectUser={setSelectedUser} 
          />
        </div>
        <div className="admin-middle">
          <AdminConversationList 
          // userId={selectedUser}
           onSelectPrompt={setSelectedPrompt} />
        </div>
        <div className="admin-right">
          {/* <AdminConversationView data={selectedPrompt} /> */}
          <CategoryManager />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;