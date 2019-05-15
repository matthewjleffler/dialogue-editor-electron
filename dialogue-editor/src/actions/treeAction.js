import * as constants from '../constants';

export const actionTreeSetActive = (active) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_ACTIVE,
    payload: active,
  });
}
