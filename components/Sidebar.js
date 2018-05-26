import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Sidebar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}>홈</Text>
        <Text style={styles.icon}>아이선택</Text>
        <Text style={styles.icon}>장치관리</Text>
        <Text style={styles.icon}>측정기록</Text>
        <Text style={styles.icon}>설정</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});
