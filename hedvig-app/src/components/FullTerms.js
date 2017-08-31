import React from "react"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class FullTerms extends React.Component {
  static navigationOptions = {
    title: "Fullständiga Villkor"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer vi låta skicka ge feedback på din upplevelse av Hedvig" />
      </Placeholder>
    )
  }
}
