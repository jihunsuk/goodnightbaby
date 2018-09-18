import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import realm from "../../realm/realmDatabase";
import { commonStyles } from "../../styles";
import { ETC, KO } from "../../constants";

let babyInfo;

class HomeFunction extends React.Component {
  constructor(props) {
    super(props);
    const { baby } = this.props;
    babyInfo = realm.objects("baby").filtered(`name = "${baby.name}"`)[0];
    this.state = {
      humidifierStatus: ETC.status.stopped,
      coolFanStatus: ETC.status.running
    };
  }

  prescribe() {
    let len = realm.objects("medic").length;
    realm.write(() => {
      newMedic = realm.create(
        "medic",
        {
          id: len,
          babyId: babyInfo.id,
          time: new Date()
        },
        true
      );
    });
  }

  render() {
    const { coolFanStatus, humidifierStatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="medkit" />
          </View>
          <TouchableHighlight
            onPress={() => {
              this.prescribe();
            }}
          >
            <Text style={[styles.textMenu, { color: "green" }]}>
              해열제 투약
            </Text>
          </TouchableHighlight>
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

export default connect(({ baby }) => ({
  baby: baby.get("baby")
}))(HomeFunction);
