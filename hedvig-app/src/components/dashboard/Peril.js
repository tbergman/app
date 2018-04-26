/* global require */
import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';

const meLegalTrouble = require('../../../assets/icons/perils/perilIcos/jag_juridisk_tvist.png');
const meAssault = require('../../../assets/icons/perils/perilIcos/jag_overfall.png');
const meIllness = require('../../../assets/icons/perils/perilIcos/jag_sjuk_pa_resa.png');
const meDelayedLuggage = require('../../../assets/icons/perils/perilIcos/jag_forsenat_bagage.png');
const apartmentFire = require('../../../assets/icons/perils/perilIcos/lagenhet_eldsvada.png');
const apartmentWaterLeak = require('../../../assets/icons/perils/perilIcos/lagenhet_vattenlacka.png');
const apartmentWeather = require('../../../assets/icons/perils/perilIcos/lagenhet_ovader.png');
const apartmentAppliances = require('../../../assets/icons/perils/perilIcos/lagenhet_vitvaror.png');
const apartmentBreakIn = require('../../../assets/icons/perils/perilIcos/lagenhet_inbrott.png');
const apartmentVandalisation = require('../../../assets/icons/perils/perilIcos/lagenhet_skadegorelse.png');
const stuffAllRisk = require('../../../assets/icons/perils/perilIcos/prylar_drulle.png');
const stuffTheft = require('../../../assets/icons/perils/perilIcos/prylar_stold.png');
const stuffVandalisation = require('../../../assets/icons/perils/perilIcos/prylar_skadegorelse.png');
const stuffFire = require('../../../assets/icons/perils/perilIcos/prylar_eldsvada.png');
const stuffWaterLeak = require('../../../assets/icons/perils/perilIcos/prylar_vattenlacka.png');
const stuffWeather = require('../../../assets/icons/perils/perilIcos/prylar_ovader.png');

const PERIL_IMAGE_MAP = {
  'ME.LEGAL': meLegalTrouble,
  'ME.ASSAULT': meAssault,
  'ME.TRAVEL.SICK': meIllness,
  'ME.TRAVEL.LUGGAGE.DELAY': meDelayedLuggage,
  'HOUSE.BRF.FIRE': apartmentFire,
  'HOUSE.RENT.FIRE': apartmentFire,
  'HOUSE.SUBLET.BRF.FIRE': apartmentFire,
  'HOUSE.SUBLET.RENT.FIRE': apartmentFire,
  'HOUSE.BRF.APPLIANCES': apartmentAppliances,
  'HOUSE.RENT.APPLIANCES': apartmentAppliances,
  'HOUSE.SUBLET.BRF.APPLIANCES': apartmentAppliances,
  'HOUSE.SUBLET.RENT.APPLIANCES': apartmentAppliances,
  'HOUSE.BRF.WEATHER': apartmentWeather,
  'HOUSE.RENT.WEATHER': apartmentWeather,
  'HOUSE.SUBLET.BRF.WEATHER': apartmentWeather,
  'HOUSE.SUBLET.RENT.WEATHER': apartmentWeather,
  'HOUSE.BRF.WATER': apartmentWaterLeak,
  'HOUSE.RENT.WATER': apartmentWaterLeak,
  'HOUSE.SUBLET.BRF.WATER': apartmentWaterLeak,
  'HOUSE.SUBLET.RENT.WATER': apartmentWaterLeak,
  'HOUSE.BREAK-IN': apartmentBreakIn,
  'HOUSE.DAMAGE': apartmentVandalisation,
  'STUFF.CARELESS': stuffAllRisk,
  'STUFF.THEFT': stuffTheft,
  'STUFF.DAMAGE': stuffVandalisation,
  'STUFF.BRF.FIRE': stuffFire,
  'STUFF.RENT.FIRE': stuffFire,
  'STUFF.SUBLET.BRF.FIRE': stuffFire,
  'STUFF.SUBLET.RENT.FIRE': stuffFire,
  'STUFF.BRF.WATER': stuffWaterLeak,
  'STUFF.RENT.WATER': stuffWaterLeak,
  'STUFF.SUBLET.BRF.WATER': stuffWaterLeak,
  'STUFF.SUBLET.RENT.WATER': stuffWaterLeak,
  'STUFF.BRF.WEATHER': stuffWeather,
  'STUFF.RENT.WEATHER': stuffWeather,
  'STUFF.SUBLET.BRF.WEATHER': stuffWeather,
  'STUFF.SUBLET.RENT.WEATHER': stuffWeather,
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    marginLeft: 22,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    marginTop: 5,
    fontFamily: 'circular',
    fontSize: 12,
    color: '#9B9BAA',
    textAlign: 'center',
  },
});

export class Peril extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Perils', {
            title: this.props.categoryTitle,
            items: this.props.categoryPerils.map((i) => ({
              ...i,
              imageUrl: undefined,
              itemSrc: PERIL_IMAGE_MAP[i.id],
            })),
            initialSlideIndex: this.props.perilIndex,
          })
        }
      >
        <View style={styles.container}>
          <Image
            source={PERIL_IMAGE_MAP[this.props.peril.id]}
            style={styles.icon}
          />
          <Text style={styles.title}>{this.props.peril.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
