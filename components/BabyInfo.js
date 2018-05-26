import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class BabyInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
        />
        <Text>이상현</Text>
        <Text>+배터리정보</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius:100,
  },
});