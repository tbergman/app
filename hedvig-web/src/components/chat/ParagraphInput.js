import React from "react"

export default class ParagraphInput extends React.Component {
  componentDidMount() {
    this.props.startPolling(this.props.message.header.pollingInterval)
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    return <div>Polling messages...</div>
  }
}
