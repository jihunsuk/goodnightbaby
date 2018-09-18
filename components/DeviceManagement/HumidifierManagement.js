import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import HumidifierList from "./HumidifierList";
import { connect } from "react-redux";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC } from "../../constants";

class HumidifierManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: this.props.autoHumidifier === ETC.status.running,
        }
    }
    toggleSwitch = (value) => {
        const { write } = this.props;
        this.setState({switchValue: value})
        if (value === true){
            write("u");
            BabyActions.setAutoHumidifier("RUNNING");
        } else {
            write("e");
            BabyActions.setAutoHumidifier("STOPPED");
        }
    }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>가습기</Text>
            <Text>자동</Text>
            <Switch
                onValueChange = {this.toggleSwitch}
                value = {this.state.switchValue}/>
          </View>
          <HumidifierList />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
    header:{
        flexDirection: 'row',
    },
});

export default connect(({ bluetooth, baby }) => ({
    write: bluetooth.get("functions").write,
    autoHumidifier: baby.get("autoHumidifier")
}))(HumidifierManagement);
