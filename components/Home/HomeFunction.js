import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

export default class HomeFunction extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.func}>
          <View>
            <Image
                style={styles.image}
                source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
            />
            <Text>ON</Text>
          </View>
          <View>
            <Image
                style={styles.image}
                source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
            />
            <Text>ON</Text>
          </View>
          <View>
            <Image
                style={styles.image}
                source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
            />
            <Text>해열제 투약</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
    func: {
        flexDirection: 'row',
    },
    image : {
        width: 50,
        height: 50,
        borderRadius:100,
    },
});
