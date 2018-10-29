import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Content, Form, Icon, Input, Item, Label, Picker, Switch, Text} from "native-base";
import {commonProps, commonStyles} from "../../styles/index";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import {BabyActions} from "../../reduxStore/actionCreators";
import {KO, PAGE_NAME} from "../../constants/index";
import HeaderTemplate from "../../component/HeaderTemplate/HeaderTemplate";
import { connect } from "react-redux";
import realm from "../../realm/realmDatabase";

class TemperatureSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            selected: this.props.measurementTime,
            highTemp: this.props.maxTemp,
            lowTemp: this.props.minTemp,
            baby: this.props.baby
        };
    }


    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    save() {
        const { changeReadTime, baby, changeMaxMinTemp } = this.props;
        BabyActions.setMeasurementTime(this.state.selected);
        changeReadTime(parseInt(this.state.selected));

        const setting = realm.objects("setting").filtered(`id = "${baby.id}"`)[0];
        realm.write(() => {
            realm.create("setting", {
                id: setting.id,
                highTemperature: this.state.highTemp,
                lowTemperature: this.state.lowTemp,
                checkTemperatureTime: parseInt(this.state.selected)
            }, true);
        });
        console.log(setting.lowTemperature);
        changeMaxMinTemp(this.state.lowTemp, this.state.highTemp);

        BabyActions.setMinTemp(this.state.lowTemp);
        BabyActions.setMaxTemp(this.state.highTemp);

        BabyActions.setPageName(PAGE_NAME.setting);
    }

    isValidHighTemp(e) {
        let newTemp;
        if(!isNaN(e) && e !== undefined && e != ""){
            newTemp = parseInt(e);
            this.setState({highTemp: newTemp});
        } else{
            newTemp = "";
            this.setState({highTemp: newTemp});
        }
    }

    isValidLowTemp(e) {
        let newTemp;
        if(!isNaN(e) && e !== undefined && e != ""){
            newTemp = parseInt(e);
            this.setState({lowTemp: newTemp});
        } else{
            newTemp = "";
            this.setState({lowTemp: newTemp});
        }
    }

    render() {
        return (
            <Content style={styles.container}>
                <HeaderTemplate title="체온조절 설정"/>

                <View style={[styles.viewFormItem, styles.viewMargin]}>
                    <Text style={[styles.textLabel, {paddingTop: 15}]}>측정시간</Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="Select your SIM"
                        iosIcon={<Icon name="ios-arrow-down-outline"/>}
                        style={{width: undefined}}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="5초" value="5" />
                        <Picker.Item label="30초" value="30"/>
                        <Picker.Item label="1분" value="60"/>
                        <Picker.Item label="5분" value="300"/>
                        <Picker.Item label="10분" value="600"/>
                    </Picker>
                </View>
                <Form style={styles.viewMargin}>
                    <Item stackedLabel style={styles.itemInput}>
                        <Label>최고온도</Label>
                        <Input
                            keyboardType="numeric"
                            value={String(this.state.highTemp)}
                            onChangeText={(value)=>{this.isValidHighTemp(value)}}
                        />
                    </Item>
                    <Item stackedLabel style={styles.itemInput}>
                        <Label>최저온도</Label>
                        <Input
                            keyboardType="numeric"
                            value={String(this.state.lowTemp)}
                            onChangeText={(value)=>{this.isValidLowTemp(value)}}
                        />
                    </Item>
                </Form>
                <View style={[commonStyles.viewMenu]}>
                    <ButtonTemplate
                        buttonProps={commonProps.buttonMenus}
                        style={[commonStyles.buttonMenu, commonStyles.buttonLeftMenu]}
                        onPress={() => {
                            this.save();
                        }}
                        title={KO.save}
                    />
                    <ButtonTemplate
                        buttonProps={commonProps.buttonMenus}
                        style={commonStyles.buttonMenu}
                        onPress={() => {
                            BabyActions.setPageName(PAGE_NAME.setting);
                        }}
                        title={KO.cancel}
                    />
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    viewFormItem: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    viewMargin: {
        marginLeft: 15,
        marginRight: 15
    },
    textLabel: {
        marginRight: 15,
        marginLeft: 15
    }
});

export default connect(({ baby, bluetooth }) => ({
    changeReadTime: bluetooth.get("functions").changeReadTime,
    changeMaxMinTemp: bluetooth.get("functions").changeMaxMinTemp,
    measurementTime: baby.get("measurementTime"),
    maxTemp: baby.get("maxTemp"),
    minTemp: baby.get("minTemp"),
    baby: baby.get("baby")
}))(TemperatureSetting);