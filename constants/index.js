export const PAGE_NAME = {
  home: "Home",
  babySelection: "BabySelection",
  deviceMgmt: "DeviceManagement",
  measurementHistory: "MeasurementHistory",
  setting: "Setting",
  babyAddition: "BabyAddition",
  babyModification: "BabyModification",
  babyDeletion: "BabyDeletion",
  deviceSelection: "DeviceSelection",
  coolFanSelection: "CoolFanSelection",
  humidifierSelection: "HumidifierSelection",
  temperatureSetting: "TemperatureSetting",
  humiditySetting: "HumiditySetting",
  alarmSetting: "AlarmSetting"
};

export const KO = {
  save: "저장",
  cancel: "취소",
  thermometer: "체온측정장치",
  coolFan: "선풍기",
  humidifier: "가습기",
  runningCoolFan: "선풍기 켜짐",
  stoppedCoolFan: "선풍기 꺼짐",
  runningHumidifier: "가습기 켜짐",
  stoppedHumidifier: "가습기 꺼짐",
  notification: {
    runningCoolFan: {
      title: "선풍기가 켜졌습니다.",
      content: "선풍기가 켜졌습니다."
    },
    stoppedCoolFan: {
      title: "선풍기가 꺼졌습니다.",
      content: "선풍기가 꺼졌습니다."
    },
    runningHumidifier: {
      title: "가습기가 켜졌습니다.",
      content: "가습기가 켜졌습니다."
    },
    stoppedHumidifier: {
      title: "가습기가 꺼졌습니다.",
      content: "가습기가 꺼졌습니다."
    }
  },
  temperatureSetting: "체온조절 설정",
  humiditySetting: "습도조절 설정",
  alarmSetting: "알람 설정"
};

export const REALM_SCHEMA = {};

export const ETC = {
  male: "male",
  female: "female",
  thermometer: "thermometer",
  coolFan: "coolFan",
  humidifier: "humidifier",
  status: {
    stopped: "STOPPED",
    running: "RUNNING"
  }
};

export const TITLE = {
  goodnightbaby: "Goodnight Baby"
};

export const URL = {
  babySelectionImage:
    "https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2"
};

export const BLUETOOTH_DATA = {
  on: "0",
  off: "1"
};

/* Props */
export const touchableHighlightProps = {
  underlayColor: "#fff"
};

export const TEST_DATA = {
  babyAddition: {
    name: "손재형",
    age: 25,
    sex: "male",
    image: null,
    device: [
      {
        id: 0,
        babyId: 0,
        device: "",
        name: "",
        type: "",
        status: "",
        auto: false
      }
    ]
  }
};
