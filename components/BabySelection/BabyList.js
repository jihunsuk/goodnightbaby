import React, { Fragment } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { PAGE_NAME } from "../../constants";
import { Button, Icon } from "native-base";
import { BabyActions, BluetoothActions } from "../../reduxStore/actionCreators";
import realm from "../../realm/realmDatabase";

export default class BabyList extends React.Component {
  render() {
    let Babys = testBabys.map((baby, idx) => <Baby baby={baby} key={idx} />);

    return (
      <Fragment>
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
    const { baby } = this.props;
    return (
      <View style={styles.baby}>
        <Button
          iconLeft
          transparent
          dark
          onPress={() => {
            BabyActions.setBaby(baby);
            BabyActions.setPageName(PAGE_NAME.home);
            BluetoothActions.setDevices(
              realm.objects("bluetoothDevice").filtered(`babyId = ${baby.id}`)
            );
          }}
        >
          <Icon bordered name="logo-octocat" style={styles.iconStyle} />
          <Text style={styles.textBabyName}>{baby.name}</Text>
        </Button>
        <Icon
          name={baby.sex}
          style={baby.sex === "male" ? styles.male : styles.female}
        />
        <View style={styles.buttonsBabyMenu}>
          <Button
            transparent
            dark
            onPress={() => {
              BabyActions.setPageName(PAGE_NAME.babyModification);
            }}
          >
            <Icon name="create" />
          </Button>
          <Button
            transparent
            dark
            onPress={() => {
              BabyActions.setPageName(PAGE_NAME.babyDeletion);
            }}
          >
            <Icon name="remove" />
          </Button>
        </View>
      </View>
    );
  }
}

const testBabys = realm.objects('baby');

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
    justifyContent: "flex-end"
  }
});
