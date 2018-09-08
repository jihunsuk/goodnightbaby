import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { Card, CardItem, Text } from "native-base";
import BabyList from "./BabyList";
import Store from "../../store";
import { URL, PAGE_NAME } from "../../constants";

export default class BabySelection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: URL.babySelectionImage }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
        </Card>
        <View style={styles.wrapperTextSelectBaby}>
          <Text>아이를 선택해주세요</Text>
        </View>
        <BabyList />
        <Store.Consumer>
          {store => {
            return (
              <Button
                style={styles.babyAdditionButton}
                title="+"
                onPress={() => {
                  store._setPage(PAGE_NAME.babyAddition);
                }}
              />
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%"
  },
  image: {
    width: "100%",
    height: 300
  },
  babyAdditionButton: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 0
  },
  wrapperTextSelectBaby: {
    backgroundColor: "#e0e0e0",
    width: "100%",
    height: 50,
  },
});
