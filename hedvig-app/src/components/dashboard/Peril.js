/* global require */
import React from "react"
import {
  View,
  Button,
  TouchableOpacity
} from "react-native"
import {
  StyledPeril,
  StyledPerilIcon,
  StyledPerilTitle,
  StyledAddRemoveIcon
} from "../styles/dashboard"


const meLegalTrouble = require("../../../assets/icons/perils/perilIcos/jag_juridisk_tvist.png")
const meAssault = require("../../../assets/icons/perils/perilIcos/jag_overfall.png")
const meIllness = require("../../../assets/icons/perils/perilIcos/jag_sjuk_pa_resa.png")
const meDelayedLuggage = require("../../../assets/icons/perils/perilIcos/jag_forsenat_bagage.png")
const apartmentFire = require("../../../assets/icons/perils/perilIcos/lagenhet_eldsvada.png")
const apartmentWaterLeak = require("../../../assets/icons/perils/perilIcos/lagenhet_vattenlacka.png")
const apartmentWeather = require("../../../assets/icons/perils/perilIcos/lagenhet_ovader.png")
const apartmentAppliances = require("../../../assets/icons/perils/perilIcos/lagenhet_vitvaror.png")
const apartmentBreakIn = require("../../../assets/icons/perils/perilIcos/lagenhet_inbrott.png")
const apartmentVandalisation = require("../../../assets/icons/perils/perilIcos/lagenhet_skadegorelse.png")
const stuffAllRisk = require("../../../assets/icons/perils/perilIcos/prylar_drulle.png")
const stuffTheft = require("../../../assets/icons/perils/perilIcos/prylar_stold.png")
const stuffVandalisation = require("../../../assets/icons/perils/perilIcos/prylar_skadegorelse.png")
const stuffFire = require("../../../assets/icons/perils/perilIcos/prylar_eldsvada.png")
const stuffWaterLeak = require("../../../assets/icons/perils/perilIcos/prylar_vattenlacka.png")
const stuffWeather = require("../../../assets/icons/perils/perilIcos/prylar_ovader.png")

const PERIL_IMAGE_MAP = {
  "ME.LEGAL": meLegalTrouble,
  "ME.ASSAULT": meAssault,
  "ME.TRAVEL.SICK": meIllness,
  "ME.TRAVEL.LUGGAGE.DELAY": meDelayedLuggage,
  "HOUSE.BRF.FIRE": apartmentFire,
  "HOUSE.BRF.WATER": apartmentWaterLeak,
  "HOUSE.BRF.WEATHER": apartmentWeather,
  "HOUSE.RENT.FIRE": apartmentFire,
  "HOUSE.RENT.WATER": apartmentWaterLeak,
  "HOUSE.RENT.WEATHER": apartmentWeather,
  "HOUSE.SUBLET.RENT.FIRE": apartmentFire,
  "HOUSE.SUBLET.RENT.WATER": apartmentWaterLeak,
  "HOUSE.SUBLET.RENT.WEATHER": apartmentWeather,
  "HOUSE.SUBLET.RENT.APPLIANCES": apartmentAppliances,
  "HOUSE.SUBLET.BRF.APPLIANCES": apartmentAppliances,
  "HOUSE.SUBLET.BRF.FIRE": apartmentFire,
  "HOUSE.SUBLET.BRF.WATER": apartmentWaterLeak,
  "HOUSE.SUBLET.BRF.WEATHER": apartmentWeather,
  "HOUSE.BREAK-IN": apartmentBreakIn,
  "HOUSE.DAMAGE": apartmentVandalisation,
  "HOUSE.BRF.APPLIANCES": apartmentAppliances,
  "HOUSE.RENT.APPLIANCES": apartmentAppliances,
  "STUFF.CARELESS": stuffAllRisk,
  "STUFF.THEFT": stuffTheft,
  "STUFF.DAMAGE": stuffVandalisation,
  "STUFF.BRF.FIRE": stuffFire,
  "STUFF.RENT.FIRE": stuffFire,
  "STUFF.SUBLET.RENT.FIRE": stuffFire,
  "STUFF.SUBLET.BRF.FIRE": stuffFire,
  "STUFF.BRF.WATER": stuffWaterLeak,
  "STUFF.RENT.WATER": stuffWaterLeak,
  "STUFF.SUBLET.RENT.WATER": stuffWaterLeak,
  "STUFF.SUBLET.BRF.WATER": stuffWaterLeak,
  "STUFF.BRF.WEATHER": stuffWeather,
  "STUFF.RENT.WEATHER": stuffWeather,
  "STUFF.SUBLET.RENT.WEATHER": stuffWeather,
  "STUFF.SUBLET.BRF.WEATHER": stuffWeather
}

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
    if (peril.isRemovable) {
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
    } else {
      return (
        <View>
          <StyledPeril>
            <StyledPerilIcon source={{ uri: peril.imageUrl }} />
            <StyledPerilTitle>{peril.title}</StyledPerilTitle>
          </StyledPeril>
        </View>
      )
    }
  }

  renderPeril(peril) {
    return (
      <StyledPeril>
        <StyledPerilIcon source={PERIL_IMAGE_MAP[peril.id]} />
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
              items: this.props.categoryPerils.map(i => ({...i, imageUrl: undefined, itemSrc: PERIL_IMAGE_MAP[i.id]})),
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
