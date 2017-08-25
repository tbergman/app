import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const InsuranceList = () => {
  return (
    <Placeholder>
      Insurance List
      <Link to="/add-edit-insurance">Add / Edit insurance</Link>
    </Placeholder>
  )
}

export default InsuranceList
