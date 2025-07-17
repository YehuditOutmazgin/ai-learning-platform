import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserPrompts } from '../../api/fetchs';
import '../../styles/all.css';
import '../../styles/userList.css';
import { User ,Prompt} from '../../types/prompt';
// interface User {
//   _id: string;
//   name: string;
// }

// interface Prompt {
//   _id: string;
//   prompt: string;
//   response: string;
// }

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  const handleUserClick = async (user: User) => {
    try {
      const prompts = await getUserPrompts(user._id);
      setUserPrompts(prompts);
      setSelectedUser(user);
      setShowModal(true);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="box">
      <h2 className="box-title">משתמשים</h2>
      <input
        className="input"
        type="text"
        placeholder="חיפוש משתמש"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list">
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            className="list-item"
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>שיחות של {selectedUser.name}</h3>
            <div className="scroll-box">
              {userPrompts.length > 0 ? (
                userPrompts.map((prompt) => (
                  <div key={prompt._id} className="prompt-item">
                    <p><strong>שאלה:</strong> {prompt.prompt}</p>
                    <p><strong>תשובה:</strong> {prompt.response}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>אין שיחות להצגה.</p>
              )}
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
