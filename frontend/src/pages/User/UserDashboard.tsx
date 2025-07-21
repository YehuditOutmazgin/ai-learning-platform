"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout/Layout"
import Sidebar from "../../components/Layout/Sidebar"
import type { RootState, AppDispatch } from "../../redux/store"
import { fetchPromptsThunk, sendPromptThunk, deletePromptThunk } from "../../redux/slices/promptSlice"
import { fetchCategoriesThunk, fetchSubCategoriesThunk } from "../../redux/slices/categorySlice"
import type { Prompt } from "../../types/prompt"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import "./../../styles/Conversation.css"
import "./../../styles/Message.css"

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { prompts, loading: promptLoading } = useSelector((state: RootState) => state.prompts)
  const { categories, subcategories, loading: categoryLoading } = useSelector((state: RootState) => state.categories)
  const { user } = useSelector((state: RootState) => state.auth)

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [filteredSubCategories, setFilteredSubCategories] = useState(subcategories)

  useEffect(() => {
    dispatch(fetchPromptsThunk())
    dispatch(fetchCategoriesThunk())
    dispatch(fetchSubCategoriesThunk())
  }, [dispatch])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter((sub) => sub.categoryId._id === selectedCategory)
      setFilteredSubCategories(filtered)

      // Auto-select first subcategory if available
      if (filtered.length > 0 && !selectedSubCategory) {
        setSelectedSubCategory(filtered[0]._id)
      }
    } else {
      setFilteredSubCategories(subcategories)
    }
  }, [selectedCategory, subcategories, selectedSubCategory])

  useEffect(() => {
    if (selectedSubCategory && !selectedCategory) {
      const subCategory = subcategories.find((sub) => sub._id === selectedSubCategory)
      if (subCategory) {
        setSelectedCategory(subCategory.categoryId._id)
      }
    }
  }, [selectedSubCategory, subcategories, selectedCategory])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedCategory || !selectedSubCategory || !user) {
      return 
    }

    await dispatch(
      sendPromptThunk({
        userId: user,
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        prompt: newMessage.trim(),
      }),
    )
    dispatch(fetchPromptsThunk());
    const newPrompt = prompts[0]
    setSelectedPrompt(newPrompt);
    setNewMessage("")
  }

  const handleDeletePrompt = async (promptId: string) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      await dispatch(deletePromptThunk(promptId))
      if (selectedPrompt?._id === promptId) {
        setSelectedPrompt(null)
      }
    }
  }

  const handleNewConversation = () => {
    setSelectedPrompt(null)
    setNewMessage("")
    setSelectedCategory("")
    setSelectedSubCategory("")
  }

  if (promptLoading || categoryLoading) {
    return <LoadingSpinner />
  }

  return (
    <Layout>
      <Sidebar>
        <div className="conversation-sidebar">
          <div className="conversation-sidebar-header">
            <h2 className="conversation-sidebar-title">Conversations</h2>
            <button onClick={handleNewConversation} className="btn btn-primary btn-small">
              + New
            </button>
          </div>

          <div className="conversation-list">
            {prompts.length === 0 ? (
              <div className="empty-state">
                <p>No conversations yet</p>
              </div>
            ) : (
              prompts.map((prompt) => (
                <div
                  key={prompt._id}
                  className={`conversation-item ${selectedPrompt?._id === prompt._id ? "active" : ""}`}
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  <div className="conversation-category">
                    {prompt.categoryId.name} → {prompt.subCategoryId.name}
                  </div>
                  <div className="conversation-preview">{prompt.prompt}</div>
                  <div className="conversation-meta">
                    <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePrompt(prompt._id)
                      }}
                      className="conversation-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Sidebar>

      <div className="main-content">
        {selectedPrompt ? (
          <div className="conversation-detail">
            <div className="mb-24 pb-16 border-bottom">
              <div className="flex flex-between mb-8">
                <div>
                  <h2 className="text-large font-bold mb-8">Conversation Details</h2>
                  <div className="text-medium text-muted">
                    <span className="badge badge-user mr-8">{selectedPrompt.categoryId.name}</span>
                    <span className="badge badge-admin">{selectedPrompt.subCategoryId.name}</span>
                  </div>
                </div>
                <div className="text-small text-muted">{new Date(selectedPrompt.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="message-bubble user">
              <div className="message-header">
                <strong>Your Question:</strong>
              </div>
              <div className="message-content">{selectedPrompt.prompt}</div>
            </div>

            <div className="message-bubble ai">
              <div className="message-header">
                <strong>AI Response:</strong>
              </div>
              <div className="message-content">{selectedPrompt.response}</div>
            </div>
          </div>
        ) : (
          <div className="message-form-container">
            <div className="message-form-header">
              <h2 className="message-form-title">Ask AI a Question</h2>
              <p className="message-form-subtitle">Select a category and subcategory, then ask your question</p>
            </div>

            <form onSubmit={handleSendMessage} className="card">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subcategory</label>
                <select
                  className="select"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  required
                  disabled={!selectedCategory}
                >
                  <option value="">Select a subcategory</option>
                  {filteredSubCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Your Question</label>
                <textarea
                  className="textarea"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your question here..."
                  required
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full-width"
                disabled={promptLoading || !selectedCategory || !selectedSubCategory || !newMessage.trim()||newMessage.length<5}
              >
                {promptLoading ? "Sending..." : "Send Question"}
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default UserDashboard
