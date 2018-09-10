import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PAGE_NAME } from "../constants";
import { BabyActions } from "../reduxStore/actionCreators";
import { connect } from "react-redux";

class Sidebar extends React.Component {
  render() {
    const { pageName } = this.props;
    if (
      pageName !== PAGE_NAME.babySelection &&
      pageName !== PAGE_NAME.babyModification &&
      pageName !== PAGE_NAME.babyDeletion
    ) {
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
    } else {
      return null;
    }
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

export default connect(({ baby }) => ({
  pageName: baby.get("pageName")
}))(Sidebar);
