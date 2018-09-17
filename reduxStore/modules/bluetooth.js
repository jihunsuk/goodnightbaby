import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

// 액션 타입을 정의해줍니다.
const SET_DEVICES = "SET_DEVICES";
const SET_FUNCTIONS = "SET_FUNCTIONS";

// 액션 생성 함수를 만듭니다.
export const setDevices = createAction(SET_DEVICES);
export const setFunctions = createAction(SET_FUNCTIONS);

// 모듈의 초기상태를 정의합니다.
const initialState = Map({
  discovering: false,
  devices: null,
  unpairedDevices: [],
  connected: false,
  section: 0,
  functions: {},
});

export default handleActions(
  {
    [SET_DEVICES]: (state, { payload: devices }) =>
      state.set("devices", devices),
    [SET_FUNCTIONS]: (state, { payload: funcs }) =>
      state.set("functions", funcs)
  },
  initialState
);
