import React, { Fragment } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native";
import BabyInfo from "../BabyInfo";
import BluetoothSerial from "react-native-bluetooth-serial";
import Buffer from "buffer";
import { connect } from "react-redux";
import realm from "../../realm/realmDatabase";
import { Content } from "native-base";
import HomeFunction from "./HomeFunction";
import TempAndHumid from "./TempAndHumid";
import {isNotNull} from "../../util/commonUtil";
import {BabyActions} from "../../reduxStore/actionCreators";

global.Buffer = Buffer;
const iconv = require("iconv-lite");

let babyInfo;
let myTimer;

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { baby } = this.props;
    babyInfo = realm.objects("baby").filtered(`name = "${baby.name}"`)[0];

    this.state = {
      isEnabled: false,
      discovering: false,
      devices: realm
        .objects("bluetoothDevice")
        .filtered(`babyId = ${babyInfo.id}`),
      unpairedDevices: [],
      connected: false,
      section: 0
    };
  }

  componentWillMount() {
    this.activateDevice();
    BluetoothSerial.on("bluetoothEnabled", () => {
      console.log("Bluetooth enabled");
      this.activateDevice();
    });

    BluetoothSerial.on("bluetoothDisabled", () => {
      console.log("Bluetooth disabled");
      clearInterval(myTimer);
    });

    BluetoothSerial.on("error", err => console.log(`Error: ${err.message}`));
    BluetoothSerial.on("connectionLost", () => {});
  }

  /* Read data test */
  _readTry() {

    BluetoothSerial.readFromDevice().then(data => {
      let values = data.split(".");
      let humid = parseInt(values[0]);
      let temp = parseInt(values[1]);
      console.log(humid);
      console.log(temp);
      if (!isNaN(humid) && !isNaN(temp)) {
        BabyActions.setTempAndHumid({
           temp,
           humid
        });
        let len = realm.objects("history").length;
        realm.write(() => {
          newHistory = realm.create(
            "history",
            {
              id: len,
              babyId: babyInfo.id,
              time: new Date(),
              temperature: temp,
              humidity: humid
            },
            true
          );
        });
      }
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
    BluetoothSerial.connect(device.device)
      .then(res => {
        realm.write(() => {
          realm.create(
            "bluetoothDevice",
            { id: device.id, status: "CONNECTED" },
            true
          );
        });
        console.log(`Connected to device ${device.name}`);
        this.setState({ device, connected: true, connecting: false });
        myTimer = setInterval(this._readTry, 1000);
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

  activateDevice() {
    console.log(this.state.devices.length);
    for (let i = 0; i < this.state.devices.length; i++) {
      if (BluetoothSerial.isEnabled()) {
        this.connect(this.state.devices[i]);
      }
    }
  }

  // toggleSwitch = value => {
  //   this.setState({switchValue : value});
  //   if (value == true){
  //   this.write("1");
  // } else {
  //   this.write("0");
  // }
  // };

  render() {
    return (
      <Content style={styles.container}>
        <BabyInfo />
        <TouchableHighlight
          onPress={() => {
            this.write("2");
          }}
        >
          <TempAndHumid />
        </TouchableHighlight>
        <HomeFunction />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby"),
    setTempAndHumid: baby.get("setTempAndHumid"),
}))(Home);
