import React, { useEffect, useState } from 'react';
import '../../styles/login-sinup.css';
import '../../styles/all.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';


const Login = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated, role, error } = useSelector((state: RootState) => state.auth);
    const [e, setE] = useState('')
    const handleLogin = async () => {
        if (!name)
            setE('הכנס שם')
        else if (!phone ||phone.length<9)
            setE('הכנס מספר טלפון תקין');
        else {
            setE('');
            dispatch(loginThunk({ name, phone }));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'admin') {
                navigate('/categories');
            } else {
                navigate('/prompt');
            }
        }
    }, [isAuthenticated, role, navigate]);

    return (
        <div>
            <div id="gradient-bg">
                <div className="gradient-container"></div>
            </div>
            <div id="form-container">
                <h1 className="title label-title">התחברות</h1>
                <div className="label">
                    <div className="label-title">שם</div>
                    <input
                        type="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="label">
                    <div className="label-title">טלפון</div>
                    <input
                        type="input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <input
                    type="button"
                    className="submit"
                    value="לכניסה"
                    onClick={handleLogin}
                />
                {(e || error) && (
                    <p className="notCorrect">
                        {e}
                        {error && `: ${error}`}
                    </p>
                )}                <p>
                    אין לך חשבון?{' '}
                    <span
                        style={{ color: 'lightblue', cursor: 'pointer' }}
                        onClick={() => navigate('/signup')}
                    >
                        להרשמה
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
