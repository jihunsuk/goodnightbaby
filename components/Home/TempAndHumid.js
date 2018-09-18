import React from "react";
import { StyleSheet, Text, View } from "react-native";
import realm from "../../realm/realmDatabase";
import { connect } from "react-redux";
import { BabyActions } from "../../reduxStore/actionCreators";

class TempAndHumid extends React.Component {
  constructor(props) {
    super(props);
    const { baby } = this.props;
    babyInfo = realm.objects("baby").filtered(`name = "${baby.name}"`)[0];
    history = realm.objects("history").filtered(`babyId = "${baby.id}"`);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewTemperature}>
          <Text style={styles.textTemperature}>온도</Text>
          <Text style={styles.textTemperatureNumber}>
            {this.props.temp}
            ˚C
          </Text>
        </View>
        <View style={styles.viewHumidity}>
          <Text style={styles.textHumidity}>습도</Text>
          <Text style={styles.textHumidityNumber}>{this.props.humid}%</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40
  },
  textTemperature: {
    color: "white",
    fontSize: 30
  },
  textTemperatureNumber: {
    color: "white",
    fontSize: 80
  },
  textHumidity: {
    color: "white",
    fontSize: 20
  },
  textHumidityNumber: {
    color: "white",
    fontSize: 50
  },
  viewTemperature: {
    borderRadius: 100,
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginRight: 10
  },
  viewHumidity: {
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue"
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby"),
  temp: baby.get("temp"),
  humid: baby.get("humid")
}))(TempAndHumid);
