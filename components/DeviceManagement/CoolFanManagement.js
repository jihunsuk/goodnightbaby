import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import CoolFanList from "./CoolFanList";

export default class CoolFanManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
        }
    }
    toggleSwitch = (value) => {
        this.setState({switchValue: value})
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
