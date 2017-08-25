import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const SignBankid = () => {
  return (
    <Placeholder>
      Sign with BankID
      <Link to="/full-terms">See full terms</Link>
      <Link to="/share">Share</Link>
    </Placeholder>
  )
}

export default SignBankid
