import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import realm from "../../realm/realmDatabase";


class TempAndHumid extends React.Component {
    constructor(props){
        super(props);
        const { baby } = this.props;
        babyInfo = realm.objects('baby').filtered(`name = "${baby.name}"`)[0];
        history = realm.objects('history').filtered(`babyId = "${baby.id}"`);
        this.state = {
            temp: history[history.length-1].temperature,
            humid: history[history.length-1].humidity
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.temp}>
          <Text>온도</Text>
          {/*<Text>{this.state.temp}</Text>*/}
            <Text>30</Text>
          <Text>측정하기</Text>
        </View>
        <View style={styles.humid}>
          <Text>습도</Text>
          <Text>50%</Text>
            {/*<Text>{this.state.humid}</Text>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
  },
    temp :{
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor : "green",
        borderRadius: 100,
        width: 200,
        height: 200,
        alignItems:'center',
        justifyContent:'center',
    },
    humid :{
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor : "green",
        borderRadius:100,
        width: 100,
        height: 100,
        alignItems:'center',
        justifyContent:'center',
    },
});

export default connect(({ baby }) => ({
    baby: baby.get("baby")
}))(TempAndHumid);
