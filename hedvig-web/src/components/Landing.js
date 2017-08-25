import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Landing = () => {
  return (
    <Placeholder>
      Landing
      <Link to="/login">Login</Link>
    </Placeholder>
  )
}

export default Landing
