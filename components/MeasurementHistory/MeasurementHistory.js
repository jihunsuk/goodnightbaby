import React from "react";
import { StyleSheet, View } from "react-native";
import BabyInfo from "../BabyInfo";
import PureChart from "react-native-pure-chart";
import realm from "../../realm/realmDatabase";
import { connect } from "react-redux";
import HeaderTemplate from "../../component/HeaderTemplate/HeaderTemplate";
import { Content, Text } from "native-base";

class MeasurementHistory extends React.Component {
  constructor(props) {
    super(props);
    const { baby } = this.props;
    this.state = {
      babyId: baby.id,
      isLoading: false,
      historys: [],
      medic: []
    };
  }

  componentWillMount() {
    this.setState(
      {
        historys: realm
          .objects("history")
          .filtered(`babyId = "${this.state.babyId}"`),
        medic: realm
          .objects("medic")
          .filtered(`babyId = "${this.state.babyId}"`)
      },
      () => {
        this.setState({
          isLoading: true
        });
      }
    );
  }

  render() {
    const { historys, medic, isLoading } = this.state;
    const len = historys.length;
    const histories = historys.slice(len - 20, len);
    const medics = medic.slice(0, medic.length);
    let Temperature = [];
    let Humidity = [];

    histories.map(history => {
      Temperature.push({
        y: history.temperature,
        x:
          String(history.time.getDate()) +
          "일." +
          String(history.time.getHours()) +
          "시." +
          String(history.time.getMinutes()) +
          "분"
      });
      Humidity.push({
        y: history.humidity,
        x:
          String(history.time.getDate()) +
          "일." +
          String(history.time.getHours()) +
          "시." +
          String(history.time.getMinutes()) +
          "분"
      });
    });

    let _medics = medics.map((md, idx) => {
      if (
        md.time.getTime() >= histories[0].time.getTime() &&
        md.time.getTime() <= histories[19].time.getTime()
      )
        return (
          <Medic
            medic={
              String(md.time.getDate()) +
              "일." +
              String(md.time.getHours()) +
              "시." +
              String(md.time.getMinutes()) +
              "분"
            }
            key={idx}
          />
        );
    });

    let Data = [
      {
        seriesName: "Temperature",
        data: Temperature.length === 0 ? { x: 0, y: 0 } : Temperature,
        color: "red"
      },
      {
        seriesName: "Humidity",
        data: Humidity.length === 0 ? { x: 0, y: 0 } : Humidity,
        color: "#297AB1"
      }
    ];

    return (
      <Content style={styles.container}>
        <BabyInfo />
        <HeaderTemplate title="온습도 측정기록" />
        {isLoading && <PureChart data={Data} type="line" />}
        <HeaderTemplate title="약 투여 기록" />
        {_medics}
      </Content>
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
        <Text>{medic}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  medic_list: {
    marginTop: 2
  }
});

export default connect(({ baby }) => ({
  baby: baby.get("baby")
}))(MeasurementHistory);
