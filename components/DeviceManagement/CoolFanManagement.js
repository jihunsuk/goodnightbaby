import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CoolFanManagement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CoolFanManagement Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
