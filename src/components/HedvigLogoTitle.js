import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import { EmptyHeaderItem, StyledNavBarContainer } from './styles/navbar';

const styles = StyleSheet.create({
  headerItem: {
    width: '33%',
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  hedvigLogo: {
    width: 96,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class NavBar extends React.Component {
  static propTypes = {
    headerLeft: PropTypes.element,
    headerRight: PropTypes.element,
  };
  static defaultProps = {
    headerLeft: <EmptyHeaderItem />,
    headerRight: <EmptyHeaderItem />,
  };

  render() {
    const { headerLeft, headerRight } = this.props;
    return (
      <Image
        source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark.png')}
        style={styles.hedvigLogo}
      />
    );
  }
}

export { NavBar };
