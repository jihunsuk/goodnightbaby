import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Icon, Text, Switch } from "native-base";
import { commonStyles } from "../../styles";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC } from "../../constants";

class CoolFanList extends React.Component {
  render() {
    const CoolFans = testCoolFan.map((coolfan, idx) => (
      <CoolFan {...this.props} coolfan={coolfan} key={idx} />
    ));

    return <Fragment>{CoolFans}</Fragment>;
  }
}

class CoolFan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.coolFanState === ETC.status.running
    };
  }

  toggleSwitch = value => {
    const { write } = this.props;
    this.setState({ switchValue: value });
    if (value === true && this.props.autoCoolFan === ETC.status.stopped) {
      write("y");
      BabyActions.setCoolFanState(ETC.status.running);
    } else if (
      value === false &&
      this.props.autoCoolFan === ETC.status.stopped
    ) {
      write("x");
      BabyActions.setCoolFanState(ETC.status.stopped);
    }
  };

  render() {
    return (
      <View style={[commonStyles.viewDevice, styles._viewDevice]}>
        <View style={styles.viewDeviceInfo}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon bordered name="nuclear" style={commonStyles.iconDevice} />
          </View>
          <Text style={commonStyles.textScrollItem}>
            {this.props.coolfan.name}
          </Text>
        </View>
        <Switch
          style={commonStyles.switchDefault}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
      </View>
    );
  }
}

const testCoolFan = [
  {
    name: "선풍기1"
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  _viewDevice: {
    marginTop: 10,
    flexDirection: "row"
  },
  viewDeviceInfo: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connect(({ bluetooth, baby }) => ({
  write: bluetooth.get("functions").write,
  coolFanState: baby.get("coolFanState"),
  autoCoolFan: baby.get("autoCoolFan")
}))(CoolFanList);
