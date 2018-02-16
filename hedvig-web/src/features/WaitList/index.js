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
          <div>
            <h1 className="WaitList__header">Snart är det&nbsp;dags!</h1>
            <div className="pure-g pure-centered">
              <div className="pure-u-1-1 pure-u-md-3-5 pure-u-lg-5-8 pure-u-xl-1-2">
                <div className="WaitList__position-box">
                  <p className="WaitList__paragraph WaitList__paragraph--marginless">Före dig på väntelistan står</p>
                  <h3 className="WaitList__header WaitList__heading--position">{ this.props.position } <span className="WaitList__person-label">personer</span></h3>
                </div>
              </div>
            </div>
            <p className="WaitList__paragraph">Du får en aktiveringskod på mailen så fort det är din tur!</p>
            <p className="WaitList__paragraph">Vi ses snart!</p>
          </div>
        )
        break
      case STATUSES.GRANTED_ACCESS:
        content = (
          <div>
            <p className="WaitList__paragraph">Väntan är över</p>
            <h1 className="WaitList__header">Välkommen till Hedvig</h1>
            <p className="WaitList__paragraph">Din aktiveringskod är</p>
            <p className="WaitList__code">{this.props.code}</p>
            <CopyToClipboard text={this.props.code}>
              <WhiteRoundedButton style={{width: "200px"}}>Kopiera koden</WhiteRoundedButton>
            </CopyToClipboard>
            <p className="WaitList__paragraph">och gå sedan</p>
            <a href="hedvig://" target="_blank" rel="noopener noreferrer">
              <TurquoiseRoundedButton style={{width: "200px", fontSize: "18px", marginBottom: "4em"}}>
                Till appen
              </TurquoiseRoundedButton>
            </a>
          </div>
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
        <Header static headerRight={<React.Fragment></React.Fragment>} />
        <article className="pure-g pure-centered">
          <div className="pure-u-1-1 pure-u-lg-4-5 WaitList__content">
            {content}
          </div>
        </article>
      </main>
    )
  }
}

export { WaitList as WaitListComponent }

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
