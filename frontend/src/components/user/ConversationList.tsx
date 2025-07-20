import React, { useEffect, useState } from 'react';
import { getUserPrompts } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import '../../styles/conversation-list.css'
import '../../styles/all.css';
import { Prompt } from '../../types/prompt';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const ConversationList = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchPrompts = async () => {
            const user = getUserFromToken();
            if (!user?.userId) return;

            try {
                const res = await getUserPrompts(user.userId);
                const sorted = res.sort(
                    (a: Prompt, b: Prompt) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setPrompts(sorted);
            } catch (err) {
                setError('Failed to fetch prompts');
            } finally {
                setLoading(false);
            }
        };

        fetchPrompts();
    }, [dispatch]);

    if (loading) return <div className="conversation-list">Loading...</div>;
    if (error) return <div className="conversation-list error">{error}</div>;
    const openModal = (prompt: Prompt) => {
        setSelectedPrompt(prompt);
        setShowModal(true);
    };
    return (
        <div className="conversation-list">
            <h2 style={{ color: 'black' }}>רשימת השיחות שלי</h2>
            {prompts.map((prompt) => (
                <div
                    key={prompt._id}
                    className="conversation-item"
                    onClick={() => openModal(prompt)
                    }>
                    <p className="conversation-title">{prompt.prompt.slice(0, 30)}...</p>
                    {prompt.subCategoryId.name} {"->"} {prompt.categoryId.name}
                    <br />
                    {prompt.response.slice(0, 30)}...
                    <p className="conversation-date">
                        {new Date(prompt.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}

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

export default ConversationList;
