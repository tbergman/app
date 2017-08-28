import React from "react"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <Placeholder>
        Dashboard
        {this.props.dashboard ? this.props.dashboard.data.foo : ":("}
        <Link to="/profile">My Profile</Link>
        <Link to="/inventory-list">Inventory List</Link>
        <Link to="/insurance-list">Insurance List</Link>
        <Link to="/claim">Claim</Link>
        <Link to="/sign-bankid">Update insurance</Link>
      </Placeholder>
    )
  }
}

export default Dashboard
