import * as constants from '../constants';

export const actionTreeSetActive = (active) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_ACTIVE,
    payload: active,
  });
}

export const actionTreeSetInputType = (type) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_INPUT_TYPE,
    payload: type,
  });
}

export const actionTreeSetInputString = (value) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_INPUT_STRING,
    payload: value,
  });
}

export const actionTreeSetInputInit = (value) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_INPUT_INIT,
    payload: value,
  });
}

export const actionTreeSetFilterId = (value) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_FILTER_ID,
    payload: value,
  });
}

export const actionTreeSetFilterText = (value) => dispatch => {
  dispatch({
    type: constants.ACTION_TREE_SET_FILTER_TEXT,
    payload: value,
  });
}
