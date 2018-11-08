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
import { commonStyles } from "../../styles";

export default class BabyList extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            testBabys : realm.objects('baby')
        }
        this.update = this.update.bind(this);
        realm.write(()=>{
            realm.deleteAll();
        });
    }
    update() {
        this.setState({
            testBabys: realm.objects('baby').sorted('id')
        });
    }
  render() {
    let Babys = this.state.testBabys.map((baby, idx) => <Baby update={this.update} baby={baby} key={idx} />);

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
    const { baby, update } = this.props;
    console.log(baby);
      console.log("-----------------------");
    let setting = realm.objects("setting").filtered(`id = "${baby.id}"`)[0];
    return (
      <View style={styles.baby}>
        <Button
          iconLeft
          transparent
          dark
          onPress={() => {
            BabyActions.setBaby(baby);
            BabyActions.setPageName(PAGE_NAME.home);
            BabyActions.setMaxTemp(setting.highTemperature);
            BabyActions.setMinTemp(setting.lowTemperature);
            BabyActions.setMaxHumid(setting.highHumidity);
            BabyActions.setMinHumid(setting.lowHumidity);
            BluetoothActions.setDevices(
              realm.objects("bluetoothDevice").filtered(`babyId = ${baby.id}`)
            );
          }}
        >
          <Icon bordered name="logo-octocat" style={styles.iconStyle} />
          <Text style={commonStyles.textScrollItem}>{baby.name}</Text>
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
              BabyActions.setBaby(baby);
              BabyActions.setPageName(PAGE_NAME.babyModification);
            }}
          >
            <Icon name="create" />
          </Button>
          <Button
            transparent
            dark
            onPress={() => {
                realm.write(()=>{
                   let delbaby = realm.objects("baby").filtered(`id="${baby.id}"`);
                   realm.delete(delbaby);
                    realm.delete(setting);
                });
                update();
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
  buttonsBabyMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
