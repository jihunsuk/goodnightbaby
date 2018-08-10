import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

import BabyInfo from '../BabyInfo'
import TempAndHumid from './TempAndHumid'
import HomeFunction from './HomeFunction'

import { BleManager } from 'react-native-ble-plx'

export default class Home extends React.Component {
  constructor(props) {
      super(props);
//      this.manager = new BleManager();
      this.state = {
         switchValue: false,
      }
   }
   toggleSwitch = (value) => {
      this.setState({switchValue: value})
   }

//    componentWillMount() {
//        const subscription = this.manager.onStateChange((state) => {
//            if (state === 'PoweredOn') {
//
//                subscription.remove();
//            }
//        }, true);
//    }

  render() {
    return (
      <View style={styles.container}>
        <BabyInfo />
        <Text>자동측정</Text>
        <Switch
           onValueChange = {this.toggleSwitch}
           value = {this.state.switchValue}/>
        <TempAndHumid />
        <HomeFunction />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
