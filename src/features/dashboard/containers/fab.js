import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { FloatingAction } from '@hedviginsurance/react-native-floating-action';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { NavigationEvents } from '../../../navigation/events';

import { chatActions } from '../../../../hedvig-redux';
import FabAction from '../components/FabAction';
import { getFabActions } from '../state/selectors';
import { colors } from '../../../style';

class FloatingActionButton extends React.Component {
  static propTypes = {
    fabActions: PropTypes.arrayOf(PropTypes.object).isRequired,
    goToChat: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  };
  static defaultProps = { fabActions: [] };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      modalStackIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.fabActions.length === 0) {
      this.props.getMessages();
    }
  }

  handlePressItem = (url) => {
    const maybeBackendAction = this.props.fabActions.filter(
      (a) => a.triggerUrl === url,
    );
    if (maybeBackendAction.length !== 1) {
      throw new Error(
        `Mismatch in remote and local fabActions: ${JSON.stringify(
          this.props.fabActions,
        )}, url: ${url}`,
      );
    }
    const backendAction = maybeBackendAction[0];
    if (backendAction.enabled === false) {
      return;
    }
    this.props.goToChat(url);
  };

  onNavigationCommand = async (name) => {
    if (name === 'showModal') {
      this.setState({
        show: false,
        modalStackIndex: this.state.modalStackIndex + 1,
      });
    }
    if (name === 'dismissModal') {
      if (this.state.modalStackIndex === 1) {
        setTimeout(
          () => this.setState({ show: true, modalStackIndex: 0 }),
          250,
        );
      } else {
        this.setState({ modalStackIndex: this.state.modalStackIndex - 1 });
      }
    }
  };

  render() {
    const { fabActions } = this.props;

    return (
      <React.Fragment>
        <NavigationEvents onNavigationCommand={this.onNavigationCommand} />
        {this.state.show && (
          <FloatingAction
            color="#651eff"
            distanceToEdge={isIphoneX() ? 55 : 20}
            position="center"
            customButtonStyles={{
              shadowColor: colors.PURPLE,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
            floatingIcon={
              <Image
                source={require('../../../../assets/buttons/fab/fab-icon.png')}
              />
            }
            overlayColor="rgba(0,0,0,0.05)"
            actions={fabActions.map((a) => ({
              name: a.triggerUrl,
              margin: 0,
              render: (props) => (
                <FabAction {...props} text={a.text} enabled={a.enabled} />
              ),
            }))}
            actionsPaddingTopBottom={0}
            onPressItem={this.handlePressItem}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({ fabActions: getFabActions(state) }),
  (dispatch) => ({
    goToChat: (url) =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: 'POST',
          url,
          SUCCESS: 'INITIATED_CHAT_MAIN',
        }),
      ),
    getMessages: () => dispatch(chatActions.getMessages()),
  }),
)(FloatingActionButton);
