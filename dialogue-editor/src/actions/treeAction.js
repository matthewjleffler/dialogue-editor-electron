
export const modifyTreeAction = (tree) => dispatch => {
  dispatch({
    type: 'MODIFY_TREE',
    payload: tree,
  });
}
