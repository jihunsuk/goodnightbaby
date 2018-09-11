import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import realm from "../../realm/realmDatabase";
import { Content, Form, Input, Item, Label, Radio } from "native-base";

export default class BabyManagement extends React.Component {
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
      sex: "male", // male, female
      image: null,
      device: []
    };
  }

  saveBaby() {
    this.saveBabyInRealm();
    this.saveDeviceInRealm();
  }

  saveDeviceInRealm() {
    for (let i = 0; i < this.state.device.length; i++) {
      realm.write(() => {
        newDevice = realm.create(
          "bluetoothDevice",
          {
            id: this.state.device[i].id,
            babyId: this.state.id,
            device: this.state.device[i].device,
            name: this.state.device[i].name,
            type: this.state.device[i].type,
            status: this.state.device[i].status,
            auto: this.state.device[i].auto
          },
          true
        );
      });
    }
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

  addDevice() {
    //this.state.device에 추가하기
  // let devices = realm.objects('bluetoothDevice');
  // var devices_length = devices.length
  // device = realm.create('bluetoothDevice', {
  //     id: devices_length === 0 ? 0 : devices[devices_length-1].id+1,
  //     babyId: this.state.id
  //     device:
  //     name:
  //     type:
  //     status:
  //     auto:
  // }, true);
  // this.state.device.append(device);
  }

  render() {
    const { sex } = this.state;
    return (
      <Content style={styles.container}>
        <Form>
          <Item stackedLabel>
            <Label>이름</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>사진</Label>
            <Input />
          </Item>
          <Item stackedLabel style={{ borderColor: "transparent" }}>
            <Label>성별</Label>
            <View style={{ flexDirection: "row" }}>
              <Text>남자</Text>
              <Radio selected={this.state.sex === "male"} />
              <Text>여자</Text>
              <Radio selected={this.state.sex === "female"} />
            </View>
          </Item>
          <Item stackedLabel>
            <Label>나이</Label>
            <Input />
          </Item>
        </Form>
        <Button title="측정장치" onPress={this.addDevice()} />
        <Button title="선풍기" onPress={this.addDevice()} />
        <Button title="가습기" onPress={this.addDevice()} />
        <View style={styles.bottom}>
          <Button title="저장" onPress={this.saveBaby()} />
          <Button title="취소" />
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%"
  },
  bottom: {
    flexDirection: "row"
  }
});
