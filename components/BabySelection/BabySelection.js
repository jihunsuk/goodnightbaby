import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Text,
  Left
} from "native-base";
import BabyList from "./BabyList";
import Store from "../../store";
import { URL } from "../../constants";

export default class BabySelection extends React.Component {
  constructor(props){
    super(props);
  }

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
        <BabyList />
        <Store.Consumer>
          {store => {
            return (
              <Button
                style={styles.babyAdditionButton}
                title="+"
                onPress={() => {
                  store._setPage("BabyAddition");
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
  }
});
