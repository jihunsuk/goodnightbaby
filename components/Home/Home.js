import React, { Fragment } from "react";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native";
import BabyInfo from "../BabyInfo";
import TempAndHumid from "./TempAndHumid";
import HomeFunction from "./HomeFunction";
import BluetoothSerial from "react-native-bluetooth-serial";
import Buffer from "buffer";
global.Buffer = Buffer;
const iconv = require("iconv-lite");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      section: 0
    };
  }

  componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        this.setState({ isEnabled, devices });
      }
    );
    console.log("componentWillMount", BluetoothSerial);

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

  /* Read data test */
  _readTry() {
    BluetoothSerial.readFromDevice().then(data => {
      console.log(data);
    });
  };

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

  toggleSwitch = value => {
    this.setState({});
  };

  render() {
    const {connected,} = this.state;
    console.log("render: ", this.state);
    return (
      <View style={styles.container}>
        <BabyInfo />
        <Text>자동측정</Text>
        <Switch
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
        {/*<TempAndHumid />*/}
        {/*<HomeFunction />*/}
        <Switch
          onValueChange={this.toggleBluetooth.bind(this)}
          value={this.state.isEnabled}
        />
        <DeviceList
          showConnectedIcon={this.state.section === 0}
          connectedId={this.state.device && this.state.device.id}
          devices={
            this.state.section === 0
              ? this.state.devices
              : this.state.unpairedDevices
          }
          onDevicePress={device => this.onDevicePress(device)}
        />
        <Button title="Request enable" onPress={() => this.requestEnable()} />
        {connected === true ? (
            <Fragment>
              <Button title="On" onPress={() => this.write("0")} />
              <Button title="Off" onPress={() => this.write("1")} />
            </Fragment>
        ) : null}
      </View>
    );
  }
}

const DeviceList = ({
  devices,
  connectedId,
  showConnectedIcon,
  onDevicePress
}) => (
  <ScrollView style={styles.container}>
    <View>
      {devices.map((device, i) => {
        return (
          <TouchableHighlight
            underlayColor="#DDDDDD"
            key={`${device.id}_${i}`}
            onPress={() => onDevicePress(device)}
          >
            <View style={{ flexDirection: "row" }}>
              {showConnectedIcon ? (
                <View style={{ width: 48, height: 48, opacity: 0.4 }}>
                  <Text>Test</Text>
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
              </View>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    color: "white",
    backgroundColor: "#fff"
  }
});
