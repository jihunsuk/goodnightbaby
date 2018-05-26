import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';

export default class Content extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.page}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: StatusBar.currentHeight + 40,
    bottom: 50,
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
  },
});