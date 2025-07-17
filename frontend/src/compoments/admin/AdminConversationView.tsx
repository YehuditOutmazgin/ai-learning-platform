import React from 'react';
import { Prompt } from '../../types/prompt';
const AdminConversationView = ({ data }: { data: Prompt | null }) => {
  if (!data) return <div>בחר שיחה</div>;

  return (
    <div className="admin-view">
      <h3>שאלה</h3>
      <p>{data.prompt}</p>
      <h3>תשובה</h3>
      <p>{data.response}</p>
    </div>
  );
};

export default AdminConversationView;

