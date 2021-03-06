import React from "react";
import { StyleSheet, View } from "react-native";
import CoolFanList from "./CoolFanList";
import { connect } from "react-redux";
import { commonStyles } from "../../styles";
import { Content, Text, Switch } from "native-base";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC } from "../../constants";

class CoolFanManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.autoCoolFan === ETC.status.running
    };
  }
  toggleSwitch = value => {
    const { write } = this.props;
    this.setState({ switchValue: value });
    if (value === true) {
      write("u");
      BabyActions.setAutoCoolFan("RUNNING");
    } else {
      write("e");
      BabyActions.setAutoCoolFan("STOPPED");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[commonStyles.viewSubHeader, commonStyles._viewPageName]}>
          <Text style={commonStyles.textPageName}>선풍기 관리하기</Text>
          <View style={styles.viewSwitch}>
            <Text style={commonStyles.textAuto}>자동</Text>
            <Switch
              style={commonStyles.switchDefault}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
            />
          </View>
        </View>
        <Content style={commonStyles.scrollViewDeviceList}>
          <CoolFanList />
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row"
  },
  viewSwitch: {
    flexDirection: "row"
  }
});

export default connect(({ bluetooth, baby }) => ({
  write: bluetooth.get("functions").write,
  autoCoolFan: baby.get("autoCoolFan")
}))(CoolFanManagement);
