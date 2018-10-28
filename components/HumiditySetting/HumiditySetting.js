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

export default class HumiditySetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            selected: "1min"
        };
    }

    toggleSwitch = value => {
        this.setState({switchValue: value});
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        return (
            <Content style={styles.container}>
                <HeaderTemplate title="습도조절 설정"/>
                <View style={[styles.viewFormItem, styles.viewMargin]}>
                    <Text style={styles.textLabel}>자동조절</Text>
                    <Switch
                        style={[commonStyles.switchDefault]}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                    />
                </View>
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
                        <Picker.Item label="1분" value="1min"/>
                        <Picker.Item label="5분" value="2min"/>
                        <Picker.Item label="10분" value="10min"/>
                    </Picker>
                </View>
                <Form style={styles.viewMargin}>
                    <Item stackedLabel style={styles.itemInput}>
                        <Label>최고습도</Label>
                        <Input
                            keyboardType="numeric"
                            onChangeText={highHumid => {
                                highHumid = parseInt(highHumid);
                                this.setState({highHumid});
                            }}
                        />
                    </Item>
                    <Item stackedLabel style={styles.itemInput}>
                        <Label>최저습도</Label>
                        <Input
                            keyboardType="numeric"
                            onChangeText={lowHumid => {
                                lowHumid = parseInt(lowHumid);
                                this.setState({lowHumid});
                            }}
                        />
                    </Item>
                </Form>
                <View style={[commonStyles.viewMenu]}>
                    <ButtonTemplate
                        buttonProps={commonProps.buttonMenus}
                        style={[commonStyles.buttonMenu, commonStyles.buttonLeftMenu]}
                        onPress={() => {
                            BabyActions.setPageName(PAGE_NAME.setting);
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