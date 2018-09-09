import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Store from "../store";

export default class Sidebar extends React.Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <View style={styles.container}>
              <Text
                style={styles.icon}
                onPress={() => {
                  store._setPage("Home");
                }}
              >

              </Text>
              <Text
                style={styles.icon}
                onPress={() => {
                  store._setPage("BabySelection");
                }}
              >
                아이선택
              </Text>
              <Text
                style={styles.icon}
                onPress={() => {
                  store._setPage("DeviceManagement");
                }}
              >
                장치관리
              </Text>
              <Text
                style={styles.icon}
                onPress={() => {
                  store._setPage("MeasurementHistory");
                }}
              >
                측정기록
              </Text>
              <Text
                style={styles.icon}
                onPress={() => {
                  store._setPage("Setting");
                }}
              >
                설정
              </Text>
            </View>
          );
        }}
      </Store.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 50
  },
  icon: {
    marginHorizontal: 10
  }
});
