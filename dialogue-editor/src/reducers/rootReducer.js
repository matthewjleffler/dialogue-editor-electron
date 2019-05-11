import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import entryReducer from './entryReducer';

export default combineReducers({
  treeReducer,
  entryReducer,
});
