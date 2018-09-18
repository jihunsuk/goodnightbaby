import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { touchableHighlightProps } from "../../constants";

class TempAndHumid extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnPressPassiveCheck = this.handleOnPressPassiveCheck.bind(this);
  }

  handleOnPressPassiveCheck() {
    const { write } = this.props;
    write("2");
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          {...touchableHighlightProps}
          onPress={this.handleOnPressPassiveCheck}
        >
          <View style={styles.viewTemperature}>
            <Text style={styles.textTemperature}>온도</Text>
            <Text style={styles.textTemperatureNumber}>
              {this.props.temp}
              ˚C
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          {...touchableHighlightProps}
          onPress={this.handleOnPressPassiveCheck}
        >
          <View style={styles.viewHumidity}>
            <Text style={styles.textHumidity}>습도</Text>
            <Text style={styles.textHumidityNumber}>{this.props.humid}%</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40
  },
  textTemperature: {
    color: "white",
    fontSize: 30
  },
  textTemperatureNumber: {
    color: "white",
    fontSize: 80
  },
  textHumidity: {
    color: "white",
    fontSize: 20
  },
  textHumidityNumber: {
    color: "white",
    fontSize: 50
  },
  viewTemperature: {
    borderRadius: 100,
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginRight: 10
  },
  viewHumidity: {
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue"
  }
});

export default connect(({ baby, bluetooth }) => ({
  baby: baby.get("baby"),
  temp: baby.get("temp"),
  humid: baby.get("humid"),
  write: bluetooth.get("functions").write
}))(TempAndHumid);
