import React, { useEffect, useState } from 'react';
import { getAllUsersPrompts } from '../../api/fetchs';
import { Prompt } from '../../types/prompt';
import '../../styles/all.css';
import '../../styles/admin-conversation-list.css';

type Props = {
  onSelectPrompt: (prompt: Prompt) => void;
};

const AdminConversationList: React.FC<Props> = ({ onSelectPrompt }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllUsersPrompts();
      const sorted = res.sort(
        (a: Prompt, b: Prompt) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPrompts(sorted);
      setFilteredPrompts(sorted);
    };
    fetch();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = prompts.filter((p) => {
      return (
        p.userId?.name?.toLowerCase().includes(term) ||
        p.categoryId?.name?.toLowerCase().includes(term) ||
        p.subCategoryId?.name?.toLowerCase().includes(term) ||
        p.prompt.toLowerCase().includes(term) ||
        p.response.toLowerCase().includes(term) ||
        new Date(p.createdAt).toLocaleDateString().includes(term)
      );
    });
    setFilteredPrompts(filtered);
  }, [search, prompts]);

  const openModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowModal(true);
  };

  return (
    <div className="box">
      <h2 className="box-title">רשימת כל השיחות</h2>
      <input
        className="input"
        placeholder="חיפוש לפי שם, קטגוריה, שאלה, תשובה, תאריך"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="scroll-box" style={{ maxHeight: '60vh', marginTop: 12 }}>
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt._id}
            className="conversation-item"
            onClick={() => openModal(prompt)}
          >
            <p><strong>{prompt.categoryId?.name || 'ללא קטגוריה'}</strong></p>
            <p>{prompt.categoryId?.name} → {prompt.subCategoryId?.name}</p>
            <p><strong>שאלה:</strong> {prompt.prompt.split(' ').slice(0, 4).join(' ')}...</p>
            <p><strong>תשובה:</strong> {prompt.response.split(' ').slice(0, 6).join(' ')}...</p>
            <p className="conversation-date">
              {new Date(prompt.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {showModal && selectedPrompt && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>שיחה של {selectedPrompt.userId.name}</h3>
            <p><strong>קטגוריה:</strong> {selectedPrompt.categoryId.name}</p>
            <p><strong>תת קטגוריה:</strong> {selectedPrompt.subCategoryId.name}</p>
            <p><strong>שאלה:</strong> {selectedPrompt.prompt}</p>
            <p><strong>תשובה:</strong> {selectedPrompt.response}</p>
            <p><strong>תאריך:</strong> {new Date(selectedPrompt.createdAt).toLocaleDateString()}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConversationList;
