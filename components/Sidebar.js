import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PAGE_NAME } from "../constants";
import { BabyActions } from "../reduxStore/actionCreators";

export default class Sidebar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.icon}
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.home);
          }}
        >
          홈
        </Text>
        <Text
          style={styles.icon}
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.babySelection);
          }}
        >
          아이선택
        </Text>
        <Text
          style={styles.icon}
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.deviceMgmt);
          }}
        >
          장치관리
        </Text>
        <Text
          style={styles.icon}
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.measurementHistory);
          }}
        >
          측정기록
        </Text>
        <Text
          style={styles.icon}
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.setting);
          }}
        >
          설정
        </Text>
      </View>
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
