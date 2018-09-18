import React, { Fragment } from "react";
import { View } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";
import Buffer from "buffer";
import { connect } from "react-redux";
import realm from "../realm/realmDatabase";
import { BabyActions, BluetoothActions } from "../reduxStore/actionCreators";

global.Buffer = Buffer;
const iconv = require("iconv-lite");

let babyInfo;
let myTimer;

class BluetoothSerialTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      discovering: false,
      unpairedDevices: [],
      connected: false,
      section: 0
    };
    BluetoothActions.setFunctions({
      initializeBluetooth: this.initializeBluetooth.bind(this),
      readFromDevice: this.readFromDevice.bind(this),
      write: this.write.bind(this),
      requestEnable: this.requestEnable.bind(this),
      toggleBluetooth: this.toggleBluetooth.bind(this),
      discoverUnpaired: this.discoverUnpaired.bind(this),
      cancelDiscovery: this.cancelDiscovery.bind(this),
      toggleConnect: this.toggleConnect.bind(this),
      onDevicePress: this.onDevicePress.bind(this),
      writePackets: this.writePackets.bind(this)
    });
    this.readFromDevice = this.readFromDevice.bind(this);
  }

  componentWillMount() {
    this.initializeBluetooth();
  }

  initializeBluetooth() {
    const { baby } = this.props;
    babyInfo = realm.objects("baby").filtered(`name = "${baby.name}"`)[0];
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
  readFromDevice() {
    BluetoothSerial.readFromDevice().then(data => {
      const values = data.split(".");
      const humid = parseInt(values[0]);
      const temp = parseInt(values[1]);
      console.log("Humidity: ", humid);
      console.log("Temperature: ", temp);
      if (!isNaN(humid) && !isNaN(temp)) {
        const readData = {
          temp,
          humid
        };
        BabyActions.setTempAndHumid(readData);
        this.writeTemperatureControlDevices(readData);
        let len = realm.objects("history").length;
        realm.write(() => {
          realm.create(
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

  /* Write to bluetooth devices */
  writeTemperatureControlDevices(readData){
    if (readData.humid <= 62){
      this.write("b");  //켜짐
    } else if (readData.humid >= 70){
      this.write("a");  //꺼짐
    }

    if (readData.temp >= 33) {
      this.write("c");  //켜짐
    } else if (readData.temp <= 30) {
      this.write("d");  //꺼짐
    }
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
    const { devices } = this.props;
    BluetoothSerial.pairDevice(device.id)
      .then(paired => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`);
          const devices = devices;
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
        myTimer = setInterval(this.readFromDevice, 1000);
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
    const { devices } = this.props;
    console.log(devices.length);
    for (let i = 0; i < devices.length; i++) {
      if (BluetoothSerial.isEnabled()) {
        this.connect(devices[i]);
      }
    }
  }

  render() {
    return <View />;
  }
}

export default connect(({ baby, bluetooth }) => ({
  baby: baby.get("baby"),
  devices: bluetooth.get("devices")
}))(BluetoothSerialTemplate);
