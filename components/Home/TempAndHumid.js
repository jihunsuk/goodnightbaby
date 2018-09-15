import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class TempAndHumid extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewTemperature}>
          <Text style={styles.textTemperature}>온도</Text>
          {/*TODO: 온도*/}
          <Text style={styles.textTemperatureNumber}>36.5</Text>
        </View>
        <View style={styles.viewHumidity}>
          <Text style={styles.textHumidity}>습도</Text>
          {/*TODO: 습도*/}
          <Text style={styles.textHumidityNumber}>50%</Text>
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
