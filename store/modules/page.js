import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { PAGE_NAME } from "../../constants";

// 액션 타입 정의, 액션 생성 함수 생성
const SET_PAGE_NAME = "SET_PAGE_NAME";
export const setPageName = createAction(SET_PAGE_NAME);

// 모듈의 초기상태를 정의합니다.
const initialState = Map({
  pageName: PAGE_NAME.babySelection
});

export default handleActions(
  {
    [SET_PAGE_NAME]: (state, { payload: pageName }) => {
      return state.set("pageName", pageName);
    }
  },
  initialState
);
