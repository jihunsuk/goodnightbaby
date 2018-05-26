import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TempAndHumid extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>온도, 습도 출력 및 측정</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
