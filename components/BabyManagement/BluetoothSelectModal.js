import React from "react";
import { Modal, StyleSheet, Switch, Text, View } from "react-native";
import { Content, CheckBox } from "native-base";
import { ETC, KO } from "../../constants";
import { BabyActions } from "../../reduxStore/actionCreators";
import { commonProps, commonStyles } from "../../styles";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import { List } from "immutable";
import { isNotNull } from "../../util/commonUtil";
import { connect } from "react-redux";

class BluetoothSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedThermometer: null,
      selectedCoolFan: List([]),
      selectedHumidifier: List([])
    };
    this._handleOkButton = this._handleOkButton.bind(this);
    this._handleCancelButton = this._handleCancelButton.bind(this);
    this._setParentState = this._setParentState.bind(this);
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
    const {
      pageName,
      modalVisible,
      devices,
      isEnabled,
      toggleBluetooth
    } = this.props;
    const {
      selectedHumidifier,
      selectedCoolFan,
      selectedThermometer
    } = this.state;

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
          <Switch onValueChange={toggleBluetooth} value={isEnabled} />
          <View style={commonStyles.viewPageName}>
            <Text style={commonStyles.textPageName}>{pageName} 추가</Text>
          </View>
          <DeviceList
            devices={devices}
            pageName={pageName}
            selectedThermometer={selectedThermometer}
            selectedCoolFan={selectedCoolFan}
            selectedHumidifier={selectedHumidifier}
            setParentState={this._setParentState}
            isEnabled={isEnabled}
          />
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
export default connect(({ bluetooth }) => ({
  devices: bluetooth.get("devices"),
  isEnabled: bluetooth.get("isEnabled"),
  toggleBluetooth: bluetooth.get("functions").toggleBluetooth
}))(BluetoothSelectModal);

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
      pageName,
      selectedThermometer,
      selectedCoolFan,
      selectedHumidifier,
      isEnabled
    } = this.props;
    console.log("modal devices: ", devices);
    return (
      <Content style={styles.contentDeviceList}>
        {isNotNull(devices) && isEnabled ? (
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
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 10
                    }}
                  >
                    <CheckBox
                      checked={checked}
                      onPress={() => {
                        this.checkDevice(device.id, device.name, i);
                      }}
                      checkboxSize="40"
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        paddingLeft: 15
                      }}
                    >
                      {device.name} {`<${device.id}>`}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
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
    height: 350
  }
});
