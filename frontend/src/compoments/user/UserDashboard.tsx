import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import '../../styles/dashboard.css';
import '../../styles/all.css';
import { Prompt } from '../../types/prompt'; // ✅ import full Prompt type

const UserDashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState<Prompt | null>(null);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ConversationList onSelect={(prompt: Prompt) => setSelectedConversation(prompt)} />
      </div>
      <div className="main-content">
        <ConversationView data={selectedConversation} />
      </div>
    </div>
  );
};

export default UserDashboard;
