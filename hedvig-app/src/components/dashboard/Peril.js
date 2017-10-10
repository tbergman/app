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

  maybeCta() {
    if (this.props.enableAdd) {
      return (
        <TouchableOpacity onPress={() => this._addPerilPressed()}>
          <Text>Add</Text>
        </TouchableOpacity>
      )
    } else if (this.props.enableRemove) {
      return (
        <TouchableOpacity onPress={() => this._removePerilPressed()}>
          <Text>Remove</Text>
        </TouchableOpacity>
      )
    }
  }

  _cashbackCarouselCta(peril) {
    if (peril.state == "COVERED") {
      return (
        <Button title="Claim" onPress={() => this.props.raisePerilClaim(peril)} />
      )
    }
  }

  render() {
    let peril = this.props.peril
    let removePeril = this.props.removePeril
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("Carousel", {
        items: this.props.categoryPerils,
        initialSlideIndex: this.props.perilIndex,
        renderCta: this._cashbackCarouselCta.bind(this)
      })}>
        <StyledPeril>
          <Placeholder.Media
            size={70}
            color="lightgray"
            hasRadius
          />
          <Text style={{color: "black", textAlign: "center"}}>{peril.title}</Text>
          {this.maybeCta()}
        </StyledPeril>
      </TouchableOpacity>
    )
  }
}
