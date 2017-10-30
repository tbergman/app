import React from "react"
import {
  View,
  ScrollView,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native"
import Peril from "../../containers/dashboard/Peril"
import styled from "styled-components/native"
import {
  StyledCategoryContainer,
  StyledCategoryHeader,
  StyledCategoryIcon,
  StyledCategoryTextContainer,
  StyledExpandButton,
  StyledPerilsContainer,
  StyledPerilsRow
} from "../styles/dashboard"
import { DisabledCollapseButton, DisabledExpandButton } from "../Button"
import { StyledRow, StyledWrappingRow } from "../styles/general"
import { StyledHeading, StyledPassiveText } from "../styles/text"
const R = require("ramda")

export class PerilsCategory extends React.Component {
  state = {
    showCategory: false
  }

  coveredStates = ["COVERED", "ADD_REQUESTED", "ADD_PENDING"]

  coveredPerils(enableRemove = false) {
    return R.filter(
      peril => this.coveredStates.includes(peril.state),
      this.props.perils
    ).map((peril, i) => {
      let perilIndex = this.props.perils.findIndex(p => p.id === peril.id)
      return (
        <Peril
          peril={peril}
          key={i}
          enableRemove={enableRemove}
          navigation={this.props.navigation}
          categoryPerils={this.props.perils}
          categoryTitle={this.props.title}
          perilIndex={perilIndex}
        />
      )
    })
  }

  uncoveredPerils() {
    return R.filter(
      peril => !this.coveredStates.includes(peril.state),
      this.props.perils
    ).map((peril, i) => {
      return (
        <Peril
          peril={peril}
          key={i}
          enableAdd={true}
          navigation={this.props.navigation}
          categoryPerils={this.props.perils}
          perilIndex={i}
        />
      )
    })
  }

  allPerils() {
    return this.props.perils.map((peril, i) => {
      return (
        <Peril
          peril={peril}
          key={i}
          navigation={this.props.navigation}
          categoryPerils={this.props.perils}
          perilIndex={i}
        />
      )
    })
  }

  perils() {
    if (this.props.editMode) {
      return (
        <StyledPerilsContainer>
          <StyledPerilsRow>{this.coveredPerils(true)}</StyledPerilsRow>
          <StyledPerilsRow>{this.uncoveredPerils()}</StyledPerilsRow>
        </StyledPerilsContainer>
      )
    } else if (this.state.showCategory) {
      return (
        <StyledPerilsContainer>
          <StyledPerilsRow>{this.coveredPerils()}</StyledPerilsRow>
        </StyledPerilsContainer>
      )
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({ showCategory: !this.state.showCategory })}
      >
        <StyledCategoryContainer>
          <StyledCategoryHeader>
            <StyledCategoryIcon source={{ uri: this.props.iconUrl }} />
            <StyledCategoryTextContainer>
              <StyledRow>
                <StyledHeading>{this.props.title}</StyledHeading>
              </StyledRow>
              <StyledRow>
                <StyledPassiveText>
                  {this.state.showCategory
                    ? "Klicka på ikonerna för mer info"
                    : this.props.description}
                </StyledPassiveText>
              </StyledRow>
            </StyledCategoryTextContainer>
            <StyledExpandButton>
              {this.state.showCategory ? (
                <DisabledCollapseButton />
              ) : (
                <DisabledExpandButton />
              )}
            </StyledExpandButton>
          </StyledCategoryHeader>
          {this.perils()}
        </StyledCategoryContainer>
      </TouchableOpacity>
    )
  }
}
