import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Icon, Text, Switch, Button } from "native-base";
import { commonStyles } from "../../styles";

class CoolFanList extends React.Component {
  render() {
    const CoolFans = testCoolFan.map((coolfan, idx) => (
      <CoolFan {...this.props} coolfan={coolfan} key={idx} />
    ));

    style = commonStyles.switchDefault;
    return <Fragment>{CoolFans}</Fragment>;
  }
}

class CoolFan extends React.Component {
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
      write("y");
    } else {
      write("x");
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
    alignItems:"center"
  }
});

export default connect(({ bluetooth }) => ({
  write: bluetooth.get("functions").write
}))(CoolFanList);
