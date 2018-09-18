import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";
import { BabyActions } from "../../reduxStore/actionCreators";
import { ETC } from "../../constants";

class CoolFanList extends React.Component {
  render() {
      const CoolFans = testCoolFan.map((coolfan, idx) =>
          <CoolFan {...this.props} coolfan={coolfan} key={idx} />
      );

      return (
          <ScrollView style={styles.container}>
              {CoolFans}
          </ScrollView>
      );
  }
}

class CoolFan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: this.props.coolFanState === ETC.status.running,
        }
    }

    toggleSwitch = (value) => {
        const { write } = this.props;
        this.setState({switchValue: value})
        if (value === true && this.props.autoCoolFan === ETC.status.stopped){
            write("y");
            BabyActions.setCoolFanState(ETC.status.running);
        } else if (value === false && this.props.autoCoolFan === ETC.status.stopped){
            write("x");
            BabyActions.setCoolFanState(ETC.status.stopped);
        }
    }

  render() {
    return (
        <View style={styles.coolfan}>
          <Image
              style={styles.image}
              source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
          />
          <Text>{this.props.coolfan.name}</Text>
          <Switch
              onValueChange = {this.toggleSwitch}
              value = {this.state.switchValue}/>
        </View>
    );
  }
}


const testCoolFan = [{
    name: '선풍기1',
},
    // {
    //     name: '선풍기2',
    // },
    // {
    //     name: '선풍기3',
    // },
];


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    coolfan: {
        flexDirection: 'row',
    }
});

export default connect(({ bluetooth, baby }) => ({
    write: bluetooth.get("functions").write,
    coolFanState: baby.get("coolFanState"),
    autoCoolFan: baby.get("autoCoolFan")
}))(CoolFanList);