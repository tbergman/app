import React from "react"
import { View, ScrollView, Button, Text, Image, TouchableOpacity } from "react-native"
import Placeholder from "rn-placeholder"
import styled from "styled-components/native"

const StyledPeril = styled.View`
  width: 90
  align-items: center
`

export class Peril extends React.Component {

  _addPerilPressed() {
    this.props.addPeril(this.props.peril)
  }

  _removePerilPressed() {
    this.props.removePeril(this.props.peril)
  }

  _cashbackCarouselCta(peril) {
    if (peril.state == "COVERED") {
      return (
        <Button title="Claim" onPress={() => this.props.raisePerilClaim(peril)} />
      )
    }
  }

  renderPeril(peril) {
    return (
      <StyledPeril>
        <Placeholder.Media
          size={70}
          color="lightgray"
          hasRadius
        />
        <Text style={{color: "black", textAlign: "center"}}>{peril.title}</Text>
      </StyledPeril>
    )
  }

  render() {
    let peril = this.props.peril
    // In edit mode: A peril the user can add
    if (this.props.enableAdd) {
      return (
        <TouchableOpacity onPress={() => this._addPerilPressed()}>
          {this.renderPeril(peril)}
          <Text>Add</Text>
        </TouchableOpacity>
      )
    // In edit mode: A peril the user can remove
    } else if (this.props.enableRemove) {
      return (
        <TouchableOpacity onPress={() => this._removePerilPressed()}>
          {this.renderPeril(peril)}
          <Text>Remove</Text>
        </TouchableOpacity>
      )
    // Not in edit mode
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Carousel", {
          items: this.props.categoryPerils,
          initialSlideIndex: this.props.perilIndex,
          // Uncomment this if we want to enable peril specific claims
          // renderCta: this._cashbackCarouselCta.bind(this)
        })}>
          {this.renderPeril(peril)}
        </TouchableOpacity>
      )
    }
  }
}
