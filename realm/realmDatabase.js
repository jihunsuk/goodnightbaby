const Realm = require("realm");

class baby {}
baby.schema = {
  name: "baby",
  primaryKey: "id",
  properties: {
    id: "int",
    settingId: "int",
    alarmId: "int",
    name: "string",
    age: "int",
    sex: "string",
    image: { type: "data", optional: true }
  }
};

class bluetoothDevice {}
bluetoothDevice.schema = {
  name: "bluetoothDevice",
  primaryKey: "id",
  properties: {
    id: "int",
    babyId: "int",
    device: "string",
    name: "string",
    type: "string",
    status: "string",
    auto: "bool"
  }
};

class setting {}
setting.schema = {
  name: "setting",
  primaryKey: "id",
  properties: {
    id: "int",
    checkTemperatureTime: "int",
    checkHumidityTime: "int",
    highTemperature: "int",
    highHumidity: "int",
    lowTemperature: "int",
    lowHumidity: "int"
  }
};

class alarm {}
alarm.schema = {
  name: "alarm",
  primaryKey: "id",
  properties: {
    id: "int",
    status: "string",
    soundVolume: "int",
    vibrationVolume: "int"
  }
};

export default realmDatabase = new Realm({
  schema: [baby, bluetoothDevice, setting, alarm],
  schemaVersion: 2
});
