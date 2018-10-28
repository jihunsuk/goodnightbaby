import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Content} from "native-base";
import HeaderTemplate from "../../component/HeaderTemplate/HeaderTemplate";
import {commonProps, commonStyles} from "../../styles/index";
import ButtonTemplate from "../../component/ButtonTemplate/ButtonTemplate";
import {KO, PAGE_NAME} from "../../constants/index";
import {BabyActions} from "../../reduxStore/actionCreators";

export default class AlarmSetting extends React.Component {
    render() {
        return (
            <Content style={styles.container}>
                <HeaderTemplate title="알람 설정"/>
                <View style={[styles.viewFormItem, styles.viewMargin]}>
                    <Text style={styles.textLabel}>벨소리</Text>
                    <Button transparent dark bordered><Text>벨소리 선택</Text></Button>
                </View>
                <View style={[styles.viewFormItem, styles.viewMargin]}>
                    <Text style={styles.textLabel}>소리 세기</Text>
                </View>
                <View style={[styles.viewFormItem, styles.viewMargin]}>
                    <Text style={styles.textLabel}>진동 세기</Text>
                </View>
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
