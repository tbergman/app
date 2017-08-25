import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Onboarding = () => {
  return (
    <Placeholder>
      Onboarding
      <Link to="/profile">My Profile</Link>
      <Link to="/add-edit-item">Add / Edit item</Link>
      <Link to="/insurance-offer">Insurance offer</Link>
      <Link to="/insurance-denial">Insurance denial</Link>
    </Placeholder>
  )
}

export default Onboarding
