import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid
} from "react-native";
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
      medic_len: realm.objects("medic").length
    };
    this.handleMedicOnClick = this.handleMedicOnClick.bind(this);
  }

  prescribe(index) {
    realm.write(() => {
      realm.create(
        "medic",
        {
          id: index,
          babyId: babyInfo.id,
          time: new Date()
        },
        true
      );
    });
  }

  /* handle onClick Start */
  handleMedicOnClick() {
    let { medic_len } = this.state;
    this.prescribe(medic_len);
    this.setState({
       medic_len : medic_len+1
    });
    ToastAndroid.showWithGravity(
      "해열제 투약을 기록했습니다.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }
  /* handle onClick End */

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.viewMedicMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="medkit" />
          </View>
          <TouchableHighlight
            {...commonStyles.touchableHighlightProps}
            onPress={this.handleMedicOnClick}
          >
            <Text style={[styles.textMenu, { color: "white" }]}>
              해열제 투약
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="nuclear" />
          </View>
          <Text style={[styles.textMenu, { color: "blue" }]}>
            {this.props.coolFanState === ETC.status.running
              ? KO.runningCoolFan
              : KO.stoppedCoolFan}
          </Text>
        </View>
        <View style={[styles.viewMenu]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="cloud" />
          </View>
          <Text style={[styles.textMenu, { color: "black" }]}>
            {this.props.humidifierState === ETC.status.running
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
  viewMedicMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    backgroundColor: "green",
    padding: 10
  },
  textMenu: {
    fontSize: 22,
    marginLeft: 10
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby"),
  coolFanState: baby.get("coolFanState"),
  humidifierState: baby.get("humidifierState")
}))(HomeFunction);
