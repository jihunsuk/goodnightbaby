import React, { Component } from "react";
import { Header, Left, Right, Body, Container, Title } from "native-base";
import { StyleSheet } from "react-native";
import ContentTemplate from "./components/ContentTemplate";
import Sidebar from "./components/Sidebar";
import { TITLE } from "./constants";
import reduxStore from "./reduxStore";
import { Provider } from "react-redux";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  // // TODO: Setting fonts
  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  //   });
  // }

  render() {
    return (
      <Provider store={reduxStore}>
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left />
            <Body>
              <Title>{TITLE.goodnightbaby}</Title>
            </Body>
            <Right />
          </Header>
          <ContentTemplate />
          <Sidebar />
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    // position: "absolute",
    // top: StatusBar.currentHeight,
    width: "100%",
    height: 45,
    backgroundColor: "#00df1a",
    alignItems: "center",
    justifyContent: "center"
  }
});
