import React, { useEffect, useState } from 'react';
import '../../styles/login-sinup.css';
import '../../styles/all.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { set, useForm } from 'react-hook-form';
import { getUserFromToken } from '../../utils/token';

interface LoginFormData {
    name: string;
    phone: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { isAuthenticated, role, error } = useSelector(
        (state: RootState) => state.auth
    );

    const onSubmit = async (data: LoginFormData) => {
        try {

            const result = await dispatch(loginThunk(data))

            // if (result.type === "auth/login/fulfilled") {
            //     // alert(JSON.stringify(result));
                
            //     // const rol=result.payload.role;
            //     //data is the patient details or the therapist details
            //     // if (role === 'admin') {
            //     //     alert("admin c")
            //     //     navigate("/admin")
            //     // } else if (role === "user") {
            //     //     alert("user c")
            //     //     navigate('/user')
            //     // } else {
            //     //     alert("null c")
            //     // }
            // }

        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate(role === 'admin' ? '/admin' : '/user');
        }
    }, [isAuthenticated, role]);

    return (
        <div>
            <div id="form-container">
                <h1 className="form-title">פלטפורמת שיעורים מה-AI</h1>
                <div className="title label-title">כניסה למערכת</div>

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="label">
                        <label className="label-title">שם</label>
                        <input
                            type="text"
                            {...register('name', {
                                required: 'שם נדרש',
                                pattern: {
                                    value: /^[A-Za-zא-ת]{2,}$/,
                                    message: 'שם חייב להיות לפחות 2 אותיות',
                                },
                            })}
                            placeholder="הכנס שם"
                        />
                        {errors.name && (
                            <span className="notcorrect">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="label">
                        <label className="label-title">טלפון</label>
                        <input
                            type="text"
                            {...register('phone', {
                                required: 'טלפון נדרש',
                                minLength: {
                                    value: 9,
                                    message: 'הכנס מספר טלפון תקין',
                                },
                            })}
                            placeholder="הכנס מספר טלפון"
                        />
                        {errors.phone && (
                            <span className="notcorrect">{errors.phone.message}</span>
                        )}
                    </div>

                    {error && <div className="notcorrect">{error}</div>}

                    <button type="submit" className="submit" disabled={loading}>
                        {loading ? <div className="spinner"></div> : 'התחבר '}
                    </button>
                </form>

                <p className="signup-text">
                    אין לך חשבון?{' '}
                    <span className="signup-link" onClick={() => navigate('/signup')}>
                        להרשמה
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
