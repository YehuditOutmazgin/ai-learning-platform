"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { deletePromptThunk } from "../../redux/slices/promptSlice"
import SearchBox from "../../components/Common/SearchBox"
import Modal from "../../components/Common/Modal"
import type { Prompt } from "../../types/prompt"

import "./../../styles/Admin.css"
import "./../../styles/Table.css"
import "./../../styles/Message.css"

const ConversationManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { prompts, loading } = useSelector((state: RootState) => state.prompts)
  const { categories } = useSelector((state: RootState) => state.categories)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.categoryId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.subCategoryId.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !selectedCategory || prompt.categoryId._id === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleViewDetails = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setIsDetailModalOpen(true)
  }

  const handleDeletePrompt = async (promptId: string) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      await dispatch(deletePromptThunk(promptId))
      if (selectedPrompt?._id === promptId) {
        setIsDetailModalOpen(false)
        setSelectedPrompt(null)
      }
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h2 className="admin-title">Conversation Management</h2>
        <div className="admin-count">Total Conversations: {prompts.length}</div>
      </div>

      <div className="admin-filters">
        <div className="flex-1">
          <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="Search by question, user, category..." />
        </div>
        <div className="min-width-200">
          <select className="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card card-no-padding">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Category</th>
              <th>Question Preview</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrompts.map((prompt) => (
              <tr key={prompt._id}>
                <td className="table-cell-bold">{prompt.userId.name}</td>
                <td>
                  <div className="badge-container">
                    <span className="badge badge-user badge-small mr-4">{prompt.categoryId.name}</span>
                    <br />
                    <span className="badge badge-admin badge-small">{prompt.subCategoryId.name}</span>
                  </div>
                </td>
                <td>
                  <div className="table-cell-ellipsis">{prompt.prompt}</div>
                </td>
                <td className="table-cell-muted">{new Date(prompt.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleViewDetails(prompt)} className="btn btn-primary btn-small">
                      View
                    </button>
                    <button onClick={() => handleDeletePrompt(prompt._id)} className="btn btn-danger btn-small">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPrompts.length === 0 && (
          <div className="empty-state">
            <h3>No conversations found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Conversation Detail Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Conversation Details">
        {selectedPrompt && (
          <div>
            <div className="conversation-detail-header">
              <div className="conversation-detail-info">
                <div className="conversation-detail-user">
                  <h3>{selectedPrompt.userId.name}</h3>
                  <div className="conversation-detail-phone">{selectedPrompt.userId.phone}</div>
                </div>
                <div className="conversation-detail-date">{new Date(selectedPrompt.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <span className="badge badge-user mr-8">{selectedPrompt.categoryId.name}</span>
                <span className="badge badge-admin">{selectedPrompt.subCategoryId.name}</span>
              </div>
            </div>

            <div className="message-bubble user mb-16">
              <div className="message-header">
                <strong>User Question:</strong>
              </div>
              <div className="message-content">{selectedPrompt.prompt}</div>
            </div>

            <div className="message-bubble ai">
              <div className="message-header">
                <strong>AI Response:</strong>
              </div>
              <div className="message-content">{selectedPrompt.response}</div>
            </div>

            <div className="conversation-detail-actions">
              <button
                onClick={() => handleDeletePrompt(selectedPrompt._id)}
                className="btn btn-danger"
                disabled={loading}
              >
                Delete Conversation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ConversationManagement
