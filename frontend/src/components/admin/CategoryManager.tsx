import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  fetchCategoriesThunk,
  fetchSubCategoriesThunk,
  addCategoryThunk,
  addSubCategoryThunk,
} from '../../redux/slices/categorySlice';
import '../../styles/all.css';
import '../../styles/category-manager.css';
import { SubCategory } from '../../types/subCategory';
import { Category } from '../../types/category';

const CategoryManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, subcategories } = useSelector((state: RootState) => state.categories);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isAddCategory, setIsAddCategory] = useState(true);
  const [newName, setNewName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [message, setMessage] = useState('');
  const [searchFiltered, setSearchFiltered] = useState<FilteredCategory[]>([]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchSubCategoriesThunk());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newName.trim()) {
      alert(" הכנס שם ")
      return;
    }
    try {
      if (isAddCategory) {
        await dispatch(addCategoryThunk({ name: newName })).unwrap();
        setMessage(`קטגוריה  '${newName}'  נוספה בהצלחה  `);
      } else {
        if (!selectedCategoryId) return;
        await dispatch(addSubCategoryThunk({ name: newName, categoryId: selectedCategoryId })).unwrap();
        setMessage(`תת - קטגוריה  '${newName}'  נוספה בהצלחה  `);
      }
      setNewName('');
      setSelectedCategoryId('');
      setShowModal(false);
    } catch (error: any) {
      setMessage(error.message || 'שגיאה');
    }
  };


  type FilteredCategory = {
    _id: string;
    name: string;
    subs: SubCategory[];
  };

  useEffect(() => {
    setMessage('')
    const searchLower = search.toLowerCase();
    const filtered: FilteredCategory[] = categories.map((cat: Category) => {
      const matchCat = cat.name.toLowerCase().includes(searchLower);
      const subsInCat = subcategories.filter(
        (sub: SubCategory) => sub.categoryId._id === cat._id
      );

      const matchingSubs = matchCat
        ? subsInCat
        : subsInCat.filter((sub) => sub.name.toLowerCase().includes(searchLower));

      if (matchCat || matchingSubs.length > 0) {
        return {
          _id: cat._id,
          name: cat.name,
          subs: matchingSubs,
        };
      }

      return null;
    }).filter(Boolean) as FilteredCategory[];

    setSearchFiltered(filtered);
  }, [search, categories, subcategories]);

  return (
    <div className="category-manager">
      <h2 className="box-title">קטגוריות</h2>
      <div className="header">
        <button onClick={() => setShowModal(true)}>הוסף קטגוריה / תת־קטגוריה</button>
        <input
          type="text"
          placeholder="חיפוש לפי שם..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {(
        <ul className="search-results">
          {searchFiltered.map((cat: any) => (
            <li key={cat._id}>
              <strong>{cat.name}</strong>
              <ul>
                {cat.subs.map((sub: any) => (
                  <li key={sub._id}>
                    {sub.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}


      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isAddCategory ? 'הוסף קטגוריה' : 'הוסף תת־קטגוריה'}</h3>
            <div className="toggle-buttons">
              <button onClick={() => setIsAddCategory(true)} className={isAddCategory ? 'active' : ''}>קטגוריה</button>
              <button onClick={() => setIsAddCategory(false)} className={!isAddCategory ? 'active' : ''}>תת־קטגוריה</button>
            </div>

            {!isAddCategory && (
              <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option value="">בחר קטגוריה</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="שם"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className='close-btn' onClick={handleAdd}>שלח</button>
            <button className='close-btn' onClick={() => setShowModal(false)}>סגור</button>
          </div>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CategoryManager;
