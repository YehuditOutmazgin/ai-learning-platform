import React, { useEffect, useState } from 'react';
import { getUserPrompts } from '../../api/fetchs';
import { Prompt } from '../../types/prompt';

const AdminConversationList = ({ userId, onSelectPrompt }: {
  userId: string | null;
  onSelectPrompt: (prompt: Prompt) => void;
}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (userId) {
      getUserPrompts(userId).then(res => setPrompts(res));
    }
  }, [userId]);

  const filtered = prompts.filter(p =>
    p.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="חיפוש בשיחה"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((p) => (
          <li key={p._id} onClick={() => onSelectPrompt(p)}>
            {p.prompt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminConversationList;
