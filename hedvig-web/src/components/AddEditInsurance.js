import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const AddEditInsurance = () => {
  return (
    <Placeholder>
      Add / Edit Insurance
      <Link to="/claim">Claim</Link>
    </Placeholder>
  )
}

export default AddEditInsurance
