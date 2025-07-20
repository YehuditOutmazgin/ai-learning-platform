import React, { useEffect, useState } from 'react';
import '../../styles/admin-dashboard.css';
import UserList from './UserList';
import AdminConversationList from './AdminConversationList';
import CategoryManager from './CategoryManager';
import { Prompt } from '../../types/prompt';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const AdminDashboard = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { name, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    if (role !== 'admin') navigate('/login');
  }, [role]);
  return (
    <div className="admin-dashboard">
      <div className="welcome">
        <h2>שלום, {name || 'משתמש'}</h2>
        <button className="logout" onClick={handleLogout}>להתנתק</button>
      </div>       <div className="admin-content">
        <div className="admin-sidebar">
          <UserList
          />
        </div>
        <div className="admin-middle">
          <AdminConversationList
            onSelectPrompt={setSelectedPrompt} />
        </div>
        <div className="admin-right">
          <CategoryManager />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;