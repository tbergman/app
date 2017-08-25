import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const RegisterPayment = () => {
  return (
    <Placeholder>
      Register payment
      <Link to="/change-payment">Change payment</Link>
      <Link to="/register-cashback">Register cashback</Link>
    </Placeholder>
  )
}

export default RegisterPayment
