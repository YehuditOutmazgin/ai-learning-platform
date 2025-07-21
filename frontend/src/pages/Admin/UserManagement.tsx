"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { updateUserThunk, deleteUserThunk } from "../../redux/slices/userSlice"
import { getUserPrompts } from "../../api/fetchs"
import SearchBox from "../../components/Common/SearchBox"
import Modal from "../../components/Common/Modal"
import type { User } from "../../types/user"
import type { Prompt } from "../../types/prompt"

import "./../../styles/Admin.css"
import "./../../styles/Table.css"

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading } = useSelector((state: RootState) => state.users)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPromptsModalOpen, setIsPromptsModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", phone: "" })

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.phone.includes(searchTerm),
  )

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditForm({ name: user.name, phone: user.phone })
    setIsEditModalOpen(true)
  }

  const handleViewUserPrompts = async (user: User) => {
    setSelectedUser(user)
    try {
      const prompts = await getUserPrompts(user._id)
      setUserPrompts(prompts)
      setIsPromptsModalOpen(true)
    } catch (error) {
      console.error("Error fetching user prompts:", error)
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUser) {
      await dispatch(
        updateUserThunk({
          userId: selectedUser._id,
          updateData: editForm,
        }),
      )
      setIsEditModalOpen(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      await dispatch(deleteUserThunk(userId))
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h2 className="admin-title">User Management</h2>
        <div className="admin-count">Total Users: {users.length}</div>
      </div>

      <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="Search users by name or phone..." />

      <div className="card card-no-padding">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="table-cell-bold">{user.name}</td>
                <td>{user.phone}</td>
                <td className="table-cell-muted">Recently</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleViewUserPrompts(user)} className="btn btn-secondary btn-small">
                      View Chats
                    </button>
                    <button onClick={() => handleEditUser(user)} className="btn btn-primary btn-small">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger btn-small">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
        <form onSubmit={handleUpdateUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="input"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              className="input"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-12 flex-end">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Update User
            </button>
          </div>
        </form>
      </Modal>

      {/* User Prompts Modal */}
      <Modal
        isOpen={isPromptsModalOpen}
        onClose={() => setIsPromptsModalOpen(false)}
        title={`Conversations - ${selectedUser?.name}`}
      >
        <div className="modal-content-scroll">
          {userPrompts.length === 0 ? (
            <div className="empty-state">
              <p>No conversations found for this user</p>
            </div>
          ) : (
            userPrompts.map((prompt) => (
              <div key={prompt._id} className="card mb-16">
                <div className="mb-8">
                  <span className="badge badge-user mr-8">{prompt.categoryId.name}</span>
                  <span className="badge badge-admin">{prompt.subCategoryId.name}</span>
                </div>
                <div className="mb-8 text-medium">
                  <strong>Question:</strong> {prompt.prompt}
                </div>
                <div className="text-small text-muted">{new Date(prompt.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  )
}

export default UserManagement
