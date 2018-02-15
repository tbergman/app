import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="pure-g Footer">
        <div className="pure-u-1-1 pure-u-md-1-3">
          <div className="pure-g Footer__links">
            <div className="pure-u-1-2">
              <div role="img" className="Footer__icon" aria-label="Hedvig logo" />
            </div>
            <nav className="pure-u-1-2">
              <Link className="Footer__link" to="/contact">
                Kontakt
              </Link>
              <Link className="Footer__link" to="/legal">
                Legal information
              </Link>
            </nav>
          </div>
        </div>
        <div className="pure-u-1-1 pure-u-md-2-3 Footer__social">
          {/*<a href="https://www.instagram.com/hedvigers" target="_blank" rel="noopener noreferrer">
            <img
              src="/assets/web/Social icons/Instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </a>*/}
          <a
            href="https://itunes.apple.com/se/app/hedvig/id1303668531?mt=8"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__social-icon"
          >
            <img
              src="/assets/web/appstores/appstore-button.svg"
              alt="Ladda ner på App Store"
              width={152}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.hedvig.app"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__social-icon"
          >
            <img
              src="/assets/web/appstores/google-play-button.svg"
              alt="Ladda ner på Google Play"
              width={152}
            />
          </a>
        </div>
      </footer>
    )
  }
}
