import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Store from '../store'

export default class BabyInfo extends React.Component {
  render() {
    return (
        <Store.Consumer>
          {store => {
            return (
                <View style={styles.container}>
                  <Image
                      style={styles.image}
                      source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
                  />
                  <Text>{store.baby.name}</Text>
                  <Text>+배터리정보</Text>
                </View>
            );
          }}
        </Store.Consumer>
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
    borderRadius: 100,
  },
});