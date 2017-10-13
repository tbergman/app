import React from "react"
import { View, ScrollView, Button, Text, Image, TouchableOpacity } from "react-native"
import Peril from "../../containers/dashboard/Peril"
import styled from "styled-components/native"
const R = require("ramda")

const StyledPerilsCategory = styled.View`
  flex-wrap: wrap
  flex-direction: row
`

const StyledCategoryHeading = styled.View`
  flex-direction: row
  align-items: center
`

const StyledIcon = styled.Image`
  width: 70
  height: 70
`

export class PerilsCategory extends React.Component {

  state = {
    showCategory: false
  }

  coveredStates = ["COVERED", "ADD_REQUESTED", "ADD_PENDING"]

  coveredPerils(enableRemove = false) {
    return R.filter(peril => this.coveredStates.includes(peril.state), this.props.perils).map((peril, i) => {
      let perilIndex = this.props.perils.findIndex(p => p.id === peril.id)
      return <Peril peril={peril} key={i} enableRemove={enableRemove} navigation={this.props.navigation} categoryPerils={this.props.perils} perilIndex={perilIndex} />
    })
  }

  uncoveredPerils() {
    return R.filter(peril => !this.coveredStates.includes(peril.state), this.props.perils).map((peril, i) => {
      return <Peril peril={peril} key={i} enableAdd={true} navigation={this.props.navigation} categoryPerils={this.props.perils} perilIndex={i} />
    })
  }

  allPerils() {
    return this.props.perils.map((peril, i) => {
      return <Peril peril={peril} key={i} navigation={this.props.navigation} categoryPerils={this.props.perils} perilIndex={i} />
    })
  }

  perils() {
    if (this.props.editMode) {
      return (
        <View>
          <StyledPerilsCategory>
            {this.coveredPerils(true)}
          </StyledPerilsCategory>
          <StyledPerilsCategory>
            {this.uncoveredPerils()}
          </StyledPerilsCategory>
        </View>
      )
    } else if (this.state.showCategory) {
      return <StyledPerilsCategory>{this.coveredPerils()}</StyledPerilsCategory>
    }
  }

  render() {
    return (
      <View>
        <StyledCategoryHeading>
          <StyledIcon source={{uri: this.props.iconUrl}} />
          <Text>
            {this.props.title}
          </Text>
          <TouchableOpacity onPress={() => this.setState({showCategory: !this.state.showCategory})}>
            <Text> {this.state.showCategory ? "Dölj" : "Visa"}</Text>
          </TouchableOpacity>
        </StyledCategoryHeading>
        {this.perils()}
      </View>
    )
  }
}
