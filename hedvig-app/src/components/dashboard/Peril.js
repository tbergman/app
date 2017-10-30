import React from "react"
import {
  View,
  ScrollView,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native"
import Placeholder from "rn-placeholder"
import {
  StyledPeril,
  StyledPerilIcon,
  StyledPerilTitle,
  StyledAddRemoveIcon
} from "../styles/dashboard"
import { StyledSmallPassiveText } from "../styles/text"

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
        <Button
          title="Claim"
          onPress={() => this.props.raisePerilClaim(peril)}
        />
      )
    }
  }

  renderAddPeril(peril) {
    return (
      <TouchableOpacity onPress={() => this._addPerilPressed()}>
        <StyledPeril>
          <StyledPerilIcon source={{ uri: peril.imageUrl }}>
            <StyledAddRemoveIcon
              source={require("../../../assets/icons/edit_perils/add_peril.png")}
            />
          </StyledPerilIcon>
          <StyledPerilTitle>{peril.title}</StyledPerilTitle>
        </StyledPeril>
      </TouchableOpacity>
    )
  }

  renderRemovePeril(peril) {
    return (
      <TouchableOpacity onPress={() => this._removePerilPressed()}>
        <StyledPeril>
          <StyledPerilIcon source={{ uri: peril.imageUrl }}>
            <StyledAddRemoveIcon
              source={require("../../../assets/icons/edit_perils/remove_peril.png")}
            />
          </StyledPerilIcon>
          <StyledPerilTitle>{peril.title}</StyledPerilTitle>
        </StyledPeril>
      </TouchableOpacity>
    )
  }

  renderPeril(peril) {
    return (
      <StyledPeril>
        <StyledPerilIcon source={{ uri: peril.imageUrl }} />
        <StyledPerilTitle>{peril.title}</StyledPerilTitle>
      </StyledPeril>
    )
  }

  render() {
    let peril = this.props.peril
    // In edit mode: A peril the user can add
    if (this.props.enableAdd) {
      return this.renderAddPeril(peril)
      // In edit mode: A peril the user can remove
    } else if (this.props.enableRemove) {
      return this.renderRemovePeril(peril)
      // Not in edit mode
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Carousel", {
              title: this.props.categoryTitle,
              items: this.props.categoryPerils,
              initialSlideIndex: this.props.perilIndex
              // Uncomment this if we want to enable peril specific claims
              // renderCta: this._cashbackCarouseOlCta.bind(this)
            })}
        >
          {this.renderPeril(peril)}
        </TouchableOpacity>
      )
    }
  }
}
