import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  verticalSizeClass,
  V_SPACIOUS,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';
import { isStudentInsurance } from '../../../../utils';
import { PerilsQuery } from './perils-query';

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: {
    backgroundColor: '#f5f4f7',
  },
});

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/stuff.png');
    const spacious = require('../../../../../assets/offer/hero/stuff-xl.png');
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
                title="Prylskyddet"
                categoryTitle={data.insurance.perilCategories[2].title}
                description={
                  <React.Fragment>
                    Med Hedvig får du ett komplett skydd för dina prylar.
                    Drulleförsäkring ingår och täcker prylar värda upp till
                    {isStudentInsurance(data.insurance.type)
                      ? ' 25 000'
                      : ' 50 000'}{' '}
                    kr styck.
                  </React.Fragment>
                }
                perils={data.insurance.perilCategories[2].perils}
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
