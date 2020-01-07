import React from "react"
import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div className="Menu">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Posts</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Menu
