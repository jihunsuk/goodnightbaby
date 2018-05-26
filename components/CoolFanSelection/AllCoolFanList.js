import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AllCoolFanList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AllCoolFanList Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
