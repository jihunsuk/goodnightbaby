import React from "react";
import {View} from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial";
import Buffer from "buffer";
import {connect} from "react-redux";
import realm from "../realm/realmDatabase";
import {BabyActions, BluetoothActions} from "../reduxStore/actionCreators";
import {ETC, KO, PAGE_NAME} from "../constants";
import {isNotNull} from "./commonUtil";
import pushNotifications from "./PushNotification";

pushNotifications.configure();
global.Buffer = Buffer;
const iconv = require("iconv-lite");

let babyInfo, setting,
    myTimer = [],
    listener = [];

// realm.write(() => {
//     // 책을 생성합니다
//     realm.deleteAll();
// });

class BluetoothSerialTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discovering: false,
            unpairedDevices: [],
            connected: false,
            section: 0,
            coolFanStatus: ETC.status.stopped,
            humdifierStatus: ETC.status.stopped,
            LOW_HUMIDITY: 0,
            HIGH_HUMIDITY:  0,
            LOW_TEMPERATURE: 0,
            HIGH_TEMPERATURE: 0
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
            writePackets: this.writePackets.bind(this),
            changeReadTime: this.changeReadTime.bind(this),
            changeMaxMinTemp: this.changeMaxMinTemp.bind(this),
            changeMaxMinHumid: this.changeMaxMinHumid.bind(this)
        });
        this.readFromDevice = this.readFromDevice.bind(this);
    }

    componentWillMount() {
        this.initializeBluetooth();
        console.log("componentWillMount");
    }

    componentWillUnmount() {
        this.disconnect();
        this.disable();
        myTimer.map(_timer => {
            clearInterval(_timer);
        });
        console.log("componentWillUnmount");
    }

    initializeBluetooth() {
        const {baby, pageName} = this.props;
        if (
            pageName !== PAGE_NAME.babyAddition &&
            pageName !== PAGE_NAME.babyModification
        ) {
            babyInfo = realm.objects("baby").filtered(`name = "${baby.name}"`)[0];
            setting = realm.objects("setting").filtered(`id = "${baby.id}"`)[0];
        }

        this.readDevices();
        this.activateDevice();
        if (listener.length === 0) {
            const enableListener = BluetoothSerial.on("bluetoothEnabled", () => {
                console.log("Bluetooth enabled");
                this.activateDevice();
            });
            const disabledListener = BluetoothSerial.on("bluetoothDisabled", () => {
                console.log("Bluetooth disabled");
            });
            const errorListener = BluetoothSerial.on("error", err => {
                console.log(`Error: ${err.message}`);
            });
            const connectionLostlistener = BluetoothSerial.on(
                "connectionLost",
                () => {
                    console.log("Some device has been lost");
                }
            );
            listener.push(
                this.makeListenerObject("bluetoothEnabled", enableListener),
                this.makeListenerObject("bluetoothDisabled", disabledListener),
                this.makeListenerObject("error", errorListener),
                this.makeListenerObject("connectionLost", connectionLostlistener)
            );
        }
    }

    makeListenerObject(eventName, listener) {
        return {
            eventName,
            listener
        };
    }

    readDevices() {
        const {pageName} = this.props;
        Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
            values => {
                const [isEnabled, devices] = values;
                if (
                    pageName === PAGE_NAME.babyAddition ||
                    pageName === PAGE_NAME.babyModification
                ) {
                    if(devices.length !== 0 && isNotNull(devices[0]))
                        BluetoothActions.setDevices(devices);
                }
                BluetoothActions.setIsEnabled(isEnabled);
            }
        );
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
    writeTemperatureControlDevices(readData) {

        this.setState({
            LOW_HUMIDITY: setting.lowHumidity,
            HIGH_HUMIDITY:  setting.highHumidity,
            LOW_TEMPERATURE: setting.lowTemperature,
            HIGH_TEMPERATURE: setting.highTemperature
        });

        const {coolFanStatus, humdifierStatus, LOW_HUMIDITY, LOW_TEMPERATURE, HIGH_HUMIDITY, HIGH_TEMPERATURE} = this.state;
        console.log(LOW_TEMPERATURE);
        console.log(HIGH_TEMPERATURE);
        if (readData.humid <= LOW_HUMIDITY && this.props.autoHumidifier === ETC.status.running) {
            this.write("b"); //켜짐
            if (humdifierStatus === ETC.status.stopped) {
                pushNotifications.localNotification(KO.notification.runningHumidifier);
                this.state.humdifierStatus = ETC.status.running;
                BabyActions.setHumidifierState(ETC.status.running);
            }
        } else if (readData.humid > HIGH_HUMIDITY && this.props.autoHumidifier === ETC.status.running) {
            this.write("a"); //꺼짐
            if (humdifierStatus === ETC.status.running) {
                pushNotifications.localNotification(KO.notification.stoppedHumidifier);
                this.state.humdifierStatus = ETC.status.stopped;
                BabyActions.setHumidifierState(ETC.status.stopped);
            }
        }

        if (readData.temp >= HIGH_TEMPERATURE && this.props.autoCoolFan === ETC.status.running) {
            this.write("c"); //켜짐
            if (coolFanStatus === ETC.status.stopped) {
                pushNotifications.localNotification(KO.notification.runningCoolFan);
                this.state.coolFanStatus = ETC.status.running;
                BabyActions.setCoolFanState(ETC.status.running);
            }
        } else if (readData.temp < LOW_TEMPERATURE && this.props.autoCoolFan === ETC.status.running) {
            this.write("d"); //꺼짐
            if (coolFanStatus === ETC.status.running) {
                pushNotifications.localNotification(KO.notification.stoppedCoolFan);
                this.state.coolFanStatus = ETC.status.stopped;
                BabyActions.setCoolFanState(ETC.status.stopped);
            }
        }
    }

    /**
     * [android]
     * request enable of bluetooth from user
     */
    requestEnable() {
        BluetoothSerial.requestEnable()
            .then(res => {
                BluetoothActions.setIsEnabled(true);
            })
            .catch(err => console.log(err.message));
    }

    /**
     * [android]
     * enable bluetooth on device
     */
    enable() {
        BluetoothSerial.enable()
            .then(res => {
                this.initializeBluetooth();
                BluetoothActions.setIsEnabled(true);
            })
            .catch(err => console.log(err.message));
    }

    /**
     * [android]
     * disable bluetooth on device
     */
    disable() {
        BluetoothSerial.disable()
            .then(res => {
                BluetoothActions.setIsEnabled(false);
            })
            .catch(err => console.log(err.message));
    }

    /**
     * [android]
     * toggle bluetooth
     */
    toggleBluetooth(value) {
        if (value === true) {
            this.enable();
            this.readDevices();
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
            this.setState({discovering: true});
            BluetoothSerial.discoverUnpairedDevices()
                .then(unpairedDevices => {
                    this.setState({unpairedDevices, discovering: false});
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
                    this.setState({discovering: false});
                })
                .catch(err => console.log(err.message));
        }
    }

    /**
     * [android]
     * Pair device
     */
    pairDevice(device) {
        const {devices} = this.props;
        BluetoothSerial.pairDevice(device.id)
            .then(paired => {
                if (paired) {
                    console.log(`Device ${device.name} paired successfully`);
                    const devices = devices;
                    devices.push(device);
                    // this.setState({
                    //   unpairedDevices: this.state.unpairedDevices.filter(
                    //     d => d.id !== device.id
                    //   )
                    // });
                    BluetoothActions.setDevices(devices);
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
        // this.setState({ connecting: true });
        console.log("connecting...: ", device);
        BluetoothSerial.connect(device.device)
            .then(res => {
                console.log(`Connected to device ${device.name} ${device.id}`);
                // this.setState({ device, connected: true, connecting: false });
                //const timer = setInterval(this.readFromDevice, setting.checkTemperatureTime*1000);
                const timer = setInterval(this.readFromDevice, 1000);
                myTimer.push(timer);
            })
            .catch(err => console.log("connect err", err.message));
    }

    /**
     * Disconnect from bluetooth device
     */
    disconnect() {
        BluetoothSerial.disconnect()
            .then(() => {
                // this.setState({ connected: false })
            })
            .catch(err => console.log(err.message));
    }

    /**
     * Toggle connection when we have active device
     * @param  {Boolean} value
     */
    toggleConnect(value) {
        const {device} = this.props;
        if (value === true && isNotNull(device)) {
            device.map(activeDevice => {
                this.connect(activeDevice);
            });
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
                // this.setState({ connected: true });
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

        Promise.all(writePromises).then(result => {
        });
    }

    changeReadTime(newTime) {
        let newTimer = [];
        myTimer.map(_timer => {
            clearInterval(_timer);
            const timer = setInterval(this.readFromDevice, newTime*1000);
            newTimer.push(timer);
        });

        myTimer = newTimer;
        this.write("3");
        this.write(String(newTime*1000));
    }

    changeMaxMinHumid(minHumid, maxHumid) {
        this.setState({
            LOW_HUMIDITY: minHumid,
            HIGH_HUMIDITY: maxHumid
        });
    }

    changeMaxMinTemp(minTemp, maxTemp) {
        this.setState({
            LOW_TEMPERATURE: minTemp,
            HIGH_TEMPERATURE: maxTemp
        });
    }

    activateDevice() {
        const {devices, pageName} = this.props;
        console.log(
            "activateDevice: ",
            devices,
            isNotNull(devices) ? devices.length : null
        );
        if (
            pageName !== PAGE_NAME.babyAddition &&
            pageName !== PAGE_NAME.babyModification
        ) {
            let checkDuplicate = [];
            for (let i = 0; i < devices.length; i++) {
                if (isNotNull(devices[i])) {
                    const res = checkDuplicate.find(deviceId => deviceId === devices[i].device);
                    if (!isNotNull(res)) {
                        checkDuplicate.push(devices[i].device);
                        BluetoothSerial.isEnabled().then(res => {
                            console.log("isEnabled: ", res);
                            if (res) {
                                this.connect(devices[i]);
                            }
                        });
                    }
                }
            }
        }
    }

    render() {
        return <View/>;
    }
}

export default connect(({baby, bluetooth}) => ({
    baby: baby.get("baby"),
    pageName: baby.get("pageName"),
    devices: bluetooth.get("devices"),
    device: bluetooth.get("device"),
    autoCoolFan: baby.get("autoCoolFan"),
    autoHumidifier: baby.get("autoHumidifier")
}))(BluetoothSerialTemplate);
