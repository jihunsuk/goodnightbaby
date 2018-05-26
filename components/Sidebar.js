import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Sidebar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.icon} onPress={() => { this.props._onPageSelect('Home');}} >홈</Text>
        <Text style={styles.icon} onPress={() => { this.props._onPageSelect('BabySelection'); }}>아이선택</Text>
        <Text style={styles.icon} onPress={() => { this.props._onPageSelect('DeviceManagement'); }}>장치관리</Text>
        <Text style={styles.icon} onPress={() => { this.props._onPageSelect('MeasurementHistory'); }}>측정기록</Text>
        <Text style={styles.icon} onPress={() => { this.props._onPageSelect('Setting'); }}>설정</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
  },
  icon: {
    marginHorizontal: 10,
  },
});