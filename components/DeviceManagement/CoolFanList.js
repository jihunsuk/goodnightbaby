import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CoolFanList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CoolFanList Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
