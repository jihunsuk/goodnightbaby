import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
const Realm = require('realm');

class baby {}
baby.schema = {
    name: 'baby',
    primaryKey: 'id',
    properties: {
        id : 'int',
        settingId: 'int',
        alarmId: 'int',
        name: 'string',
        age: 'int',
        sex: 'string',
        image: {type:'data', optional: true}
    },
};
class bluetoothDevice {}
bluetoothDevice.schema ={
    name: 'bluetoothDevice',
    primaryKey: 'id',
    properties: {
        id : 'int',
        babyId :'int',
        device :'string',
        name: 'string',
        type: 'string',
        status: 'string',
        auto: 'bool'
    },
};
class setting {}
setting.schema = {
    name: 'setting',
    primaryKey: 'id',
    properties: {
        id: 'int',
        checkTemperatureTime: 'int',
        checkHumidityTime: 'int',
        highTemperature: 'int',
        highHumidity: 'int',
        lowTemperature: 'int',
        lowHumidity: 'int'
    },
};
class alarm {}
alarm.schema = {
    name: 'alarm',
    primaryKey: 'id',
    properties: {
        id: 'int',
        status: 'string',
        soundVolume: 'int',
        vibrationVolume: 'int'
    },
};

const realm = new Realm({schema: [baby, bluetoothDevice, setting, alarm],
    schemaVersion: 2
});

export default class BabyManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: realm.objects('baby').length,
            settingId : realm.objects('setting').length,
            alarmId : realm.objects('alarm').length,
            name: '',
            age: 0,
            sex: 'boy',
            image: null,
            device: [{id : 0,
                babyId :0,
                device :'',
                name: '',
                type: '',
                status: '',
                auto: false}]
        };
    }

    saveDevice(){
        for (var i=0; i<this.state.device.length; i++) {
            realm.write(() => {
                newDevice = realm.create('bluetoothDevice', {
                    id: this.state.device[i].id,
                    babyId: this.state.id,
                    device: this.state.device[i].device,
                    name: this.state.device[i].name,
                    type: this.state.device[i].type,
                    status: this.state.device[i].status,
                    auto: this.state.device[i].auto
                }, true);
            });
        }
    }

    saveBaby() {
        realm.write(() => {
            newBaby = realm.create('baby', {
                id: this.state.id,
                settingId: this.state.settingId,
                alarmId: this.state.alarmId,
                name: this.state.name,
                age: this.state.age,
                sex: this.state.sex,
                image: this.state.image
            }, true);
        });
        this.saveDevice();
    }

    addDevice() {
        //this.state.device에 추가하기
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text>이름</Text>
                    <TextInput style={styles.textInput}
                               placeholder={'이름을 입력해주세요'}
                               maxLength={10}
                               onChangeText={(text) => this.setState({name: text})}
                    />
                </View>
                <View style={styles.name}>
                    <Text>사진</Text>
                    <TextInput style={styles.textInput}
                               placeholder={'사진을 넣어주세요'}
                               maxLength={10}
                               onChangeText={(text) => this.setState({image: text})}
                    />
                </View>
                <View style={styles.name}>
                    <Text>나이</Text>
                    <TextInput style={styles.textInput}
                               keyboardType='numeric'
                               placeholder={'나이를 입력해주세요'}
                               maxLength={2}
                               onChangeText={(text) => this.setState({age: text})}
                    />
                </View>
                <Button title="측정장치" onPress = {this.addDevice()}/>
                <Button title="선풍기" onPress = {this.addDevice()}/>
                <Button title="가습기" onPress = {this.addDevice()}/>
                <View style={styles.bottom}>
                    <Button title="저장" onPress={this.saveBaby()}/>
                    <Button title="취소"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
    }, name: {
        flexDirection: 'row',
        width: '100%',
    },
    textinput: {
        height: 40,
        borderWidth: 3,
        width: '100%',
    },
    bottom: {
        flexDirection: 'row',
    }
});
