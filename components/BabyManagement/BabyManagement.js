import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import realm from "../../realm/realmDatabase";
import {
  Content,
  Form,
  Input,
  Item,
  Label,
  Radio,
  Button,
  Text
} from "native-base";
import { ETC, PAGE_NAME, KO } from "../../constants";
import BluetoothSelectModal from "./BluetoothSelectModal";
import { BabyActions } from "../../reduxStore/actionCreators";
import { commonProps, commonStyles } from "../../styles";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import { connect } from "react-redux";
import { isNotNull } from "../../util/commonUtil";

class BabyManagement extends React.Component {
  constructor(props) {
    super(props);
    let babys = realm.objects("baby");
    let babys_length = babys.length;
    let settings = realm.objects("setting");
    let settings_length = settings.length;
    let alarms = realm.objects("alarm");
    let alarms_length = alarms.length;
    this.state = {
      id: babys_length === 0 ? 0 : babys[babys_length - 1].id + 1,
      settingId:
        settings_length === 0 ? 0 : settings[settings_length - 1].id + 1,
      alarmId: alarms_length === 0 ? 0 : alarms[alarms_length - 1].id + 1,
      name: "",
      age: 0,
      sex: ETC.male, // male, female
      image: null,
      device_length: realm.objects("bluetoothDevice").length,
      thermometerModalVisible: false,
      coolFanModalVisible: false,
      humidifierModalVisible: false
    };

    /* Bind start */
    this.setThermometerModalVisible = this.setThermometerModalVisible.bind(
      this
    );
    this.setCoolFanModalVisible = this.setCoolFanModalVisible.bind(this);
    this.setHumidifierModalVisible = this.setHumidifierModalVisible.bind(this);
    this.saveBaby = this.saveBaby.bind(this);
    this._setPageBabySelection = this._setPageBabySelection.bind(this);
    /* Bind end */
  }

  /* Modal Function Start */
  setThermometerModalVisible(visible) {
    this.setState({ thermometerModalVisible: visible });
  }

  setCoolFanModalVisible(visible) {
    this.setState({ coolFanModalVisible: visible });
  }

  setHumidifierModalVisible(visible) {
    this.setState({ humidifierModalVisible: visible });
  }

  /* Modal Function End */

  /* Realm logic Start */
  saveBaby() {
    this.saveBabyInRealm();
    this.saveDeviceInRealm();
    this._resetBluetoothDevicesInRedux();
    this._setPageBabySelection();
  }

  saveDeviceInRealm() {
    const {
      selectedThermometer,
      selectedCoolFan,
      selectedHumidifier
    } = this.props;
    const { device_length } = this.state;
    // Make devices
    let devices = [];
    let deviceId = device_length;
    if (isNotNull(selectedThermometer)) {
      devices.push(
        this._makeDevice(selectedThermometer, ETC.thermometer, deviceId)
      );
      deviceId++;
    }
    if (isNotNull(selectedCoolFan) && selectedCoolFan.length !== 0) {
      selectedCoolFan.map(device => {
        if (isNotNull(device)) {
          devices.push(this._makeDevice(device, ETC.coolFan, deviceId));
          deviceId++;
        }
      });
    }
    if (isNotNull(selectedHumidifier) && selectedHumidifier.length !== 0) {
      selectedHumidifier.map(device => {
        if (isNotNull(device)) {
          devices.push(this._makeDevice(device, ETC.humidifier, deviceId));
          deviceId++;
        }
      });
    }

    devices.map(device =>
      realm.write(() => {
        newDevice = realm.create("bluetoothDevice", device, true);
      })
    );
  }

  saveBabyInRealm() {
    realm.write(() => {
      newBaby = realm.create(
        "baby",
        {
          id: this.state.id,
          settingId: this.state.settingId,
          alarmId: this.state.alarmId,
          name: this.state.name,
          age: this.state.age,
          sex: this.state.sex,
          image: this.state.image
        },
        true
      );
    });
  }

  /* Realm logic End */

  /* Defined Function Start */
  _resetBluetoothDevicesInRedux() {
    BabyActions.setSelectedThermometer(null);
    BabyActions.setSelectedCoolFan(null);
    BabyActions.setSelectedHumidifier(null);
  }

  _makeDevice(bluetoothDevice, type, deviceId) {
    device = {
      id: deviceId, // TODO: fix
      babyId: this.state.id,
      device: bluetoothDevice.deviceId,
      name: bluetoothDevice.deviceName,
      type: type,
      status: ETC.status.stopped,
      auto: false
    };
    return device;
  }

  setSex(sex) {
    this.setState({
      sex
    });
  }

  _setPageBabySelection() {
    BabyActions.setPageName(PAGE_NAME.babySelection);
    this._resetBluetoothDevicesInRedux();
  }

  _makeBluetoothDeviceNames(data) {
    let string = "";
    let count = 0;
    data.map((element, idx) => {
      if (isNotNull(element)) {
        string += count !== 0 ? ", " : "";
        string += `${element.deviceName}`;
        count++;
      }
    });
    return string === "" ? "-" : string;
  }

  /* Defined Function End */

