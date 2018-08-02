import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HumidifierSelection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HumidifierSelection Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
