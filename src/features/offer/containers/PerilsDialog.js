import { connect } from 'react-redux';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  Dimensions,
  Keyboard,
} from 'react-native';
import * as R from 'ramda';
import { DraggableOverlay } from 'src/components/draggable-overlay';

import { PERIL_IMAGE_MAP } from '../../../features/dashboard/components/Peril';

import {
  PERILS_DIALOG_SHOWN,
  PERILS_DIALOG_DISMISSED,
  PERILS_UNSET_ACTIVE,
} from '../state/actions';
import { Description } from '../components/Description';
import { Heading } from '../components/Heading';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  dialogContent: {
    height: '100%',
    backgroundColor: colors.OFF_WHITE,
    borderRadius: 3,
    overflow: 'hidden',
  },
  dialogHeading: {
    fontFamily: 'CircularStd-Book',
    color: colors.OFF_BLACK,
    fontSize: 23,
    lineHeight: 32,
    marginTop: 15,
  },
  contentWrapper: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  dialogSubHeading: {
    fontFamily: 'CircularStd-Book',
    color: colors.DARK_GRAY,
    fontSize: 17,
    marginTop: 5,
  },
  dialogImage: {
    marginTop: 18,
    marginBottom: 10,
    height: 60,
    width: 60,
  },
  perilsContent: {
    padding: 25,
  },
  perilsHeader: {
    padding: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

class PerilsDialog extends React.Component {
  state = { isVisible: false };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidUpdate(prevProps) {
    const { activePeril } = this.props;

    if (activePeril !== prevProps.activePeril) {
      if (activePeril) {
        Keyboard.dismiss();
        this.setState({ isVisible: true });
      } else {
        this.setState({ isVisible: false });
      }
    }
  }

  onBackPress = () => {
    this.props.unsetActivePeril();
  };

  isPerilActive(peril) {
    const { activePeril } = this.props;
    return peril && R.path(['id'], activePeril) === R.path(['id'], peril);
  }

  cleanTitle(title) {
    // Backend hyphenates some titles so until we do this on the front end
    // entirely we need to strip those hyphens for the main title
    return (title || '').replace(/[\n-]/g, '');
  }

  getHeightPercentage() {
    if (this.props.activePeril.description.length > 300) {
      return 70;
    }

    if (this.props.activePeril.description.length > 200) {
      return 60;
    }

    return 50;
  }

  render() {
    return (
      this.props.activePeril &&
      this.state.isVisible && (
        <DraggableOverlay
          onClose={() => {
            this.props.unsetActivePeril();
            this.setState({ isVisible: false });
          }}
          heightPercentage={this.getHeightPercentage()}
        >
          <View style={styles.dialogContent}>
            <View style={styles.perilsHeader}>
              <View>
                <Text style={styles.dialogHeading}>
                  {this.props.activePerilCategoryTitle}
                </Text>
                <Text style={styles.dialogSubHeading}>Försäkras mot</Text>
              </View>
              <Image
                style={styles.dialogImage}
                source={PERIL_IMAGE_MAP[this.props.activePeril.id]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.perilsContent}>
                <Heading>
                  {this.cleanTitle(this.props.activePeril.title)}
                </Heading>
                <Description>{this.props.activePeril.description}</Description>
              </View>
            </View>
          </View>
        </DraggableOverlay>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const {
    activePeril,
    isPerilsDialogOpen,
    activePerilCategoryTitle,
  } = state.offer;
  return {
    activePeril,
    isPerilsDialogOpen,
    activePerilCategoryTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unsetActivePeril: () =>
      dispatch({
        type: PERILS_UNSET_ACTIVE,
      }),
    dialogShown: () => {
      dispatch({
        type: PERILS_DIALOG_SHOWN,
      });
    },
    dialogDismissed: () => {
      dispatch({
        type: PERILS_DIALOG_DISMISSED,
      });
    },
  };
};

const PerilsDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PerilsDialog);

export { PerilsDialogContainer as PerilsDialog };
