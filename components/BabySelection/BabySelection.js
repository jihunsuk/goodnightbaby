import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BabySelection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BabySelection Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
