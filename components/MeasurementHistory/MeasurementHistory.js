import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BabyInfo from "../BabyInfo";
import PureChart from 'react-native-pure-chart';

export default class MeasurementHistory extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <BabyInfo/>
                <Text>온습도 측정기록</Text>
                <PureChart data={sampleData} type='line'/>
            </View>
        );
    }
}

const testTemperature = [
    {x: '2018-02-01', y: 36},
    {x: '2018-02-02', y: 35},
    {x: '2018-02-03', y: 37},
    {x: '2018-02-04', y: 36},
    {x: '2018-02-05', y: 35},
];

const testHumidity = [
    {x: '2018-02-01', y: 30},
    {x: '2018-02-02', y: 50},
    {x: '2018-02-03', y: 80},
    {x: '2018-02-04', y: 40},
    {x: '2018-02-05', y: 50},
];

let sampleData = [
    {
        seriesName: 'series1',
        data: testTemperature,
        color: '#297AB1'
    },
    {
        seriesName: 'series2',
        data: testHumidity,
        color: 'red'
    },
]

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});