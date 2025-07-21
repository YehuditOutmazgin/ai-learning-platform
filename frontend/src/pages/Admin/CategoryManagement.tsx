"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  addCategoryThunk,
  addSubCategoryThunk,
  updateCategoryThunk,
  updateSubCategoryThunk,
  deleteCategoryThunk,
  deleteSubCategoryThunk,
} from "../../redux/slices/categorySlice"
import SearchBox from "../../components/Common/SearchBox"
import Modal from "../../components/Common/Modal"
import type { Category } from "../../types/category"
import type { SubCategory } from "../../types/subCategory"

import "./../../styles/Admin.css"
import "./../../styles/Table.css"
import "./../../styles/Tabs.css"

const CategoryManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, subcategories, loading } = useSelector((state: RootState) => state.categories)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"categories" | "subcategories">("categories")

  // Category modals
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categoryForm, setCategoryForm] = useState({ name: "" })

  // Subcategory modals
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false)
  const [isEditSubCategoryModalOpen, setIsEditSubCategoryModalOpen] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null)
  const [subCategoryForm, setSubCategoryForm] = useState({ name: "", categoryId: "" })

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSubCategories = subcategories.filter(
    (subCategory) =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.categoryId.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Category handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(addCategoryThunk({ name: categoryForm.name }))
    setIsCategoryModalOpen(false)
    setCategoryForm({ name: "" })
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setCategoryForm({ name: category.name })
    setIsEditCategoryModalOpen(true)
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory) {
      await dispatch(
        updateCategoryThunk({
          categoryId: selectedCategory._id,
          name: categoryForm.name,
        }),
      )
      setIsEditCategoryModalOpen(false)
      setSelectedCategory(null)
      setCategoryForm({ name: "" })
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure? This will also delete all subcategories under this category.")) {
      await dispatch(deleteCategoryThunk(categoryId))
    }
  }

  // Subcategory handlers
  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(
      addSubCategoryThunk({
        name: subCategoryForm.name,
        categoryId: subCategoryForm.categoryId,
      }),
    )
    setIsSubCategoryModalOpen(false)
    setSubCategoryForm({ name: "", categoryId: "" })
  }

  const handleEditSubCategory = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory)
    setSubCategoryForm({
      name: subCategory.name,
      categoryId: subCategory.categoryId._id,
    })
    setIsEditSubCategoryModalOpen(true)
  }

  const handleUpdateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSubCategory) {
      await dispatch(
        updateSubCategoryThunk({
          subCategoryId: selectedSubCategory._id,
          name: subCategoryForm.name,
        }),
      )
      setIsEditSubCategoryModalOpen(false)
      setSelectedSubCategory(null)
      setSubCategoryForm({ name: "", categoryId: "" })
    }
  }

  const handleDeleteSubCategory = async (subCategoryId: string) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      await dispatch(deleteSubCategoryThunk(subCategoryId))
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h2 className="admin-title">Category Management</h2>
        <div className="admin-actions">
          <button onClick={() => setIsCategoryModalOpen(true)} className="btn btn-primary">
            Add Category
          </button>
          <button onClick={() => setIsSubCategoryModalOpen(true)} className="btn btn-secondary">
            Add Subcategory
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Categories ({categories.length})
        </button>
        <button
          className={`tab ${activeTab === "subcategories" ? "active" : ""}`}
          onClick={() => setActiveTab("subcategories")}
        >
          Subcategories ({subcategories.length})
        </button>
      </div>

      <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder={`Search ${activeTab}...`} />

      {activeTab === "categories" ? (
        <div className="card card-no-padding">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Subcategories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td className="table-cell-bold">{category.name}</td>
                  <td>{subcategories.filter((sub) => sub.categoryId._id === category._id).length} subcategories</td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => handleEditCategory(category)} className="btn btn-primary btn-small">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteCategory(category._id)} className="btn btn-danger btn-small">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card card-no-padding">
          <table className="table">
            <thead>
              <tr>
                <th>Subcategory Name</th>
                <th>Parent Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubCategories.map((subCategory) => (
                <tr key={subCategory._id}>
                  <td className="table-cell-bold">{subCategory.name}</td>
                  <td>
                    <span className="badge badge-user">{subCategory.categoryId.name}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => handleEditSubCategory(subCategory)} className="btn btn-primary btn-small">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubCategory(subCategory._id)}
                        className="btn btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* All modals remain the same but with updated button classes */}
      <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} title="Add New Category">
        <form onSubmit={handleAddCategory}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="input"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="flex gap-12 flex-end">
            <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Add Category
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal isOpen={isEditCategoryModalOpen} onClose={() => setIsEditCategoryModalOpen(false)} title="Edit Category">
        <form onSubmit={handleUpdateCategory}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="input"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ name: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-12 flex-end">
            <button type="button" onClick={() => setIsEditCategoryModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Update Category
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Subcategory Modal */}
      <Modal
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
        title="Add New Subcategory"
      >
        <form onSubmit={handleAddSubCategory}>
          <div className="form-group">
            <label>Parent Category</label>
            <select
              className="select"
              value={subCategoryForm.categoryId}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, categoryId: e.target.value })}
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
            <label>Subcategory Name</label>
            <input
              type="text"
              className="input"
              value={subCategoryForm.name}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
              placeholder="Enter subcategory name"
              required
            />
          </div>
          <div className="flex gap-12 flex-end">
            <button type="button" onClick={() => setIsSubCategoryModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Add Subcategory
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Subcategory Modal */}
      <Modal
        isOpen={isEditSubCategoryModalOpen}
        onClose={() => setIsEditSubCategoryModalOpen(false)}
        title="Edit Subcategory"
      >
        <form onSubmit={handleUpdateSubCategory}>
          <div className="form-group">
            <label>Parent Category</label>
            <select
              className="select"
              value={subCategoryForm.categoryId}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, categoryId: e.target.value })}
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
            <label>Subcategory Name</label>
            <input
              type="text"
              className="input"
              value={subCategoryForm.name}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-12 flex-end">
            <button type="button" onClick={() => setIsEditSubCategoryModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Update Subcategory
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CategoryManagement
