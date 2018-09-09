import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { PAGE_NAME } from "../../constants";

// 액션 타입을 정의해줍니다.
const SET_BABY = "SET_BABY";
const SET_PAGENAME = "SET_PAGENAME";

// 액션 생성 함수를 만듭니다.
export const setBaby = createAction(SET_BABY);
export const setPageName = createAction(SET_PAGENAME);

// 모듈의 초기상태를 정의합니다.
const initialState = Map({
  baby: {},
  pageName: PAGE_NAME.babySelection
});

export default handleActions(
  {
    [SET_BABY]: (state, { payload: object }) => state.set("baby", object),
    [SET_PAGENAME]: (state, { payload: string }) =>
      state.set("pageName", string)
  },
  initialState
);
