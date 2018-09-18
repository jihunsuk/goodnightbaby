import React from "react";
import { StyleSheet, View, Switch } from "react-native";
import HumidifierList from "./HumidifierList";
import { connect } from "react-redux";
import { commonStyles } from "../../styles";
import { Content, Text } from "native-base";

class HumidifierManagement extends React.Component {
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
        <View style={[commonStyles._viewPageName, commonStyles.viewSubHeader]}>
          <Text style={commonStyles.textPageName}>가습기 관리하기</Text>
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
          <HumidifierList />
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
}))(HumidifierManagement);
