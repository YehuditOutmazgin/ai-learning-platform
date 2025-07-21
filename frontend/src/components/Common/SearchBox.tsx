"use client"

import "./../../styles/SearchBox.css"

import type React from "react"

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchBox
