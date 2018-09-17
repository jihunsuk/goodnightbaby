import { bindActionCreators } from "redux";
import * as babyActions from "./modules/baby";
import * as bluetoothActions from "./modules/bluetooth";

import store from "./index";

const { dispatch } = store;

export const BabyActions = bindActionCreators(babyActions, dispatch);
export const BluetoothActions = bindActionCreators(bluetoothActions, dispatch);
