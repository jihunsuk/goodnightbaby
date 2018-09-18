import React from 'react';
import { StyleSheet } from 'react-native';
import CoolFanManagement from "./CoolFanManagement";
import HumidifierManagement from "./HumidifierManagement";
import { Content } from "native-base";

export default class DeviceManagement extends React.Component {
  render() {
    return (
      <Content style={styles.container}>
        <CoolFanManagement />
        <HumidifierManagement />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
