import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Card, CardItem, Text, Content, Button, Icon } from "native-base";
import BabyList from "./BabyList";
import { URL, PAGE_NAME } from "../../constants";
import { BabyActions } from "../../reduxStore/actionCreators";
import { connect } from "react-redux";

class BabySelection extends React.Component {
  render() {
    const { baby } = this.props;
    return (
      <Content>
        <View style={styles.outsideMargin}>
          <Card>
            <CardItem cardBody>
              <Image
                source={{ uri: URL.babySelectionImage }}
                style={styles.image}
              />
            </CardItem>
          </Card>
        </View>
        <View style={styles.wrapperTextSelectBaby}>
          <Text style={styles.textSelectBaby}>아이를 선택해주세요</Text>
        </View>
        <Content style={styles.scrollViewBabyList}>
          <BabyList />
        </Content>
        <Button
          dark
          rounded
          transparent
          bordered
          onPress={() => {
            BabyActions.setPageName(PAGE_NAME.babyAddition);
          }}
          style={styles.buttonAdd}
        >
          <Icon name="add" />
        </Button>
      </Content>
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
    height: 250
  },
  babyAdditionButton: {
    width: 50,
    height: 50
  },
  wrapperTextSelectBaby: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    height: 40
  },
  textSelectBaby: {
    color: "white",
    fontSize: 20
  },
  scrollViewBabyList: {
    margin: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    height: 150
  },
  buttonAdd: {
    borderColor: "#e0e0e0",
    alignSelf: "flex-end",
    marginRight: 15,
    marginBottom: 15
  },
  outsideMargin: {
    margin: 15
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby")
}))(BabySelection);
