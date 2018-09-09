import { bindActionCreators } from "redux";
import * as babyActions from "./modules/baby";

import store from "./index";

const { dispatch } = store;

export const BabyActions = bindActionCreators(babyActions, dispatch);
