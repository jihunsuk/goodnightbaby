import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BabyManagement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BabyManagement Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
