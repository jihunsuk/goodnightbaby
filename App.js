import React, { Component } from "react";
import { Header, Left, Right, Body, Container, Title } from "native-base";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import AlarmSetting from "./components/AlarmSetting";
import BabyManagement from "./components/BabyManagement";
import BabySelection from "./components/BabySelection";
import CoolFanSelection from "./components/CoolFanSelection";
import DeviceManagement from "./components/DeviceManagement";
import DeviceSelection from "./components/DeviceSelection";
import Home from "./components/Home";
import HumidifierSelection from "./components/HumidifierSelection";
import HumiditySetting from "./components/HumiditySetting";
import MeasurementHistory from "./components/MeasurementHistory";
import Setting from "./components/Setting";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Store from "./store";
import { PAGE_NAME, TITLE } from "./constants";

export default class App extends Component {
  constructor(props) {
    super(props);
    this._setPage = pageName => {
      this.setState({
        pageName: pageName,
        page: this._getPage(pageName)
      });
    };
    this._getPage = pageName => {
      switch (pageName) {
        case PAGE_NAME.home:
          return <Home />;
          break;
        case PAGE_NAME.babySelection:
          return <BabySelection />;
          break;
        case PAGE_NAME.deviceMgmt:
          return <DeviceManagement />;
          break;
        case PAGE_NAME.measurementHistory:
          return <MeasurementHistory />;
          break;
        case PAGE_NAME.setting:
          return <Setting />;
          break;
        case PAGE_NAME.babyAddition || PAGE_NAME.babyModification:
          return <BabyManagement />;
          break;
        case PAGE_NAME.deviceSelection:
          return <DeviceSelection />;
          break;
        case PAGE_NAME.coolFanSelection:
          return <CoolFanSelection />;
          break;
        case PAGE_NAME.humidifierSelection:
          return <HumidifierSelection />;
          break;
        case PAGE_NAME.temperatureSetting:
          return <TemeratureSetting />;
          break;
        case PAGE_NAME.humiditySetting:
          return <HumiditySetting />;
          break;
        case PAGE_NAME.alarmSetting:
          return <AlarmSetting />;
          break;
      }
    };
    this._setBaby = (baby, pageName) => {
      this.setState({
        baby,
        pageName,
        page: this._getPage(pageName)
      });
    };
    this.state = {
      // TODO: Remove if production, it's Test Data !!
      // pageName: PAGE_NAME.home,
      // page: <Home />,
      // baby: {
      //   name: "test"
      // },
      pageName: PAGE_NAME.babySelection,
      page: <BabySelection />,
      _setPage: this._setPage,
      _setBaby: this._setBaby
    };
  }

  // // TODO: Setting fonts
  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  //   });
  // }

  render() {
    return (
      <Container style={styles.container}>
        <Store.Provider value={this.state}>
          <Header style={styles.header}>
            <Left />
            <Body>
              <Title>{TITLE.goodnightbaby}</Title>
            </Body>
            <Right />
          </Header>
          <Content />
          {this.state.pageName !== PAGE_NAME.babySelection &&
          this.state.pageName !== PAGE_NAME.babyModification &&
          this.state.pageName !== PAGE_NAME.babyDeletion ? (
            <Sidebar />
          ) : null}
        </Store.Provider>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    // position: "absolute",
    // top: StatusBar.currentHeight,
    width: "100%",
    height: 40,
    backgroundColor: "#00df1a",
    alignItems: "center",
    justifyContent: "center"
  }
});
