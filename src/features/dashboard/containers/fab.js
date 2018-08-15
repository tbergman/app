import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { FloatingAction } from '@hedviginsurance/react-native-floating-action';

import { NavigationEvents } from '../../../navigation/events';

import { chatActions } from '../../../../hedvig-redux';
import FabAction from '../components/FabAction';
import { getFabActions } from '../state/selectors';

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

  onNavigationCommand = (name) => {
    if (name === 'showModal') {
      this.setState({ show: false });
    }
    if (name === 'dismissModal') {
      setTimeout(() => this.setState({ show: true }), 250);
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
            distanceToEdge={55}
            position="center"
            floatingIcon={
              <Image
                source={require('../../../../assets/buttons/fab/fab-icon.png')}
              />
            }
            overlayColor="rgba(0,0,0,0.10)"
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
