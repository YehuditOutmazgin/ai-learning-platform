import React, { useEffect, useState } from 'react';
import { getUserPrompts } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import '../../styles/conversation-list.css'
import '../../styles/all.css';
import { Prompt } from '../../types/prompt';


type Props = {
    onSelect: (prompt: Prompt) => void;
};

const ConversationList = ({ onSelect }: Props) => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPrompts = async () => {
            const user = getUserFromToken();
            if (!user?.userId) return;

            try {
                const res = await getUserPrompts(user.userId);
                setPrompts(res);
            } catch (err) {
                setError('Failed to fetch prompts');
            } finally {
                setLoading(false);
            }
        };

        fetchPrompts();
    }, []);

    if (loading) return <div className="conversation-list">Loading...</div>;
    if (error) return <div className="conversation-list error">{error}</div>;

    return (
        <div className="conversation-list">
            <h2 style={{ color: 'black' }}>רשימת השיחות שלי</h2>
            {prompts.map((prompt) => (
                <div
                    key={prompt._id}
                    className="conversation-item"
                    onClick={() => onSelect(prompt)}
                >
                    <p className="conversation-title">{prompt.prompt.slice(0, 30)}...</p>


                    {prompt.subCategoryId.name} {"->"} {prompt.categoryId.name}
                    <br />
                    {prompt.response.slice(0, 30)}...
                    <p className="conversation-date">
                        {new Date(prompt.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ConversationList;
