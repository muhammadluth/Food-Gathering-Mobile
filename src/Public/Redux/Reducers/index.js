import {combineReducers} from 'redux';

import menuList from './Menu';
import addCart from './Cart';

const rootReducer = combineReducers({
  menuList,
  addCart,
});

export default rootReducer;
