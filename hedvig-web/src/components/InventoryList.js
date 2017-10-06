import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const AssetList = () => {
  return (
    <Placeholder>
      Inventory List
      <Link to="/add-edit-item">Add / Edit item</Link>
    </Placeholder>
  )
}

export default AssetList
