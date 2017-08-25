import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const InsuranceOffer = () => {
  return (
    <Placeholder>
      Insurance Offer
      <Link to="/profile">My Profile</Link>
      <Link to="/inventory-list">Inventory List</Link>
      <Link to="/insurance-list">Insurance list</Link>
      <Link to="/register-payment">Register Payment</Link>
    </Placeholder>
  )
}

export default InsuranceOffer
