import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PerilsQuery } from './perils-query';

import {
  verticalSizeClass,
  V_SPACIOUS,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: {
    backgroundColor: '#f8f7f9',
  },
});

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/house.png');
    const spacious = require('../../../../../assets/offer/hero/house-xl.png');
    const heroImage =
      {
        [V_SPACIOUS]: spacious,
      }[verticalSizeClass] || regular;

    return (
      <PerilsQuery>
        {({ data, loading, error }) =>
          loading || error ? null : (
            <View style={styles.container}>
              <PerilsOverview
                title="Lägenhetsskyddet"
                categoryTitle={data.insurance.perilCategories[1].title}
                description={
                  <React.Fragment>
                    Vi vet hur mycket ett hem betyder. Därför ger vi det ett
                    riktigt bra skydd, så att du kan känna dig trygg i
                    alla&nbsp;lägen.
                  </React.Fragment>
                }
                perils={data.insurance.perilCategories[1].perils}
                hero={
                  <Hero
                    containerStyle={styles.heroBackground}
                    source={heroImage}
                  />
                }
              />
            </View>
          )
        }
      </PerilsQuery>
    );
  }
}

export default OfferScreen;
