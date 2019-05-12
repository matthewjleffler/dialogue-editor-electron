import * as constants from '../constants';

export const actionTreeModify = (tree) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_MODIFY,
    payload: tree,
  });
}

export const actionTreeSetActive = (active) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_ACTIVE,
    payload: active,
  });
}
