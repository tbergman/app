import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: 'stretch',
    backgroundColor: '#f9fafc',
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { backgroundColor: '#ffffff' },
  listElement: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafc',
  },
  listElementTexts: { flex: 1, marginRight: 16, marginLeft: 16 },
  listElementHeading: {
    fontFamily: 'merriweather',
    color: '#414150',
    fontSize: 16,
  },
  listElementText: { fontFamily: 'circular', color: '#9b9baa', fontSize: 14 },
  rowButton: { alignSelf: 'flex-end' },
});

export class StyledListHeader extends React.Component {
  render() {
    return <View {...this.props} style={styles.listHeader} />;
  }
}

export class StyledList extends React.Component {
  render() {
    return <ScrollView {...this.props} style={styles.list} />;
  }
}

export class StyledListElement extends React.Component {
  render() {
    return <View {...this.props} style={styles.listElement} />;
  }
}

export class TouchableStyledListElement extends React.Component {
  render() {
    return <TouchableOpacity {...this.props} style={styles.listElement} />;
  }
}

export class StyledListElementTexts extends React.Component {
  render() {
    return <View {...this.props} style={styles.listElementTexts} />;
  }
}

export class StyledListElementHeading extends React.Component {
  render() {
    return <Text {...this.props} style={styles.listElementHeading} />;
  }
}

export class StyledListElementText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.listElementText} />;
  }
}

export class StyledRowButton extends React.Component {
  render() {
    return <View {...this.props} style={styles.rowButton} />;
  }
}
