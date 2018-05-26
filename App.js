import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
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
import MeausermentHistory from './components/MeausermentHistory'
import Setting from './components/Setting'
import TemperatureSetting from './components/TemperatureSetting'
import Sidebar from './components/Sidebar'

export default class App extends React.Component {

  _setPage(page) {
    this.setState({
      page
    });
  }
  
  _getPage() {
    const { page } = this.state;
    if (page === 'Home') {
      return <Home />;
    }
    else if (page === 'BabySelection') {
      return <BabySelection />;
    }
    else if (page === 'DeviceManagement') {
      return <DeviceManagement />;
    }
    else if (page === 'MeasurementHistory') {
      return <MeasurementHistory />
    }
    else if (page === 'Setting') {
      return <Setting />;
    }
    else if (page === 'BabyManagement') {
      return <BabyManagement />;
    }
    else if (page === 'DeviceSelection') {
      return <DeviceSelection />;
    }
    else if (page === 'CoolFanSelection') {
      return <CoolFanSelection />;
    }
    else if (page === 'HumidifierSelection') {
      return <HumidifierSelection />;
    }
    else if (page === 'TemeratureSetting') {
      return <TemeratureSetting />;
    }
    else if (page === 'HumiditySetting') {
      return <HumiditySetting />;
    }
    else if (page === 'AlarmSetting') {
      return <AlarmSetting />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>goodnightbaby</Text>
        </View>
        <Image
            style={styles.image}
            source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
          />
        <AlarmSetting />
        <BabyManagement />
        <BabySelection />
        <CoolFanSelection />
        <DeviceManagement />
        <DeviceSelection />
        <Home />
        <HumidifierSelection />
        <HumiditySetting />
        <MeausermentHistory />
        <Setting />
        <TemperatureSetting />
        <Sidebar />
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
    width: '100%',
    height: 50,
    backgroundColor: '#00df1a',
  },
  image: {
    width: '100%',
    height: 300,
  }
});
