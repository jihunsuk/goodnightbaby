import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BabyInfo from "../BabyInfo";
import PureChart from 'react-native-pure-chart';
import realm from "../../realm/realmDatabase";
import {connect} from "react-redux";

let history = [];

class MeasurementHistory extends React.Component {
    constructor(props) {
        super(props);
        const {baby} = this.props;
        this.state = {
            babyId: baby.id,
            isLoading: false,
            historys: [],
        }
    }

    componentWillMount() {
        this.setState({
            historys: realm.objects('history').filtered(`babyId = "${this.state.babyId}"`),
        }, () => {
            this.setState({
                isLoading: true
            })
        })
    }

    render() {
        const {historys, isLoading} = this.state;
        const len = historys.length;
        historise = historys.slice(len - 20, len);
        console.log(historise);
        let Temperature = [];
        let Humidity = [];
        historise.map(history => {
            Temperature.push({
                y: history.temperature,
                x: String(history.time.getDate())+ "일." +String(history.time.getHours())+ "시." +String(history.time.getMinutes())+"분"
            })
            Humidity.push({
                y: history.humidity,
                x: String(history.time.getDate())+ "일." +String(history.time.getHours())+ "시." +String(history.time.getMinutes())+"분"
            })
        });
        let Data = [
            {
                seriesName: 'Temperature',
                data: Temperature,
                color: 'red'
            },
            {
                seriesName: 'Humidity',
                data: Humidity,
                color: '#297AB1'
            }];
        return (
            <View style={styles.container}>
                <BabyInfo/>
                <Text>온습도 측정기록</Text>
                {isLoading && <PureChart data={Data} type='line'/>}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

export default connect(({baby}) => ({
    baby: baby.get("baby")
}))(MeasurementHistory);