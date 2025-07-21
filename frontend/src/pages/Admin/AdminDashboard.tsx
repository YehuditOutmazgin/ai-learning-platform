"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout/Layout"
import type { RootState, AppDispatch } from "../../redux/store"
import { fetchUsersThunk } from "../../redux/slices/userSlice"
import { fetchCategoriesThunk, fetchSubCategoriesThunk } from "../../redux/slices/categorySlice"
import { fetchPromptsThunk } from "../../redux/slices/promptSlice"
import UserManagement from "./UserManagement"
import CategoryManagement from "./CategoryManagement"
import ConversationManagement from "./ConversationManagement"
import LoadingSpinner from "../../components/Common/LoadingSpinner"

import "./../../styles/Admin.css"
import "./../../styles/Stats.css"
import "./../../styles/Tabs.css"

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState) => state.users)
  const { categories, subcategories } = useSelector((state: RootState) => state.categories)
  const { prompts } = useSelector((state: RootState) => state.prompts)

  const [activeTab, setActiveTab] = useState<"users" | "categories" | "conversations">("users")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([
        dispatch(fetchUsersThunk()),
        dispatch(fetchCategoriesThunk()),
        dispatch(fetchSubCategoriesThunk()),
        dispatch(fetchPromptsThunk()),
      ])
      setLoading(false)
    }

    loadData()
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />
      case "categories":
        return <CategoryManagement />
      case "conversations":
        return <ConversationManagement />
      default: <UserManagement />
    }
  }

  return (
    <Layout>
      <div className="width-full">
        <div className="tabs">
          <button className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
            Users
          </button>
          <button
            className={`tab ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={`tab ${activeTab === "conversations" ? "active" : ""}`}
            onClick={() => setActiveTab("conversations")}
          >
            Conversations
          </button>
        </div>

        <div className="main-content">{renderContent()}</div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
