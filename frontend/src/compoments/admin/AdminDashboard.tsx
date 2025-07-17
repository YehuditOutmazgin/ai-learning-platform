import React, { useState } from 'react';
import '../../styles/admin-dashboard.css';
import UserList from './UserList';
import AdminConversationList from './AdminConversationList';
import AdminConversationView from './AdminConversationView';
import CategoryManager from './CategoryManager';
import { getUserFromToken } from '../../utils/token';
import { Prompt } from '../../types/prompt';
const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-header">שלום {getUserFromToken()?.name}</h2>
      <div className="admin-content">
        <div className="admin-sidebar">
          <UserList onSelectUser={setSelectedUser} />
        </div>
        <div className="admin-middle">
          <AdminConversationList userId={selectedUser} onSelectPrompt={setSelectedPrompt} />
        </div>
        <div className="admin-right">
          <AdminConversationView data={selectedPrompt} />
          <CategoryManager />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
