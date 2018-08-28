import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Store from "../store";

class Content extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => {
            return store.page;
          }}
        </Store.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: StatusBar.currentHeight + 40,
    bottom: 50,
    backgroundColor: "#fff",
    width: "100%",
    height: "auto"
  }
});

export default Content;
// export default connect(({ page }) => ({
//   pageName: page.get("pageName")
// }))(Content);
