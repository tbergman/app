import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  verticalSizeClass,
  V_SPACIOUS,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';
import { PerilsQuery } from './perils-query';

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: {
    backgroundColor: '#f5f4f7',
  },
});

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/you.png');
    const spacious = require('../../../../../assets/offer/hero/you-xl.png');
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
                title="Personskyddet"
                categoryTitle={data.insurance.perilCategories[0].title}
                description={
                  <React.Fragment>
                    Hedvig skyddar dig mot obehagliga saker som kan hända på
                    hemmaplan, och det mesta som kan hända när du är ute
                    och&nbsp;reser.
                  </React.Fragment>
                }
                perils={data.insurance.perilCategories[0].perils}
                explainer={'Tryck på ikonerna för mer info'}
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
