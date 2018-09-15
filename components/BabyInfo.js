import React from "react";
import { Switch, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { commonStyles } from "../styles";

class BabyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch(value) {
    this.setState({
      switchValue: value
    });
  }

  render() {
    const { baby } = this.props;
    return (
      <View style={[styles.container, commonStyles.viewCenter]}>
        <View style={[commonStyles.viewCenter]}>
          <Icon name="logo-octocat" style={styles.image} />
          <Text>{baby.name}</Text>
        </View>
        <View style={[commonStyles.viewCenter]}>
          <Text>자동측정</Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
          <Icon name="battery-charging"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby")
}))(BabyInfo);
