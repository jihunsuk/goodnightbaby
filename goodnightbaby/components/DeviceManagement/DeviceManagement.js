import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  BabyInfo from '../BabyInfo'
import CoolFanManagement from "./CoolFanManagement";
import HumidifierManagement from "./HumidifierManagement";

export default class DeviceManagement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BabyInfo />
        <Text>조절장치관리</Text>
        <CoolFanManagement />
        <HumidifierManagement />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
