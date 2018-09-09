import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { PAGE_NAME } from "../constants";
import CoolFanSelection from "../components/CoolFanSelection";
import DeviceManagement from "../components/DeviceManagement";
import DeviceSelection from "../components/DeviceSelection";
import Home from "../components/Home";
import HumidifierSelection from "../components/HumidifierSelection";
import HumiditySetting from "../components/HumiditySetting";
import MeasurementHistory from "../components/MeasurementHistory";
import Setting from "../components/Setting";
import AlarmSetting from "../components/AlarmSetting";
import BabyManagement from "../components/BabyManagement";
import BabySelection from "../components/BabySelection";

class ContentTemplate extends React.Component {
  _getPage(pageName) {
    switch (pageName) {
      case PAGE_NAME.home:
        return <Home />;
      case PAGE_NAME.babySelection:
        return <BabySelection />;
      case PAGE_NAME.deviceMgmt:
        return <DeviceManagement />;
      case PAGE_NAME.measurementHistory:
        return <MeasurementHistory />;
      case PAGE_NAME.setting:
        return <Setting />;
      case PAGE_NAME.babyAddition || PAGE_NAME.babyModification:
        return <BabyManagement />;
      case PAGE_NAME.deviceSelection:
        return <DeviceSelection />;
      case PAGE_NAME.coolFanSelection:
        return <CoolFanSelection />;
      case PAGE_NAME.humidifierSelection:
        return <HumidifierSelection />;
      case PAGE_NAME.temperatureSetting:
        return <TemeratureSetting />;
      case PAGE_NAME.humiditySetting:
        return <HumiditySetting />;
      case PAGE_NAME.alarmSetting:
        return <AlarmSetting />;
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  render() {
    const { pageName } = this.props;
    const page = this._getPage(pageName);
    return <Fragment>{page}</Fragment>;
  }
}

export default connect(({ baby }) => ({
  pageName: baby.get("pageName")
}))(ContentTemplate);
