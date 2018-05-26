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
import Store from "./store"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this._setPage = pageName => {
      this.setState({
        pageName: pageName,
        page: this._getPage(pageName),
      });
    }

    this._getPage = (pageName) => {
      if (pageName === 'Home') {
        return <Home />;
      } else if (pageName === 'BabySelection') {
        return <BabySelection />;
      } else if (pageName === 'DeviceManagement') {
        return <DeviceManagement />;
      } else if (pageName === 'MeasurementHistory') {
        return <MeasurementHistory />
      } else if (pageName === 'Setting') {
        return <Setting />;
      } else if (pageName === 'BabyManagement') {
        return <BabyManagement />;
      } else if (pageName === 'DeviceSelection') {
        return <DeviceSelection />;
      } else if (pageName === 'CoolFanSelection') {
        return <CoolFanSelection />;
      } else if (pageName === 'HumidifierSelection') {
        return <HumidifierSelection />;
      } else if (pageName === 'TemeratureSetting') {
        return <TemeratureSetting />;
      } else if (pageName === 'HumiditySetting') {
        return <HumiditySetting />;
      } else if (pageName === 'AlarmSetting') {
        return <AlarmSetting />;
      }
    }

    this.state = {
      pageName: 'BabySelection',
      page: <BabySelection />,
      _setPage: this._setPage,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Store.Provider value={this.state}>
          <View style={styles.header}>
            <Text>goodnightbaby</Text>
          </View>
          <Content />
          <Sidebar />
        </Store.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    width: '100%',
    height: 40,
    backgroundColor: '#00df1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});