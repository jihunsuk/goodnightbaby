import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import realm from "../../realm/realmDatabase";

let babyInfo;

class HomeFunction extends React.Component {
  constructor(props){
    super(props);
    const { baby } = this.props;
    babyInfo = realm.objects('baby').filtered(`name = "${baby.name}"`)[0];
  }

    prescribe(){
      let len = realm.objects('medic').length;
      realm.write(() => {
          newMedic = realm.create(
              "medic",
              {
                  id:len,
                  babyId: babyInfo.id,
                  time:new Date()
              },
              true
          );
      });
    }

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
          <TouchableHighlight onPress={() => {
              this.prescribe();
          }}>
            <View>
              <Image
                  style={styles.image}
                  source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
              />
              <Text>해열제 투약</Text>
            </View>
          </TouchableHighlight>
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

export default connect(({ baby }) => ({
    baby: baby.get("baby")
}))(HomeFunction);
