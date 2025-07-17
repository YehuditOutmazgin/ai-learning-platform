import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/fetchs';

const UserList = ({ onSelectUser }: { onSelectUser: (id: string) => void }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers().then(res => setUsers(res));
  }, []);

  const filtered = users.filter((u: any) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="חיפוש משתמש"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((user: any) => (
          <li key={user._id} onClick={() => onSelectUser(user._id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
