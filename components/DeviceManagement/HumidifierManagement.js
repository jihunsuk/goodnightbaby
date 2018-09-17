import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import HumidifierList from "./HumidifierList";

export default class HumidifierManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true,
        }
    }
    toggleSwitch = (value) => {
        this.setState({switchValue: value})
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
