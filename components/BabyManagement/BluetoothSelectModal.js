import React, { Fragment } from "react";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Content, CheckBox, Button } from "native-base";
import BluetoothSerial from "react-native-bluetooth-serial";
import Buffer from "buffer";
import { BLUETOOTH_DATA, ETC, KO } from "../../constants";
import { BabyActions } from "../../reduxStore/actionCreators";
import { commonProps, commonStyles } from "../../styles";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import { List } from "immutable";
import { isNotNull } from "../../util/commonUtil";

global.Buffer = Buffer;
const iconv = require("iconv-lite");

export default class BluetoothSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      section: 0,
      selectedThermometer: null,
      selectedCoolFan: List([]),
      selectedHumidifier: List([])
    };
    this._handleOkButton = this._handleOkButton.bind(this);
    this._handleCancelButton = this._handleCancelButton.bind(this);
    this._setParentState = this._setParentState.bind(this);
  }

  /* Life cycle Start */
  componentDidMount() {
    this.requestEnable();
    this.enable();
  }

  componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        this.setState({ isEnabled, devices });
      }
    );
    BluetoothSerial.on("bluetoothEnabled", () => {
      console.log("Bluetooth enabled");
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          this.setState({ isEnabled, devices });
        }
      );
    });

    BluetoothSerial.on("bluetoothDisabled", () => {
      console.log("Bluetooth disabled");
      this.setState({ devices: [] });
    });

    BluetoothSerial.on("error", err => console.log(`Error: ${err.message}`));
    BluetoothSerial.on("connectionLost", () => {
      if (this.state.device) {
        console.log(
          `Connection to device ${this.state.device.name} has been lost`
        );
      }
      this.setState({ connected: false });
    });
  }
  /* Life cycle End */

  /* Read data test */
  _readTry() {
    BluetoothSerial.readFromDevice().then(data => {
      console.log(data);
    });
  }

  /**
   * [android]
   * request enable of bluetooth from user
   */
  requestEnable() {
    BluetoothSerial.requestEnable()
      .then(res => this.setState({ isEnabled: true }))
      .catch(err => console.log(err.message));
  }

  /**
   * [android]
   * enable bluetooth on device
   */
  enable() {
    BluetoothSerial.enable()
      .then(res => this.setState({ isEnabled: true }))
      .catch(err => console.log(err.message));
  }

  /**
   * [android]
   * disable bluetooth on device
   */
  disable() {
    BluetoothSerial.disable()
      .then(res => this.setState({ isEnabled: false }))
      .catch(err => console.log(err.message));
  }

  /**
   * [android]
   * toggle bluetooth
   */
  toggleBluetooth(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }

  /**
   * [android]
   * Discover unpaired devices, works only in android
   */
  discoverUnpaired() {
    if (this.state.discovering) {
      return false;
    } else {
      this.setState({ discovering: true });
      BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          this.setState({ unpairedDevices, discovering: false });
        })
        .catch(err => console.log(err.message));
    }
  }

  /**
   * [android]
   * Discover unpaired devices, works only in android
   */
  cancelDiscovery() {
    if (this.state.discovering) {
      BluetoothSerial.cancelDiscovery()
        .then(() => {
          this.setState({ discovering: false });
        })
        .catch(err => console.log(err.message));
    }
  }

  /**
   * [android]
   * Pair device
   */
  pairDevice(device) {
    BluetoothSerial.pairDevice(device.id)
      .then(paired => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`);
          const devices = this.state.devices;
          devices.push(device);
          this.setState({
            devices,
            unpairedDevices: this.state.unpairedDevices.filter(
              d => d.id !== device.id
            )
          });
        } else {
          console.log(`Device ${device.name} pairing failed`);
        }
      })
      .catch(err => console.log(err.message));
  }

  /**
   * Connect to bluetooth device by id
   * @param  {Object} device
   */
  connect(device) {
    this.setState({ connecting: true });
    BluetoothSerial.connect(device.id)
      .then(res => {
        console.log(`Connected to device ${device.name}`);
        this.setState({ device, connected: true, connecting: false });
        setInterval(this._readTry, 1000);
      })
      .catch(err => console.log(err.message));
  }

  /**
   * Disconnect from bluetooth device
   */
  disconnect() {
    BluetoothSerial.disconnect()
      .then(() => this.setState({ connected: false }))
      .catch(err => console.log(err.message));
  }

  /**
   * Toggle connection when we have active device
   * @param  {Boolean} value
   */
  toggleConnect(value) {
    if (value === true && this.state.device) {
      this.connect(this.state.device);
    } else {
      this.disconnect();
    }
  }

  /**
   * Write message to device
   * @param  {String} message
   */
  write(message) {
    if (!this.state.connected) {
      console.log("You must connect to device first");
    }

    BluetoothSerial.write(message)
      .then(res => {
        console.log("Successfuly wrote to device");
        console.log("res: ", res);
        this.setState({ connected: true });
      })
      .catch(err => console.log("err: ", err.message));
  }

  onDevicePress(device) {
    if (this.state.section === 0) {
      this.connect(device);
    } else {
      this.pairDevice(device);
    }
  }

  writePackets(message, packetSize = 64) {
    const toWrite = iconv.encode(message, "cp852");
    const writePromises = [];
    const packetCount = Math.ceil(toWrite.length / packetSize);

    for (var i = 0; i < packetCount; i++) {
      const packet = new Buffer(packetSize);
      packet.fill(" ");
      toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize);
      writePromises.push(BluetoothSerial.write(packet));
    }

    Promise.all(writePromises).then(result => {});
  }

  /* Defined Function Start */
  _setParentState(name, data) {
    const { selectedCoolFan, selectedHumidifier } = this.state;
    switch (name) {
      case ETC.thermometer:
        this.setState({
          selectedThermometer: data
        });
        break;
      case ETC.coolFan:
        if (
          selectedCoolFan.has(data.idx) &&
          isNotNull(selectedCoolFan.get(data.idx))
        ) {
          console.log("coolFan delete");
          this.setState({
            selectedCoolFan: selectedCoolFan.set(data.idx, null)
          });
        } else {
          console.log("coolFan push");
          this.setState({
            selectedCoolFan: selectedCoolFan.set(data.idx, data)
          });
        }
        break;
      case ETC.humidifier:
        if (
          selectedHumidifier.has(data.idx) &&
          isNotNull(selectedHumidifier.get(data.idx))
        ) {
          console.log("humidifier delete");
          this.setState({
            selectedHumidifier: selectedHumidifier.set(data.idx, null)
          });
        } else {
          console.log("humidifier push");
          this.setState({
            selectedHumidifier: selectedHumidifier.set(data.idx, data)
          });
        }
        break;
      default:
        console.log("@Error: No profit state");
    }
  }
  /* Defined Function End */

  /* handle onClick Start */
  _handleOkButton() {
    const { setModalVisible, pageName } = this.props;
    const {
      selectedThermometer,
      selectedCoolFan,
      selectedHumidifier
    } = this.state;
    if (pageName === KO.thermometer) {
      BabyActions.setSelectedThermometer(selectedThermometer);
    } else if (pageName === KO.coolFan) {
      BabyActions.setSelectedCoolFan(selectedCoolFan);
    } else if (pageName === KO.humidifier) {
      BabyActions.setSelectedHumidifier(selectedHumidifier);
    }
    setModalVisible(false);
  }

  _handleCancelButton() {
    const { setModalVisible } = this.props;
    setModalVisible(false);
  }
  /* handle onClick End */

  render() {
    const { pageName, modalVisible } = this.props;
    const {
      connected,
      selectedHumidifier,
      selectedCoolFan,
      selectedThermometer
    } = this.state;

    console.log("BluetoothSelectModal state: ", this.state);

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <Content>
          <Switch
            onValueChange={this.toggleBluetooth.bind(this)}
            value={this.state.isEnabled}
          />
          <View style={commonStyles.viewPageName}>
            <Text style={commonStyles.textPageName}>{pageName} 추가</Text>
          </View>
          <DeviceList
            showConnectedIcon={this.state.section === 0}
            connectedId={this.state.device && this.state.device.id}
            devices={this.state.devices}
            pageName={pageName}
            setParentState={this._setParentState}
            selectedThermometer={selectedThermometer}
            selectedCoolFan={selectedCoolFan}
            selectedHumidifier={selectedHumidifier}
          />
          <Button onPress={() => this.requestEnable()}>
            <Text>Request enable</Text>
          </Button>
          {connected === true ? (
            <Fragment>
              <Button onPress={() => this.write(BLUETOOTH_DATA.on)}>
                <Text>On</Text>
              </Button>
              <Button onPress={() => this.write(BLUETOOTH_DATA.off)}>
                <Text>Off</Text>
              </Button>
            </Fragment>
          ) : null}
          <View style={commonStyles.viewMenu}>
            <ButtonTemplate
              buttonProps={commonProps.buttonMenus}
              onPress={this._handleOkButton}
              style={[commonStyles.buttonMenu, commonStyles.buttonLeftMenu]}
              title={"확인"}
            />
            <ButtonTemplate
              buttonProps={commonProps.buttonMenus}
              onPress={this._handleCancelButton}
              style={commonStyles.buttonMenu}
              title={"취소"}
            />
          </View>
        </Content>
      </Modal>
    );
  }
}

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
  }

  checkDevice(deviceId, deviceName, idx) {
    const { pageName, setParentState } = this.props;
    console.log("checkDevice", deviceId, deviceName, idx);
    if (pageName === KO.thermometer) {
      setParentState(ETC.thermometer, {
        idx: idx,
        deviceId: deviceId,
        deviceName: deviceName
      });
    } else if (pageName === KO.coolFan) {
      setParentState(ETC.coolFan, {
        idx: idx,
        deviceId: deviceId,
        deviceName: deviceName
      });
    } else if (pageName === KO.humidifier) {
      setParentState(ETC.humidifier, {
        idx: idx,
        deviceId: deviceId,
        deviceName: deviceName
      });
    }
  }

  render() {
    const {
      devices,
      connectedId,
      showConnectedIcon,
      selectedThermometer,
      selectedCoolFan,
      selectedHumidifier,
      pageName
    } = this.props;

    console.log("test1", selectedThermometer);
    console.log("test2", selectedCoolFan);
    console.log("test3", selectedHumidifier);

    return (
      <Content style={styles.contentDeviceList}>
        <View>
          {devices.map((device, i) => {
            let checked = false;
            if (
              pageName === KO.thermometer &&
              selectedThermometer !== null &&
              selectedThermometer.deviceId === device.id
            ) {
              checked = true;
            } else if (
              pageName === KO.coolFan &&
              isNotNull(selectedCoolFan.get(i)) &&
              selectedCoolFan.get(i).deviceId === device.id
            ) {
              checked = true;
            } else if (
              pageName === KO.humidifier &&
              isNotNull(selectedHumidifier.get(i)) &&
              selectedHumidifier.get(i).deviceId === device.id
            ) {
              checked = true;
            }
            return (
              <View key={i} style={{ flexDirection: "row" }}>
                {showConnectedIcon ? (
                  <View style={{ width: 48, height: 48, opacity: 0.4 }}>
                    <Text>Icon</Text>
                  </View>
                ) : null}
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{device.name}</Text>
                  <Text>{`<${device.id}>`}</Text>
                  <CheckBox
                    checked={checked}
                    onPress={() => {
                      this.checkDevice(device.id, device.name, i);
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  contentDeviceList: {
    margin: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    height: 150
  }
});
