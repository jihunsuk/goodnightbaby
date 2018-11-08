import React from "react";
import { StyleSheet } from "react-native";
import BabyInfo from "../BabyInfo";
import { Content } from "native-base";
import HomeFunction from "./HomeFunction";
import TempAndHumid from "./TempAndHumid";
import { connect } from "react-redux";
import { BluetoothActions } from "../../reduxStore/actionCreators";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { devices, activateDevice, isActivated } = this.props;
    console.log("devices: ", devices);
    console.log("isActivated: ", isActivated);
    if(devices !== null && isActivated === false) {
      console.log("ActivateDevice at Home");
      activateDevice(devices);
      BluetoothActions.setIsActivated(true);
    }

    return (
      <Content style={styles.container}>
        <BabyInfo />
        <TempAndHumid />
        <HomeFunction />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});

export default connect(({ bluetooth }) => ({
  activateDevice: bluetooth.get("functions").activateDevice,
  devices: bluetooth.get("devices"),
  isActivated: bluetooth.get("isActivated")
}))(Home);
