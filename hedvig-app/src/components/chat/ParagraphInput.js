import React from "react"
import PropTypes from "prop-types"

export default class ParagraphInput extends React.Component {
  static propTypes = {
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.startPolling(this.props.message.header.pollingInterval)
  }

  componentDidUpdate() {
    this.props.startPolling(this.props.message.header.pollingInterval)
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    return null
  }
}
