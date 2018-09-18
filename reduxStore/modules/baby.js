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
  humidifierState: "STOPPED"
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
      state.set("autoHumidifier", newState)
  },
  initialState
);
