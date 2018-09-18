import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
            medic: [],
        }
    }

    componentWillMount() {
        this.setState({
            historys: realm.objects('history').filtered(`babyId = "${this.state.babyId}"`),
            medic: realm.objects('medic').filtered(`babyId = "${this.state.babyId}"`),
        }, () => {
            this.setState({
                isLoading: true
            })
        })
    }

    render() {
        const {historys, medic, isLoading} = this.state;
        const len = historys.length;
        const histories = historys.slice(len - 20, len);
        const medics = medic.slice(0, medic.length);
        let Temperature = [];
        let Humidity = [];
        let medicTime = [];

        histories.map(history => {
            Temperature.push({
                y: history.temperature,
                x: String(history.time.getDate())+ "일." +String(history.time.getHours())+ "시." +String(history.time.getMinutes())+"분"
            })
            Humidity.push({
                y: history.humidity,
                x: String(history.time.getDate())+ "일." +String(history.time.getHours())+ "시." +String(history.time.getMinutes())+"분"
            })
        });

        let m = medics.map((md,idx) => {
            if (md.time.getTime() >= histories[0].time.getTime() && md.time.getTime() <= histories[19].time.getTime())
                return <Medic medic={String(md.time.getDate())+ "일." +String(md.time.getHours())+ "시." +String(md.time.getMinutes())+"분"} key={idx} />
            }
        );

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
            },];

        return (
            <View style={styles.container}>
                <BabyInfo/>
                <Text>온습도 측정기록</Text>
                {isLoading && <PureChart data={Data} type='line'/>}
                <Text>약 투여 기록</Text>
                {m}
            </View>
        );
    }
}

class Medic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { medic } = this.props;
        return (
            <View style={styles.medic_list}>
                {console.log(medic)}
                <Text>{medic}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    medic_list: {
        marginTop: 2
    }
});

export default connect(({baby}) => ({
    baby: baby.get("baby")
}))(MeasurementHistory);
