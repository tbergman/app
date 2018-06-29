import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import { EmptyHeaderItem, StyledNavBarContainer } from './styles/navbar';

const styles = StyleSheet.create({
  header: {
    fontFamily: 'merriweather',
    color: '#414150',
    fontSize: 16,
    textAlign: 'center',
  },
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
      <StyledNavBarContainer>
        <View style={styles.headerItem}>{headerLeft}</View>
        <View style={[styles.headerItem, styles.centerItem]}>
          <Image
            source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark_black.png')}
            style={styles.hedvigLogo}
          />
        </View>
        <View style={styles.headerItem}>{headerRight}</View>
      </StyledNavBarContainer>
    );
  }
}

export { NavBar };
