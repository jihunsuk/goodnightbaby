import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import Store from "../store";

class ContentTemplate extends React.Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return store.page;
        }}
      </Store.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%"
  }
});

export default ContentTemplate;
// export default connect(({ page }) => ({
//   pageName: page.get("pageName")
// }))(ContentTemplate);
