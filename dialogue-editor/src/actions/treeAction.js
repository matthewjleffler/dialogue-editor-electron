import * as constants from '../constants';

export const modifyTreeAction = (tree) => dispatch => {
  dispatch({
    type: constants.ACTION_MODIFY_TREE,
    payload: tree,
  });
}

export const setTreeActiveAction = (active) => dispatch => {
  dispatch({
    type: constants.ACTION_SET_ACTIVE_TREE_NODE,
    payload: active,
  });
}
