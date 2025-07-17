import React, { useEffect, useState } from 'react';
import Select from '../shared/Select';
import { createPrompt } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import '../../styles/conversation-view.css';
import '../../styles/all.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchCategoriesThunk, fetchSubCategoriesThunk } from '../../redux/slices/categorySlice';
import { Category ,SubCategory} from '../../types/prompt';
interface ConversationData {
    prompt: string;
    response: string;
}



// interface SubCategory {
//     _id: string;
//     name: string;
//     categoryId: Category;
// }

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
    const isFormValid = message.trim() !== '' && category !== '' && subcategory !== '';
    const { loading } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
        dispatch(fetchSubCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        setFilteredSubcategories(subcategories);
    }, [subcategories]);

    useEffect(() => {
        if (!category) {
            setFilteredSubcategories(subcategories);
        } else {
            if(!subcategory){
            const filtered = subcategories.filter((sub: SubCategory) => sub.categoryId._id === category);
            setFilteredSubcategories(filtered);
            }
            if (subcategory) {
                const sub=subcategories.find((s:SubCategory)=>s._id===subcategory)
                const stillValid = categories.find((cat: Category) => cat._id === sub?.categoryId._id);
                if (!stillValid) setSubcategory('');
            }
        }
    }, [category, subcategory, subcategories]);

    useEffect(() => {
        if (subcategory) {
            const selectedSub = subcategories.find((s) => s._id === subcategory);
            if (selectedSub && selectedSub.categoryId._id !== category) {
                setCategory(selectedSub.categoryId._id);
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

            <div className="selectors"> בחר קטגוריה ותת קטגוריה על מנת לשלוח בקשה לשיעור מה AI
                <div className='select'>
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
                    placeholder=" יש לבחור קטגוריה ותת קטגוריה על מנת לשלוח"
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={disabled}
                />
                <button onClick={handleSend} disabled={disabled || !isFormValid}>
                    {loading ? <div className="spinner"></div> : "↑ שלח"}
                </button>
            </div>
        </div>
    );
};

export default ConversationView;
