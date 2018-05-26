import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import AlarmSetting from './components/AlarmSetting'
import BabyManagement from './components/BabyManagement'
import BabySelection from './components/BabySelection'
import CoolFanSelection from './components/CoolFanSelection'
import DeviceManagement from './components/DeviceManagement'
import DeviceSelection from './components/DeviceSelection'
import Home from './components/Home'
import HumidifierSelection from './components/HumidifierSelection'
import HumiditySetting from './components/HumiditySetting'
import MeasurementHistory from './components/MeasurementHistory'
import Setting from './components/Setting'
import TemperatureSetting from './components/TemperatureSetting'
import Content from './components/Content'
import Sidebar from './components/Sidebar'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'BabySelection'
    };
  }

  _setPage(page) {
    this.setState({
      page
    });
  }

  _getPage() {
    const {
      page
    } = this.state;
    if (page === 'Home') {
      return <Home />;
    } else if (page === 'BabySelection') {
      return <BabySelection />;
    } else if (page === 'DeviceManagement') {
      return <DeviceManagement />;
    } else if (page === 'MeasurementHistory') {
      return <MeasurementHistory />
    } else if (page === 'Setting') {
      return <Setting />;
    } else if (page === 'BabyManagement') {
      return <BabyManagement />;
    } else if (page === 'DeviceSelection') {
      return <DeviceSelection />;
    } else if (page === 'CoolFanSelection') {
      return <CoolFanSelection />;
    } else if (page === 'HumidifierSelection') {
      return <HumidifierSelection />;
    } else if (page === 'TemeratureSetting') {
      return <TemeratureSetting />;
    } else if (page === 'HumiditySetting') {
      return <HumiditySetting />;
    } else if (page === 'AlarmSetting') {
      return <AlarmSetting />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>goodnightbaby</Text>
        </View>
        <Content page={this._getPage()}/>
        <Sidebar _onPageSelect={(page) => {this._setPage(page)}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    width: '100%',
    height: 40,
    backgroundColor: '#00df1a',
  },
});