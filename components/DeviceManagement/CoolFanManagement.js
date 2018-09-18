import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import CoolFanList from "./CoolFanList";
import { connect } from "react-redux";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC } from "../../constants";

class CoolFanManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: this.props.autoCoolFan === ETC.status.running,
        }
    }
    toggleSwitch = (value) => {
        const { write } = this.props;
        this.setState({switchValue: value})
        if (value === true){
            write("u");
            BabyActions.setAutoCoolFan("RUNNING");
        } else {
            write("e");
            BabyActions.setAutoCoolFan("STOPPED");
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>선풍기</Text>
          <Text>자동</Text>
          <Switch
              onValueChange = {this.toggleSwitch}
              value = {this.state.switchValue}/>
        </View>
        <CoolFanList />
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
    }
});

export default connect(({ bluetooth, baby }) => ({
    write: bluetooth.get("functions").write,
    autoCoolFan: baby.get("autoCoolFan")
}))(CoolFanManagement);
