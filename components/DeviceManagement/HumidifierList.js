import React from 'react';
import { StyleSheet, Text, View, Image, Switch, ScrollView } from 'react-native';
import { connect } from "react-redux";

class HumidifierList extends React.Component {
    render() {
        let Humidifiers = testHumidifier.map((humidifier, idx) =>
            <Humidifier {...this.props} humidifier={humidifier} key={idx} />
        );

        return (
            <ScrollView style={styles.container}>
                {Humidifiers}
            </ScrollView>
        );
    }
}

class Humidifier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true,
        }
    }

    toggleSwitch = (value) => {
        const { write } = this.props;
        this.setState({switchValue: value})
        if (value == true){
            write("p");
        } else {
            write("q");
        }
    }

    render() {
        return (
            <View style={styles.humidifier}>
              <Image
                  style={styles.image}
                  source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
              />
              <Text>{this.props.humidifier.name}</Text>
              <Switch
                  onValueChange = {this.toggleSwitch}
                  value = {this.state.switchValue}/>
            </View>
        );
    }
}

const testHumidifier = [{
    name: '가습기1',
},
    // {
    //     name: '가습기2',
    // },
    // {
    //     name: '가습기3',
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
    humidifier: {
        flexDirection: 'row',
    }
});

export default connect(({ bluetooth }) => ({
    write: bluetooth.get("functions").write
}))(HumidifierList);