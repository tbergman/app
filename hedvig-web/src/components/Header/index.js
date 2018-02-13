import React from "react"
import { Link } from "react-router-dom"
import "./header.css"

export default class Header extends React.Component {
  render() {
    return (
      <header className="Header pure-g">
        <div className="pure-u-md-1-3 Header__child">
          <nav className="Header__links">
            <Link to="/about-us">
              Om Hedvig
            </Link>
          </nav>
        </div>
        <div className="pure-u-1-3 pure-u-md-1-3 Header__child">
          <div className="Header__logo">
            <Link to="/">
              <img src="/assets/identity/hedvig_wordmark/hedvig_wordmark_black.svg" alt="Hedvig Logo" />
            </Link>
          </div>
        </div>
        { this.props.headerRight ? (
          <div className="pure-u-2-3 pure-u-md-1-3 Header__child">
            <div className="Header__right">
              {this.props.headerRight}
            </div>
          </div>
        ) : null }
      </header>
    )
  }
}
