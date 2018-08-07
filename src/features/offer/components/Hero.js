import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {
  verticalSizeClass,
  V_SPACIOUS,
  V_REGULAR,
  V_COMPACT,
} from '../../../services/DimensionSizes';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  hero: {
    width: viewportWidth,
  },
  image: {
    width: viewportWidth,
    height: {
      [V_SPACIOUS]: 250,
      [V_REGULAR]: 170,
      [V_COMPACT]: 130,
    }[verticalSizeClass],
  },
});

export class Hero extends React.Component {
  render() {
    const { containerStyle = {} } = this.props;
    const resizeMode = {
      [V_SPACIOUS]: 'cover',
      [V_REGULAR]: 'contain',
      [V_COMPACT]: 'contain',
    }[verticalSizeClass];

    return (
      <View style={[styles.hero, containerStyle]}>
        <Image
          resizeMode={resizeMode}
          style={styles.image}
          source={this.props.source}
        />
      </View>
    );
  }
}
