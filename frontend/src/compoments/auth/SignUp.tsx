import React, { useEffect, useState } from 'react';
import '../../styles/login-sinup.css';
import '../../styles/all.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpThunk } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignup = () => {
    dispatch(signUpThunk({ name, phone }));
       if (!loading && !error && name && phone) {
        alert("login")
      navigate('/login');
    }
  };

//   useEffect(() => {
 
//   }, [loading, error, name, phone, navigate]);

  return (
    <div>
      <div id="gradient-bg">
        <div className="gradient-container"></div>
      </div>
      <div id="form-container">
        <h1 className="title label-title">הרשמה</h1>
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
          value="להרשמה"
          onClick={handleSignup}
        />
        {error && <p className="notCorrect">{error}</p>}
        <p>
          יש לך חשבון?{' '}
          <span
            style={{ color: 'lightblue', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            להתחברות
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
