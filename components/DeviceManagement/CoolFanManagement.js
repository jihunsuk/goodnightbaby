import React from "react";
import { StyleSheet, View } from "react-native";
import CoolFanList from "./CoolFanList";
import { connect } from "react-redux";
import { commonStyles } from "../../styles";
import { Content, Text, Switch } from "native-base";

class CoolFanManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true
    };
  }
  toggleSwitch = value => {
    const { write } = this.props;
    this.setState({ switchValue: value });
    if (value == true) {
      write("u");
    } else {
      write("e");
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

export default connect(({ bluetooth }) => ({
  write: bluetooth.get("functions").write
}))(CoolFanManagement);
