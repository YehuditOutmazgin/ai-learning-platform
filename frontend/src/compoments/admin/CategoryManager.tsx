import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllSubCategories } from '../../api/fetchs';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllCategories().then(res => setCategories(res));
    getAllSubCategories().then(res => setSubcategories(res));
  }, []);

  const filtered = categories.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="חיפוש קטגוריה"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((cat: any) => (
          <li key={cat._id}>
            <strong>{cat.name}</strong>
            <ul>
              {subcategories
                .filter((sub: any) => sub.categoryId === cat._id)
                .map((sub: any) => (
                  <li key={sub._id}>{sub.name}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
