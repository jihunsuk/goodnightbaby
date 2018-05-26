import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MeasurementHistory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MeasurementHistory Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});