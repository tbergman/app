import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Login = () => {
  return (
    <Placeholder>
      Login
      <Link to="/onboarding">Onboarding</Link>
      <Link to="/dashboard">Dashboard</Link>
    </Placeholder>
  )
}

export default Login
