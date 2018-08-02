import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import BabyList from './BabyList';
import Store from '../../store';

export default class BabySelection extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Image
              style={styles.image}
              source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
          />
          <BabyList/>
          <Store.Consumer>
            {store => {
              return (<Button style={styles.babyAdditionButton} title="+"
                              onPress={() => {
                                store._setPage("BabyAddition")
                              }}/>)
            }}
          </Store.Consumer>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 300,
  },
  babyAdditionButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
  }
});