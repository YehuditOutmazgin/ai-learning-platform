"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginThunk, signUpThunk, clearError } from "../../redux/slices/authSlice"
import type { RootState, AppDispatch } from "../../redux/store"
import "./../../styles/Auth.css"

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated, role } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin")
      } else {
        navigate("/user")
      }
    }
  }, [isAuthenticated, role, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [isLogin, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      return
    }

    if (isLogin) {
      await dispatch(loginThunk({ name, phone }))
    } else {
     await dispatch(signUpThunk({ name, phone }))
      if(!error){
      alert("user signed up succesfully.")
      setIsLogin(true)
      setName(name)
      setPhone(phone)}
    }
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="auth-header">
          <h1 className="auth-title">AI Learning Platform</h1>
          <p className=" auth-subtitle">{isLogin ? "Sign in to your account" : "Create a new account"}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className= {` btn btn-primary btn-full-width mb-16 ${isLogin? "signin":"signup"}`} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-switch-container" >
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="auth-switch-btn">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
