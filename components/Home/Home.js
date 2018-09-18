import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import BabyInfo from "../BabyInfo";
import { connect } from "react-redux";
import { Content } from "native-base";
import HomeFunction from "./HomeFunction";
import TempAndHumid from "./TempAndHumid";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnPressPassiveCheck = this.handleOnPressPassiveCheck.bind(this);
  }

  handleOnPressPassiveCheck() {
    const { write } = this.props;
    write("2");
  }

  render() {
    return (
      <Content style={styles.container}>
        <BabyInfo />
        <TouchableHighlight onPress={this.handleOnPressPassiveCheck}>
          <TempAndHumid />
        </TouchableHighlight>
        <HomeFunction />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});

export default connect(({ baby, bluetooth }) => ({
  baby: baby.get("baby"),
  write: bluetooth.get("functions").write
}))(Home);
