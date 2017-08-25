import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Profile = () => {
  return (
    <Placeholder>
      My Profile
      <Link to="/change-payment">Change payment</Link>
      <Link to="/change-cashback">Change cashback</Link>
    </Placeholder>
  )
}

export default Profile
