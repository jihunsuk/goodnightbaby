import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import realm from "../../realm/realmDatabase";
import { Content, Form, Input, Item, Label, Radio } from "native-base";
import { URL } from "../../constants";

export default class BabyManagement extends React.Component {
  constructor(props) {
    super(props);
    const babyId = realm.objects("baby").length;
    this.state = {
      id: babyId,
      settingId: realm.objects("setting").length,
      alarmId: realm.objects("alarm").length,
      name: "",
      age: 0,
      sex: "male", // male, female
      image: null,
      device: [
        {
          id: 0,
          babyId: babyId,
          device: "",
          name: "",
          type: "",
          status: "",
          auto: false
        }
      ]
    };
  }

  saveBaby() {
    this.saveBabyInRealm();
    this.saveDevice();
  }

  saveDevice() {
    for (var i = 0; i < this.state.device.length; i++) {
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
    this.saveDevice();
  }

  addDevice() {
    //this.state.device에 추가하기
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
              <Radio selected={this.state.sex === "male" ? true : false} />
              <Text>여자</Text>
              <Radio selected={this.state.sex === "female" ? true : false} />
            </View>
          </Item>
          <Item stackedLabel>
            <Label>나이</Label>
            <Input />
          </Item>
        </Form>
        <View style={styles.name}>
          <Text>이름</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"이름을 입력해주세요"}
            maxLength={10}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View style={styles.name}>
          <Text>사진</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"사진을 넣어주세요"}
            maxLength={10}
            onChangeText={text => this.setState({ image: text })}
          />
        </View>
        <View style={styles.name}>
          <Text>나이</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder={"나이를 입력해주세요"}
            maxLength={2}
            onChangeText={text => this.setState({ age: text })}
          />
        </View>
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
  name: {
    flexDirection: "row",
    width: "100%"
  },
  textinput: {
    height: 40,
    borderWidth: 3,
    width: "100%"
  },
  bottom: {
    flexDirection: "row"
  }
});
