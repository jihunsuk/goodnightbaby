import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class BabyInfo extends React.Component {
  render() {
    const { baby } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2"
          }}
        />
        <Text>{baby.name}</Text>
        <Text>+배터리정보</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row"
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
