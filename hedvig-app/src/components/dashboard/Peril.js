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


const jag_juridisk_tvist = require("../../../assets/icons/perils/perilIcos/jag_juridisk_tvist.png")
const jag_overfall = require("../../../assets/icons/perils/perilIcos/jag_overfall.png")
const jag_sjuk_pa_resa = require("../../../assets/icons/perils/perilIcos/jag_sjuk_pa_resa.png")
const jag_forsenat_bagage = require("../../../assets/icons/perils/perilIcos/jag_forsenat_bagage.png")
const lagenhet_eldsvada = require("../../../assets/icons/perils/perilIcos/lagenhet_eldsvada.png")
const lagenhet_vattenlacka = require("../../../assets/icons/perils/perilIcos/lagenhet_vattenlacka.png")
const lagenhet_ovader = require("../../../assets/icons/perils/perilIcos/lagenhet_ovader.png")
const lagenhet_vitvaror = require("../../../assets/icons/perils/perilIcos/lagenhet_vitvaror.png")
const lagenhet_inbrott = require("../../../assets/icons/perils/perilIcos/lagenhet_inbrott.png")
const lagenhet_skadegorelse = require("../../../assets/icons/perils/perilIcos/lagenhet_skadegorelse.png")
const prylar_drulle = require("../../../assets/icons/perils/perilIcos/prylar_drulle.png")
const prylar_stold = require("../../../assets/icons/perils/perilIcos/prylar_stold.png")
const prylar_skadegorelse = require("../../../assets/icons/perils/perilIcos/prylar_skadegorelse.png")
const prylar_eldsvada = require("../../../assets/icons/perils/perilIcos/prylar_eldsvada.png")
const prylar_vattenlacka = require("../../../assets/icons/perils/perilIcos/prylar_vattenlacka.png")
const prylar_ovader = require("../../../assets/icons/perils/perilIcos/prylar_ovader.png")

const PERIL_IMAGE_MAP = {
  "ME.LEGAL": jag_juridisk_tvist,
  "ME.ASSAULT": jag_overfall,
  "ME.TRAVEL.SICK": jag_sjuk_pa_resa,
  "ME.TRAVEL.LUGGAGE.DELAY": jag_forsenat_bagage,
  "HOUSE.BRF.FIRE": lagenhet_eldsvada,
  "HOUSE.BRF.WATER": lagenhet_vattenlacka,
  "HOUSE.BRF.WEATHER": lagenhet_ovader,
  "HOUSE.RENT.FIRE": lagenhet_eldsvada,
  "HOUSE.RENT.WATER": lagenhet_vattenlacka,
  "HOUSE.RENT.WEATHER": lagenhet_ovader,
  "HOUSE.SUBLET.RENT.FIRE": lagenhet_eldsvada,
  "HOUSE.SUBLET.RENT.WATER": lagenhet_vattenlacka,
  "HOUSE.SUBLET.RENT.WEATHER": lagenhet_ovader,
  "HOUSE.SUBLET.RENT.APPLIANCES": lagenhet_vitvaror,
  "HOUSE.SUBLET.BRF.APPLIANCES": lagenhet_vitvaror,
  "HOUSE.SUBLET.BRF.FIRE": lagenhet_eldsvada,
  "HOUSE.SUBLET.BRF.WATER": lagenhet_vattenlacka,
  "HOUSE.SUBLET.BRF.WEATHER": lagenhet_ovader,
  "HOUSE.BREAK-IN": lagenhet_inbrott,
  "HOUSE.DAMAGE": lagenhet_skadegorelse,
  "HOUSE.BRF.APPLIANCES": lagenhet_vitvaror,
  "HOUSE.RENT.APPLIANCES": lagenhet_vitvaror,
  "STUFF.CARELESS": prylar_drulle,
  "STUFF.THEFT": prylar_stold,
  "STUFF.DAMAGE": prylar_skadegorelse,
  "STUFF.BRF.FIRE": prylar_eldsvada,
  "STUFF.RENT.FIRE": prylar_eldsvada,
  "STUFF.SUBLET.RENT.FIRE": prylar_eldsvada,
  "STUFF.SUBLET.BRF.FIRE": prylar_eldsvada,
  "STUFF.BRF.WATER": prylar_vattenlacka,
  "STUFF.RENT.WATER": prylar_vattenlacka,
  "STUFF.SUBLET.RENT.WATER": prylar_vattenlacka,
  "STUFF.SUBLET.BRF.WATER": prylar_vattenlacka,
  "STUFF.BRF.WEATHER": prylar_ovader,
  "STUFF.RENT.WEATHER": prylar_ovader,
  "STUFF.SUBLET.RENT.WEATHER": prylar_ovader,
  "STUFF.SUBLET.BRF.WEATHER": prylar_ovader
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
