import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Content extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Content Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
