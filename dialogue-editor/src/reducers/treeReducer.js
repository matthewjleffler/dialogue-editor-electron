import * as constants from '../constants';

const initialState = {
  active: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_TREE_SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}
