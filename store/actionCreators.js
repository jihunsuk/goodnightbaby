import { bindActionCreators } from 'redux';
import * as pageActions from './modules/page';

import store from './index';

const { dispatch } = store;

export const PageActions = bindActionCreators(pageActions, dispatch);