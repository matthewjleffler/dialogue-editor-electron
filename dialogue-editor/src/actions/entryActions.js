
export const setActiveEntryAction = (entry) => dispatch => {
  dispatch({
    type: 'SET_ACTIVE_ENTRY',
    payload: entry,
  });
}
