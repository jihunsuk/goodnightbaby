import React, { Component } from "react";
import {
  Header,
  Left,
  Right,
  Body,
  Container,
  Title,
  Content
} from "native-base";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import BabySelection from "./components/BabySelection";
import ContentTemplate from "./components/ContentTemplate";
import Sidebar from "./components/Sidebar";
import { PAGE_NAME, TITLE } from "./constants";
import reduxStore from "./reduxStore";
import { Provider } from "react-redux";

export default class App extends Component {
  constructor(props) {
    super(props);
    this._setBaby = (baby, pageName) => {
      this.setState({
        baby,
        pageName,
        page: this._getPage(pageName)
      });
    };
    this.state = {
      // TODO: Remove if production, it's Test Data !!
      // pageName: PAGE_NAME.home,
      // page: <Home />,
      // baby: {
      //   name: "test"
      // },
      pageName: PAGE_NAME.babySelection,
      page: <BabySelection />,
      _setPage: this._,
      _setBaby: this._setBaby
    };
  }

  componentDidMount() {}

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
          {this.state.pageName !== PAGE_NAME.babySelection &&
          this.state.pageName !== PAGE_NAME.babyModification &&
          this.state.pageName !== PAGE_NAME.babyDeletion ? (
            <Sidebar />
          ) : null}
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
