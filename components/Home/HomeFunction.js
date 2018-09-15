import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";
import { commonStyles } from "../../styles";
import { ETC, KO } from "../../constants";

export default class HomeFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coolFanStatus: ETC.status.running,
      humidifierStatus: ETC.status.stopped
    };
  }

  render() {
    const { coolFanStatus, humidifierStatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="medkit" />
          </View>
          <Text style={[styles.textMenu, { color: "green" }]}>해열제 투약</Text>
        </View>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="nuclear" />
          </View>
          <Text style={[styles.textMenu, { color: "blue" }]}>
            {coolFanStatus === ETC.status.running
              ? KO.runningCoolFan
              : KO.stoppedCoolFan}
          </Text>
        </View>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="cloud" />
          </View>
          <Text style={[styles.textMenu, { color: "black" }]}>
            {humidifierStatus === ETC.status.running
              ? KO.runningHumidifier
              : KO.stoppedHumidifier}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  viewMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    backgroundColor: "#e0e0e0",
    padding: 10
  },
  textMenu: {
    fontSize: 22,
    marginLeft: 10
  }
});
