import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Content, Icon, Text } from "native-base";
import { commonStyles } from "../../styles";
import { KO, PAGE_NAME } from "../../constants";
import { BabyActions } from "../../reduxStore/actionCreators";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import HeaderTemplate from "../../component/HeaderTemplate/HeaderTemplate";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.handleTempSettingOnPress = this.handleTempSettingOnPress.bind(this);
    this.handleHumidSettingOnPress = this.handleHumidSettingOnPress.bind(this);
    this.handleAlarmSettingOnPress = this.handleAlarmSettingOnPress.bind(this);
  }

  /* handle onClick Start */
  handleTempSettingOnPress() {
    BabyActions.setPageName(PAGE_NAME.temperatureSetting);
  }

  handleHumidSettingOnPress() {
    BabyActions.setPageName(PAGE_NAME.humiditySetting);
  }

  handleAlarmSettingOnPress() {
    BabyActions.setPageName(PAGE_NAME.alarmSetting);
  }
  /* handle onClick End */

  render() {
    const buttonProps = {
      dark: true,
      transparent: true,
      iconRight: true
    };

    return (
      <Content style={styles.container}>
        <HeaderTemplate title="설정" />
        <View style={styles.viewMenus}>
          <Button
            {...buttonProps}
            style={styles.buttonMenu}
            onPress={this.handleTempSettingOnPress}
          >
            <Text>{KO.temperatureSetting}</Text>
            <Icon name="arrow-round-forward" />
          </Button>
          <Button
            {...buttonProps}
            style={styles.buttonMenu}
            onPress={this.handleHumidSettingOnPress}
          >
            <Text>{KO.humiditySetting}</Text>
            <Icon name="arrow-round-forward" />
          </Button>
          {/*<Button*/}
            {/*{...buttonProps}*/}
            {/*style={styles.buttonMenu}*/}
            {/*onPress={this.handleAlarmSettingOnPress}*/}
          {/*>*/}
            {/*<Text>{KO.alarmSetting}</Text>*/}
            {/*<Icon name="arrow-round-forward" />*/}
          {/*</Button>*/}
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  buttonMenu: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 5
  },
  viewMenus: {
    margin: 15
  }
});
