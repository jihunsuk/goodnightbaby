import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Icon, Switch } from "native-base";
import { commonStyles } from "../styles";
import realm from "../realm/realmDatabase";

class BabyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
      let a = realm.objects("bluetoothDevice").filtered(`babyId = ${this.props.baby.id}`);
      console.log(a);
  }

  toggleSwitch(value) {
    const { write } = this.props;
    this.setState({
      switchValue: value
    });
    if (value == true) {
      write("1");
    } else {
      write("0");
    }
  }

  render() {
    const { baby } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[commonStyles.viewCenter, styles.viewBabyNameArea]}>
          <View style={[commonStyles.viewCenter, commonStyles.viewIconWrapper]}>
            <Icon name="logo-octocat" style={commonStyles.iconMenu} />
          </View>
          <Text style={styles.textBabyName}>{baby.name}</Text>
        </View>
        <View style={[commonStyles.viewCenter, styles.viewOptionArea]}>
          <Text style={styles.textBabyName}>자동측정</Text>
          <Switch
            style={commonStyles.switchDefault}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          <Icon name="battery-charging" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between"
  },
  viewBabyNameArea: {
    flexDirection: "row"
  },
  viewOptionArea: {
    flexDirection: "row"
  },
  textBabyName: {
    marginLeft: 5,
    color: "green",
    fontSize: 20
  }
});

export default connect(({ baby, bluetooth }) => ({
  baby: baby.get("baby"),
  write: bluetooth.get("functions").write
}))(BabyInfo);
