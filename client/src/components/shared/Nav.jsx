import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/users">Items</NavLink>
  </nav>
)

export default Nav
