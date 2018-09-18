import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Switch, Text } from "native-base";
import { commonStyles } from "../../styles";

class HumidifierList extends React.Component {
  render() {
    let Humidifiers = testHumidifier.map((humidifier, idx) => (
      <Humidifier {...this.props} humidifier={humidifier} key={idx} />
    ));

    return <Fragment>{Humidifiers}</Fragment>;
  }
}

class Humidifier extends React.Component {
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
      write("p");
    } else {
      write("q");
    }
  };

  render() {
    return (
      <View style={[commonStyles.viewDevice, styles._viewDevice]}>
        <View style={styles.viewDeviceInfo}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon bordered name="cloud" style={commonStyles.iconDevice} />
          </View>
          <Text style={commonStyles.textScrollItem}>
            {this.props.humidifier.name}
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

const testHumidifier = [
  {
    name: "가습기1"
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
  viewDeviceInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  _viewDevice: {
    marginTop: 10,
    flexDirection: "row"
  }
});

export default connect(({ bluetooth }) => ({
  write: bluetooth.get("functions").write
}))(HumidifierList);
