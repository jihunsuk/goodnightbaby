import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Content, Form, Icon, Input, Item, Label, Picker, Switch} from "native-base";
import HeaderTemplate from "../../component/HeaderTemplate/HeaderTemplate";
import {commonProps, commonStyles} from "../../styles/index";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import {KO, PAGE_NAME} from "../../constants/index";
import {BabyActions} from "../../reduxStore/actionCreators";
import { connect } from "react-redux";
import realm from "../../realm/realmDatabase";

class HumiditySetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.measurementTime,
            highHumid: this.props.maxHumid,
            lowHumid: this.props.minHumid,
            baby: this.props.baby
        };
    }


    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    save() {
        const {  changeReadTime, baby, changeMaxMinHumid } = this.props;
        BabyActions.setMeasurementTime(this.state.selected);
        changeReadTime(parseInt(this.state.selected));

        const setting = realm.objects("setting").filtered(`id = "${baby.id}"`)[0];
        realm.write(() => {
            realm.create("setting", {
                id: setting.id,
                highHumidity: this.state.highHumid,
                lowHumidity: this.state.lowHumid,
                checkTemperatureTime: parseInt(this.state.selected)
            }, true);
        });

        changeMaxMinHumid(this.state.lowHumid, this.state.highHumid);

        BabyActions.setMinHumid(this.state.lowHumid);
        BabyActions.setMaxHumid(this.state.highHumid);

        BabyActions.setPageName(PAGE_NAME.setting);
    }

    isValidHighHumid(e) {
        let newHumid;
        if(!isNaN(e) && e !== undefined && e != ""){
            newHumid = parseInt(e);
            this.setState({highHumid: newHumid});
        } else{
            newHumid = "";
            this.setState({highHumid: newHumid});
        }
    }

    isValidLowHumid(e) {
        let newHumid;
        if(!isNaN(e) && e !== undefined && e != ""){
            newHumid = parseInt(e);
            this.setState({lowHumid: newHumid});
        } else{
            newHumid = "";
            this.setState({lowHumid: newHumid});
        }
    }

    render() {
        return (
            <Content style={styles.container}>
                <HeaderTemplate title="습도조절 설정"/>

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
                        <Label>최고습도</Label>
                        <Input
                            keyboardType="numeric"
                            value={String(this.state.highHumid)}
                            onChangeText={(value)=>{this.isValidHighHumid(value)}}
                        />
                    </Item>
                    <Item stackedLabel style={styles.itemInput}>
                        <Label>최저습도</Label>
                        <Input
                            keyboardType="numeric"
                            value={String(this.state.lowHumid)}
                            onChangeText={(value)=>{this.isValidLowHumid(value)}}
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
    changeMaxMinHumid: bluetooth.get("functions").changeMaxMinHumid,
    measurementTime: baby.get("measurementTime"),
    maxHumid: baby.get("maxHumid"),
    minHumid: baby.get("minHumid"),
    baby: baby.get("baby")
}))(HumiditySetting);