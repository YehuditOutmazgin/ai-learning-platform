import "./../../styles/Layout.css"
import type React from "react"
import Header from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">{children}</div>
    </div>
  )
}

export default Layout
