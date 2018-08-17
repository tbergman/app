import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  verticalSizeClass,
  V_SPACIOUS,
  V_REGULAR,
  V_COMPACT,
} from '../../../services/DimensionSizes';
import { PERIL_IMAGE_MAP } from '../../../features/dashboard/components/Peril';
import { PERILS_SET_ACTIVE } from '../state/actions';
import { Description } from '../components/Description';
import { Heading } from '../components/Heading';

import { colors } from '../../../style';

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  perilsDescription: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  perilsWrapper: {
    marginTop: 30,
    paddingLeft: 1,
    paddingRight: 1,
  },
  perilsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
  },
  peril: {
    width: '25%',
    alignItems: 'center',
  },
  perilIcon: {
    width: 51,
    height: 51,
  },
  perilTitle: {
    paddingLeft: 7,
    paddingRight: 7,
    fontFamily: 'CircularStd-Book',
    fontSize: 15,
    color: colors.DARK_GRAY,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 10,
  },
  moreInfo: {
    color: '#cbcbd0',
    fontFamily: 'CircularStd-Book',
    fontSize: 17,
    textAlign: 'center',
    marginTop: {
      [V_SPACIOUS]: 50,
      [V_REGULAR]: 35,
      [V_COMPACT]: 20,
    }[verticalSizeClass],
  },
});

const hitSlop = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};

class PerilsOverview extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.hero}
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            <View style={styles.perilsDescription}>
              <Heading>{this.props.title}</Heading>
              <Description>{this.props.description}</Description>
            </View>
            <View style={styles.perilsWrapper}>
              <View style={styles.perilsContainer}>
                {this.props.perils.map((peril, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.setActivePeril(
                        peril,
                        this.props.categoryTitle,
                      );
                    }}
                    hitSlop={hitSlop}
                    style={styles.peril}
                    key={index}
                  >
                    <Image
                      source={PERIL_IMAGE_MAP[peril.id]}
                      style={styles.perilIcon}
                    />
                    <Text style={styles.perilTitle}>{peril.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {this.props.explainer ? (
              <Text style={styles.moreInfo}>{this.props.explainer}</Text>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePeril: (peril, title) => {
      dispatch({
        type: PERILS_SET_ACTIVE,
        payload: {
          peril,
          title,
        },
      });
    },
  };
};

const PerilsOverviewContainer = connect(
  null,
  mapDispatchToProps,
)(PerilsOverview);

export { PerilsOverviewContainer as PerilsOverview };
