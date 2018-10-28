import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { PAGE_NAME, touchableHighlightProps } from "../constants";
import { BabyActions } from "../reduxStore/actionCreators";
import { connect } from "react-redux";
import { Text, Icon } from "native-base";
import { commonStyles } from "../styles";

class Sidebar extends React.Component {
  render() {
    const { pageName } = this.props;
    if (
      pageName !== PAGE_NAME.babySelection &&
      pageName !== PAGE_NAME.babyAddition &&
      pageName !== PAGE_NAME.babyModification &&
      pageName !== PAGE_NAME.babyDeletion
    ) {
      return <View style={styles.container}>
          <View style={styles.viewSidebarMenu}>
            <TouchableHighlight {...touchableHighlightProps} onPress={() => {
                BabyActions.setPageName(PAGE_NAME.home);
              }} style={[styles.touchableHighlightMenu, commonStyles.viewCenter]}>
              <View style={[commonStyles.viewCenter]}>
                <Icon name="home" style={commonStyles.iconMenu} />
                <Text>홈</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.viewSidebarMenu}>
            <TouchableHighlight {...touchableHighlightProps} onPress={() => {
                BabyActions.setPageName(PAGE_NAME.babySelection);
              }} style={[styles.touchableHighlightMenu, commonStyles.viewCenter]}>
              <View style={[commonStyles.viewCenter]}>
                <Icon name="logo-octocat" style={commonStyles.iconMenu} />
                <Text>아이선택</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.viewSidebarMenu}>
            <TouchableHighlight {...touchableHighlightProps} onPress={() => {
                BabyActions.setPageName(PAGE_NAME.deviceMgmt);
              }} style={[styles.touchableHighlightMenu, commonStyles.viewCenter]}>
              <View style={[commonStyles.viewCenter]}>
                <Icon name="logo-android" style={commonStyles.iconMenu} />
                <Text>장치관리</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.viewSidebarMenu}>
            <TouchableHighlight {...touchableHighlightProps} onPress={() => {
                BabyActions.setPageName(PAGE_NAME.measurementHistory);
              }} style={[styles.touchableHighlightMenu, commonStyles.viewCenter]}>
              <View style={[commonStyles.viewCenter]}>
                <Icon name="document" style={commonStyles.iconMenu} />
                <Text>측정기록</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.viewSidebarMenu}>
            <TouchableHighlight {...touchableHighlightProps} onPress={() => {
                BabyActions.setPageName(PAGE_NAME.setting);
              }} style={[styles.touchableHighlightMenu, commonStyles.viewCenter]}>
              <View style={[commonStyles.viewCenter]}>
                <Icon name="settings" style={commonStyles.iconMenu} />
                <Text>설정</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>;
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
    height: 70,
    width: "100%",
    borderColor: "#e0e0e0",
    borderWidth: 1
  },
  viewSidebarMenu: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: "20%"
  },
  touchableHighlightMenu: {
    width: "100%",
    height: "100%"
  }
});

export default connect(({ baby }) => ({
  pageName: baby.get("pageName")
}))(Sidebar);
