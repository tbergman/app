import React from "react"
import {
  View,
} from "react-native"
import Peril from "../../containers/dashboard/Peril"
import {
  StyledCategoryContainer,
  StyledCategoryHeader,
  StyledCategoryIcon,
  StyledCategoryTextContainer,
  StyledExpandButton,
  StyledPerilsContainer,
  StyledPerilsRow,
  StyledCategoryTextAndButton,
  StyledPerilsHelpText
} from "../styles/dashboard"
import {
  DisabledCollapseButton,
  DisabledExpandButton,
  HiddenDisabledButton
} from "../Button"
import { StyledRow } from "../styles/general"
import {
  StyledHeading,
  StyledPassiveText,
  StyledSmallPassiveText
} from "../styles/text"
import R from "ramda"

const coveredStates = ["COVERED", "ADD_REQUESTED", "ADD_PENDING"]

export const coveredPerils = (perils, title, navigation, enableRemove = false) => {
  return perils
    .filter(peril => coveredStates.includes(peril.state))
    .map((peril, index) => (
      <Peril
        peril={peril}
        key={index}
        enableRemove={enableRemove}
        navigation={navigation}
        categoryPerils={perils}
        categoryTitle={title}
        perilIndex={perils.findIndex(p => p.id === peril.id)}
      />
    ))
}

export class PerilsCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCategory: props.offerMode === true
    }
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
          <StyledPerilsRow>{coveredPerils(this.props.perils, this.props.title, this.props.navigation, true)}</StyledPerilsRow>
          <StyledPerilsRow>{this.uncoveredPerils()}</StyledPerilsRow>
        </StyledPerilsContainer>
      )
    } else if (this.state.showCategory) {
      return (
        <ExpandedPerilsCategory>
          {coveredPerils(this.props.perils, this.props.title, this.props.navigation)}
        </ExpandedPerilsCategory>
      )
    }
  }

  render() {
    let CollapseButton = this.state.showCategory
      ? DisabledCollapseButton
      : DisabledExpandButton
    if (this.props.editMode) {
      CollapseButton = HiddenDisabledButton
    }
    return (
      <StyledCategoryContainer
        activeOpacity={1}
        onPress={() =>
          !this.props.offerMode &&
          !this.props.editMode &&
          this.setState({ showCategory: !this.state.showCategory })}
      >
        <StyledCategoryHeader>
          <StyledCategoryIcon source={{ uri: this.props.iconUrl }} />
          <StyledCategoryTextAndButton>
            <StyledCategoryTextContainer>
              <StyledRow>
                <StyledHeading>{this.props.title}</StyledHeading>
              </StyledRow>
              <StyledRow>
                <StyledPassiveText>
                  {this.props.description}
                  {this.state.showCategory ? ":" : ""}
                </StyledPassiveText>
              </StyledRow>
            </StyledCategoryTextContainer>
            { !this.props.offerMode ? (
              <StyledExpandButton>
                <CollapseButton size="mediumBig" />
              </StyledExpandButton>
            ) : null }
          </StyledCategoryTextAndButton>
        </StyledCategoryHeader>
        {this.perils()}
      </StyledCategoryContainer>
    )
  }
}

export const ExpandedPerilsCategory = (props) => (
  <View>
    <StyledPerilsContainer>
      <StyledPerilsRow>{props.children}</StyledPerilsRow>
    </StyledPerilsContainer>
    <StyledPerilsHelpText>
      <StyledSmallPassiveText>
        Klicka på ikonerna för mer info
      </StyledSmallPassiveText>
    </StyledPerilsHelpText>
  </View>
)
