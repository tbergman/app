import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Dashboard = () => {
  return (
    <Placeholder>
      Dashboard
      <Link to="/profile">My Profile</Link>
      <Link to="/inventory-list">Inventory List</Link>
      <Link to="/insurance-list">Insurance List</Link>
      <Link to="/claim">Claim</Link>
      <Link to="/sign-bankid">Update insurance</Link>
    </Placeholder>
  )
}

export default Dashboard
