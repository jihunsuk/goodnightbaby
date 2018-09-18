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
  }

  render() {
    return (
      <Content style={styles.container}>
        <BabyInfo />
        <TempAndHumid />
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

export default Home;
