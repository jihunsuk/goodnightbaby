import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

import BabyInfo from '../BabyInfo'
import TempAndHumid from './TempAndHumid'
import HomeFunction from './HomeFunction'

export default class Home extends React.Component {
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
