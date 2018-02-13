import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { CopyToClipboard } from "react-copy-to-clipboard"

import Header from "../../components/Header";
import { WhiteRoundedButton, TurquoiseRoundedButton } from "../../components/Button";
import "./waitlist.css"

const STATUSES = {
  IN_QUEUE: "WAITLIST",
  GRANTED_ACCESS: "ACCESS",
  UNKNOWN: "NOT_FOUND",
  LOADING: "LOADING"
}

class WaitList extends React.Component {
  static defaultProps = {
    status: STATUSES.LOADING,
    position: undefined,
    code: undefined,
  }
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    status: PropTypes.oneOf(Object.values(STATUSES)),
    position: PropTypes.number,
    code: PropTypes.string,
    fetchWaitlistPosition: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchWaitlistPosition(this.props.match.params.id)
  }

  render() {
    let content
    switch (this.props.status) {
      case STATUSES.IN_QUEUE:
        content = (
          <React.Fragment>
            <div>
              <p>Före dig på väntelistan står</p>
              <h1 className="WaitList__header WaitList__spaced-top">{ this.props.position } personer</h1>
            </div>
            <hr className="WaitList__separator" />
            <div className="WaitList__spaced-bottom">
              <p>Du får en aktiveringskod på mailen så fort det är din tur!</p>
            </div>
          </React.Fragment>
        )
        break
      case STATUSES.GRANTED_ACCESS:
        content = (
          <React.Fragment>
            <div>
              <p>Väntan är över</p>
              <h1 className="WaitList__header">Välkommen till Hedvig!</h1>
            </div>
            <div>
              <p>Din aktiveringskod är</p>
              <p className="WaitList__code">{this.props.code}</p>
              <CopyToClipboard text={this.props.code}>
                <WhiteRoundedButton>Kopiera koden</WhiteRoundedButton>
              </CopyToClipboard>
              <p>och gå sedan</p>
              <a href="hedvig://" target="_blank" rel="noopener noreferrer">
                <TurquoiseRoundedButton>
                  Till appen
                </TurquoiseRoundedButton>
              </a>
            </div>
          </React.Fragment>
        )
        break
      case STATUSES.UNKNOWN:
        content = (
          <React.Fragment>Sign up for wait list for Hedvig here!</React.Fragment>
        )
        break
      case STATUSES.LOADING:
        content = (
          <React.Fragment>Loading ...</React.Fragment>
        )
        break
      default:
        content = (
          <React.Fragment>error</React.Fragment>
        )
        break
    }
    return (
      <main className="WaitList">
        <Header headerRight={<React.Fragment></React.Fragment>} />
        <article className="pure-g pure-centered">
          <div className="pure-u-1-1 pure-u-md-3-5 WaitList__content">
            {content}
          </div>
        </article>
      </main>
    )
  }
}

export default connect(
  state => ({
    position: state.waitlist.position,
    status: state.waitlist.status,
    code: state.waitlist.code
  }),
  dispatch => ({
    fetchWaitlistPosition: token => dispatch({
      type: "API",
      payload: {
        url: "/hedvig/waitlist",
        method: "POST",
        body: token,
        SUCCESS: "WAITLIST/RETRIEVED_WAITLIST_STATUS",
      }
    })
  })
)(WaitList)
