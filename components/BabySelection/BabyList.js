import React, { Fragment } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Store from "../../store";
import { PAGE_NAME } from "../../constants";
import { Button, Icon } from "native-base";

export default class BabyList extends React.Component {
  render() {
    let Babys = testBabys.map((baby, idx) => <Baby baby={baby} key={idx} />);

    return (
      <Fragment>
        {Babys}
        {Babys}
        {Babys}
      </Fragment>
    );
  }
}

class Baby extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <View style={styles.baby}>
              <Button
                iconLeft
                transparent
                dark
                onPress={() => {
                  store._setBaby(this.props.baby, "Home");
                }}
              >
                <Icon bordered name="logo-octocat" style={styles.iconStyle} />
                <Text style={styles.textBabyName}>{this.props.baby.name}</Text>
              </Button>
              <Icon
                name={this.props.baby.sex}
                style={
                  this.props.baby.sex === "male" ? styles.male : styles.female
                }
              />
              <View style={styles.buttonsBabyMenu}>
                <Button
                  transparent
                  dark
                  onPress={() => {
                    store._setPage(PAGE_NAME.babyModification);
                  }}
                  style={{ fontSize: 15 }}
                >
                  <Icon name="create" />
                </Button>
                <Button
                  transparent
                  dark
                  onPress={() => {
                    store._setPage(PAGE_NAME.babyDeletion);
                  }}
                  style={{ fontSize: 15 }}
                >
                  <Icon name="remove" />
                </Button>
              </View>
            </View>
          );
        }}
      </Store.Consumer>
    );
  }
}

const testBabys = [
  {
    name: "이상현",
    sex: "male"
  },
  {
    name: "석지훈",
    sex: "male"
  },
  {
    name: "정윤수",
    sex: "female"
  },
  {
    name: "조현욱",
    sex: "male"
  },
  {
    name: "임대영",
    sex: "male"
  },
  {
    name: "권성수",
    sex: "male"
  },
  {
    name: "임병언",
    sex: "male"
  }
];

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: StatusBar.currentHeight + 40 + 250,
    left: 5,
    right: 5,
    bottom: 10,
    backgroundColor: "#fff"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  baby: {
    flexDirection: "row",
    marginTop: 2
  },
  male: {
    color: "blue",
    paddingTop: 10
  },
  female: {
    color: "red",
    paddingTop: 10
  },
  iconStyle: {
    fontSize: 30
  },
  textBabyName: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 3
  },
  buttonsBabyMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  }
});
