import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TranslationsConsumer } from 'src/components/translations/consumer';

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
                title={
                  <TranslationsConsumer textKey="OFFER_PERSONAL_PROTECTION_TITLE">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                categoryTitle={data.insurance.perilCategories[0].title}
                description={
                  <TranslationsConsumer textKey="OFFER_PERSONAL_PROTECTION_DESCRIPTION">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                perils={data.insurance.perilCategories[0].perils}
                explainer={
                  <TranslationsConsumer textKey="OFFER_PERILS_EXPLAINER">
                    {(text) => text}
                  </TranslationsConsumer>
                }
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
