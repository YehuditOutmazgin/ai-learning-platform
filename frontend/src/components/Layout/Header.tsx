"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import type { RootState } from "../../redux/store"
import "./../../styles/Header.css"

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { name, role } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div>
        <h1 className="header-title">AI Learning Platform</h1>
      </div>

      <div className="header-user-info">
        <div className="header-user-details">
          <span className="header-welcome-text">Welcome,</span>
          <span className="header-user-name">{name}</span>
          <span className={`badge ${role === "admin" ? "badge-admin" : "badge-user"}`}>{role}</span>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary text-medium">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
