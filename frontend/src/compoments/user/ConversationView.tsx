import React, { useEffect, useState } from 'react';
import Select from '../shared/Select';
import { createPrompt } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import '../../styles/conversation-view.css';
import '../../styles/all.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchCategories, fetchSubCategories } from '../../redux/slices/categorySlice';

interface ConversationData {
    prompt: string;
    response: string;
}

interface Category {
    _id: string;
    name: string;
}

interface SubCategory {
    _id: string;
    name: string;
    categoryId: string;
}

interface ConversationViewProps {
    data: ConversationData | null;
}

const ConversationView: React.FC<ConversationViewProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { name } = useSelector((state: RootState) => state.auth);
    const { categories, subcategories } = useSelector((state: RootState) => state.categories);

    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
    }, [dispatch]);

    useEffect(() => {
        setFilteredSubcategories(subcategories);
    }, [subcategories]);

    useEffect(() => {
        if (!category) {
            setFilteredSubcategories(subcategories);
        } else {
            const filtered = subcategories.filter((sub: SubCategory) => sub.categoryId === category);
            setFilteredSubcategories(filtered);

            if (subcategory) {
                const stillValid = filtered.some((sub: SubCategory) => sub._id === subcategory);
                if (!stillValid) setSubcategory('');
            }
        }
    }, [category, subcategory, subcategories]);

    useEffect(() => {
        if (subcategory) {
            const selectedSub = subcategories.find((s) => s._id === subcategory);
            if (selectedSub && selectedSub.categoryId !== category) {
                setCategory(selectedSub.categoryId);
            }
        }
    }, [subcategory, category, subcategories]);

    const onCategoryChange = (value: string) => {
        setCategory(value);
        if (value === '') {
            setSubcategory('');
        }
    };

    const onSubcategoryChange = (value: string) => {
        setSubcategory(value);
    };

    const handleSend = async () => {
        if (!message || !category || !subcategory || disabled) return;

        const user = getUserFromToken();
        if (!user || !user.userId) {
            setError('המשתמש לא מחובר');
            return;
        }
        if (!category) {
            alert("הכנס קטגוריה")
            setError("הכנס קטגוריה")
            return;
        }
        if (!subcategory) {
            setError("הכנס  תת קטגוריה")
            return;
        }
        setDisabled(true);
        setResponse('');
        setError('')

        try {
            const res = await createPrompt(user.userId, category, subcategory, message);
            setResponse(res.response);
        } catch (err) {
            setResponse('שגיאה בשליחה');
        } finally {
            setDisabled(false);
        }
    };

    const categoryOptions: Category[] = [...categories];
    const subcategoryOptions: SubCategory[] = [...filteredSubcategories];

    return (
        <div className="conversation-view">
            <h2 className="welcome">שלום, {name || 'משתמש'}</h2>

            <div className="selectors">
                <Select
                    label="קטגוריה"
                    value={category}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                />
                <Select
                    label="תת־קטגוריה"
                    value={subcategory}
                    onChange={onSubcategoryChange}
                    options={subcategoryOptions}
                />
            </div>

            <div className="chat-box">
                {data && <div className="prev-message">{data.prompt} → {data.response}</div>}
                {error && <div className='error'>{error}</div>}
                {response && <div className="ai-response">{response}</div>}
            </div>

            <div className="send-area">
                <input
                    type="text"
                    value={message}
                    placeholder="כתוב שאלה"
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={disabled}
                />
                <button onClick={handleSend} disabled={disabled}>שלח</button>
            </div>
        </div>
    );
};

export default ConversationView;