  render() {
    const {
      sex,
      thermometerModalVisible,
      coolFanModalVisible,
      humidifierModalVisible
    } = this.state;
    const {
      selectedThermometer,
      selectedCoolFan,
      selectedHumidifier
    } = this.props;

    let coolFans = "-";
    let humidifiers = "-";
    if (isNotNull(selectedCoolFan)) {
      coolFans = this._makeBluetoothDeviceNames(selectedCoolFan);
    }
    if (isNotNull(selectedHumidifier)) {
      humidifiers = this._makeBluetoothDeviceNames(selectedHumidifier);
    }

    return (
      <Fragment>
        <Content style={styles.container}>
          <Form>
            <Item stackedLabel style={styles.itemInput}>
              <Label>이름</Label>
              <Input onChangeText={name => this.setState({ name })} />
            </Item>
            <Item stackedLabel style={styles.itemInput}>
              <Label>사진</Label>
              <Input onChangeText={image => this.setState({ image })} />
            </Item>
            <Item stackedLabel style={styles.itemInput}>
              <Label>나이</Label>
              <Input
                keyboardType="numeric"
                onChangeText={age => {
                  age = parseInt(age);
                  this.setState({ age });
                }}
              />
            </Item>
            <Item stackedLabel style={styles.itemEtc}>
              <Label>성별</Label>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 20
                  }}
                >
                  <Radio
                    selected={sex === ETC.male ? true : false}
                    onPress={() => this.setSex(ETC.male)}
                  />
                  <Text style={{ marginLeft: 10 }}>남자</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Radio
                    selected={sex === ETC.female ? true : false}
                    onPress={() => this.setSex(ETC.female)}
                  />
                  <Text style={{ marginLeft: 10 }}>여자</Text>
                </View>
              </View>
            </Item>
            <Item stackedLabel style={styles.itemEtc}>
              <Label>체온측정장치</Label>
              <View style={styles.viewBluetoothDevice}>
                <Button
                  onPress={() => {
                    this.setThermometerModalVisible(true);
                  }}
                  style={styles.buttonBluetoothDevice}
                >
                  <Text style={styles.textBluetoothDeviceButton}>
                    체온측정장치선택
                  </Text>
                </Button>
                <Text>
                  {selectedThermometer === null
                    ? "-"
                    : selectedThermometer.deviceName}
                </Text>
              </View>
            </Item>
            <Item stackedLabel style={styles.itemEtc}>
              <Label>선풍기</Label>
              <View style={styles.viewBluetoothDevice}>
                <Button
                  onPress={() => {
                    this.setCoolFanModalVisible(true);
                  }}
                  style={styles.buttonBluetoothDevice}
                >
                  <Text style={styles.textBluetoothDeviceButton}>
                    선풍기선택
                  </Text>
                </Button>
                <Text>{coolFans}</Text>
              </View>
            </Item>
            <Item stackedLabel style={styles.itemEtc}>
              <Label>가습기</Label>
              <View style={styles.viewBluetoothDevice}>
                <Button
                  onPress={() => {
                    this.setHumidifierModalVisible(true);
                  }}
                  style={styles.buttonBluetoothDevice}
                >
                  <Text style={styles.textBluetoothDeviceButton}>
                    가습기선택
                  </Text>
                </Button>
                <Text>{humidifiers}</Text>
              </View>
            </Item>
          </Form>
          <View style={commonStyles.viewMenu}>
            <ButtonTemplate
              buttonProps={commonProps.buttonMenus}
              style={[commonStyles.buttonMenu, commonStyles.buttonLeftMenu]}
              onPress={this.saveBaby}
              title={KO.save}
            />
            <ButtonTemplate
              buttonProps={commonProps.buttonMenus}
              style={commonStyles.buttonMenu}
              onPress={this._setPageBabySelection}
              title={KO.cancel}
            />
          </View>
        </Content>
        <BluetoothSelectModal
          modalVisible={thermometerModalVisible}
          setModalVisible={this.setThermometerModalVisible}
          pageName={KO.thermometer}
        />
        <BluetoothSelectModal
          modalVisible={coolFanModalVisible}
          setModalVisible={this.setCoolFanModalVisible}
          pageName={KO.coolFan}
        />
        <BluetoothSelectModal
          modalVisible={humidifierModalVisible}
          setModalVisible={this.setHumidifierModalVisible}
          pageName={KO.humidifier}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  itemInput: { marginBottom: 10 },
  itemEtc: { borderColor: "transparent" },
  viewBluetoothDevice: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 10,
    width: "100%"
  },
  buttonBluetoothDevice: {
    width: 140,
    borderColor: "#e0e0e0",
    backgroundColor: "#e0e0e0",
    marginRight: 20,
    justifyContent: "center"
  },
  textBluetoothDeviceButton: {
    color: "black"
  },
  name: {
    flexDirection: "row",
    width: "100%"
  },
  textinput: {
    height: 40,
    borderWidth: 3,
    width: "100%"
  }
});

export default connect(({ baby }) => ({
  selectedThermometer: baby.get("selectedThermometer"),
  selectedCoolFan: baby.get("selectedCoolFan"),
  selectedHumidifier: baby.get("selectedHumidifier")
}))(BabyManagement);
