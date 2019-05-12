
export const modifyTreeAction = (tree) => dispatch => {
  dispatch({
    type: 'MODIFY_TREE',
    payload: tree,
  });
}

export const setTreeActiveAction = (active) => dispatch => {
  dispatch({
    type: 'SET_ACTIVE',
    payload: active,
  });
}
