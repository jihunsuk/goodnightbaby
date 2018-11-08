import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

// 액션 타입을 정의해줍니다.
const SET_DEVICES = "SET_DEVICES";
const SET_IS_ENABLED = "SET_IS_ENABLED";
const PUSH_CONNECTED_DEVICE = "PUSH_CONNECTED_DEVICE";
const SET_FUNCTIONS = "SET_FUNCTIONS";
const SET_IS_ACTIVATED = "SET_IS_ACTIVATED";

// 액션 생성 함수를 만듭니다.
export const setDevices = createAction(SET_DEVICES);
export const setIsEnabled = createAction(SET_IS_ENABLED);
export const pushConnectedDevice = createAction(PUSH_CONNECTED_DEVICE);
export const setFunctions = createAction(SET_FUNCTIONS);
export const setIsActivated = createAction(SET_IS_ACTIVATED);

// 모듈의 초기상태를 정의합니다.
const initialState = Map({
  devices: null,
  isEnabled: false,
  connectedDevices: Map({}),
  functions: {
    initializeBluetooth: null,
    readFromDevice: null,
    write: null,
    requestEnable: null,
    toggleBluetooth: null,
    discoverUnpaired: null,
    cancelDiscovery: null,
    toggleConnect: null,
    onDevicePress: null,
    writePackets: null,
    changeReadTime: null,
    changeMaxMinTemp: null,
    changeMaxMinHumid: null,
    disable: null,
    disconnectDevices: null,
  },
  isActivated: false,
});

export default handleActions(
  {
    [SET_DEVICES]: (state, { payload: devices }) =>
      state.set("devices", devices),
    [SET_IS_ENABLED]: (state, { payload: isEnabled }) =>
      state.set("isEnabled", isEnabled),
    [PUSH_CONNECTED_DEVICE]: (state, { payload: device }) =>
      state.setIn(["connectedDevices", device.id], device),
    [SET_FUNCTIONS]: (state, { payload: funcs }) =>
      state.set("functions", funcs),
    [SET_IS_ACTIVATED]: (state, { payload: isActivated }) =>
      state.set("isActivated", isActivated)
  },
  initialState
);
