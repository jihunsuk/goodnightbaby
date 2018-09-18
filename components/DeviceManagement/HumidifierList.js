import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Switch, Text } from "native-base";
import { commonStyles } from "../../styles";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC, KO, PAGE_NAME } from "../../constants";

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
      switchValue: this.props.humidifierState === ETC.status.running
    };
  }

  toggleSwitch = value => {
    const { write } = this.props;
    this.setState({ switchValue: value });
    if (value === true && this.props.autoHumidifier === ETC.status.stopped) {
      write("p");
      BabyActions.setHumidifierState(ETC.status.running);
    } else if (
      value === false &&
      this.props.autoHumidifier === ETC.status.stopped
    ) {
      write("q");
      BabyActions.setHumidifierState(ETC.status.stopped);
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

export default connect(({ bluetooth, baby }) => ({
  write: bluetooth.get("functions").write,
  humidifierState: baby.get("humidifierState"),
  autoHumidifier: baby.get("autoHumidifier")
}))(HumidifierList);
