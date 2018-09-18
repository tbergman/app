import React from 'react';

export class Lifecycle extends React.Component {
  componentDidMount() {
    const { mount } = this.props;

    if (mount) {
      mount(this.props);
    }
  }

  shouldComponentUpdate({ shouldUpdate, ...nextProps }) {
    if (shouldUpdate) {
      return shouldUpdate(nextProps, this.props);
    }

    return true;
  }

  UNSAFE_componentWillReceiveProps({ willReceiveProps, ...nextProps }) {
    if (willReceiveProps) {
      willReceiveProps(nextProps, this.props);
    }
  }

  render() {
    return this.props.children;
  }
}
