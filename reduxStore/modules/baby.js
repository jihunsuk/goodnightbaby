import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { PAGE_NAME } from "../../constants";

// 액션 타입을 정의해줍니다.
const SET_BABY = "SET_BABY";
const SET_PAGENAME = "SET_PAGENAME";
const SET_SELECTED_THERMOMETER = "SET_SELECTED_THERMOMETER";
const SET_SELECTED_COOLFAN = "SET_SELECTED_COOLFAN";
const SET_SELECTED_HUMIDIFIER = "SET_SELECTED_HUMIDIFIER";
const SET_TEMP_AND_HUMID = "SET_TEMP_AND_HUMID";
const SET_COOLFAN_STATE = "SET_COOLFAN_STATE";
const SET_HUMIDIFIER_STATE = "SET_HUMIDIFIER_STATE";
const SET_AUTO_COOLFAN = "SET_AUTO_COOLFAN";
const SET_AUTO_HUMIDIFIER = "SET_AUTO_HUMIDIFIER";
const SET_MEASUREMENT_TIME = "SET_MEASUREMENT_TIME";
const SET_MAX_TEMP = "SET_MAX_TEMP";
const SET_MIN_TEMP = "SET_MIN_TEMP";
const SET_MAX_HUMID = "SET_MAX_HUMID";
const SET_MIN_HUMID = "SET_MIN_HUMID";

// 액션 생성 함수를 만듭니다.
export const setBaby = createAction(SET_BABY);
export const setPageName = createAction(SET_PAGENAME);
export const setSelectedThermometer = createAction(SET_SELECTED_THERMOMETER);
export const setSelectedCoolFan = createAction(SET_SELECTED_COOLFAN);
export const setSelectedHumidifier = createAction(SET_SELECTED_HUMIDIFIER);
export const setTempAndHumid = createAction(SET_TEMP_AND_HUMID);
export const setCoolFanState = createAction(SET_COOLFAN_STATE);
export const setHumidifierState = createAction(SET_HUMIDIFIER_STATE);
export const setAutoCoolFan = createAction(SET_AUTO_COOLFAN);
export const setAutoHumidifier = createAction(SET_AUTO_HUMIDIFIER);
export const setMeasurementTime = createAction(SET_MEASUREMENT_TIME);
export const setMaxTemp = createAction(SET_MAX_TEMP);
export const setMinTemp = createAction(SET_MIN_TEMP);
export const setMaxHumid = createAction(SET_MAX_HUMID);
export const setMinHumid = createAction(SET_MIN_HUMID);

// 모듈의 초기상태를 정의합니다.
const initialState = Map({
  baby: {
    name: "테스트",
    id: 1
  },
  pageName: PAGE_NAME.babySelection,
  selectedThermometer: null,
  selectedCoolFan: List([]),
  selectedHumidifier: List([]),
  setTempAndHumid: null,
  temp: "-",
  humid: "-",
  autoCoolFan: "RUNNING",
  autoHumidifier: "RUNNING",
  coolFanState: "STOPPED",
  humidifierState: "STOPPED",
  measurementTime: "5",
  minTemp: 29,
  maxTemp: 33,
  maxHumid: 75,
  minHumid: 65
});

export default handleActions(
  {
    [SET_BABY]: (state, { payload: object }) => state.set("baby", object),
    [SET_PAGENAME]: (state, { payload: string }) =>
      state.set("pageName", string),
    [SET_SELECTED_THERMOMETER]: (state, { payload: device }) =>
      state.set("selectedThermometer", device),
    [SET_SELECTED_COOLFAN]: (state, { payload: device }) =>
      state.set("selectedCoolFan", device),
    [SET_SELECTED_HUMIDIFIER]: (state, { payload: device }) =>
      state.set("selectedHumidifier", device),
    [SET_TEMP_AND_HUMID]: (state, { payload: info }) =>
      state.set("temp", info.temp).set("humid", info.humid),
    [SET_COOLFAN_STATE]: (state, { payload: newState }) =>
      state.set("coolFanState", newState),
    [SET_HUMIDIFIER_STATE]: (state, { payload: newState }) =>
      state.set("humidifierState", newState),
    [SET_AUTO_COOLFAN]: (state, { payload: newState }) =>
      state.set("autoCoolFan", newState),
    [SET_AUTO_HUMIDIFIER]: (state, { payload: newState }) =>
      state.set("autoHumidifier", newState),
    [SET_MEASUREMENT_TIME]: (state, { payload: newState }) =>
      state.set("measurementTime", newState),
    [SET_MAX_TEMP]: (state, { payload: newState }) =>
      state.set("maxTemp", newState),
    [SET_MIN_TEMP]: (state, { payload: newState }) =>
      state.set("minTemp", newState),
    [SET_MAX_HUMID]: (state, { payload: newState }) =>
      state.set("maxHumid", newState),
    [SET_MIN_HUMID]: (state, { payload: newState }) =>
      state.set("minHumid", newState)
  },
  initialState
);
