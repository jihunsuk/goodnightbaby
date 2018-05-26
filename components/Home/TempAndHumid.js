import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TempAndHumid extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.temp}>
          <Text>온도</Text>
          <Text>36.5</Text>
          <Text>측정하기</Text>
        </View>
        <View style={styles.humid}>
          <Text>습도</Text>
          <Text>50%</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
  },
    temp :{
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor : "green",
        borderRadius: 100,
        width: 200,
        height: 200,
        alignItems:'center',
        justifyContent:'center',
    },
    humid :{
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor : "green",
        borderRadius:100,
        width: 100,
        height: 100,
        alignItems:'center',
        justifyContent:'center',
    },
});
