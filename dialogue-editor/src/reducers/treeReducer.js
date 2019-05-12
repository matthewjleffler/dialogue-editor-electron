import * as constants from '../constants';

const initialState = {
  tree: { module: "Content" },
  active: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_MODIFY_TREE:
      return {
        ...state,
        tree: action.payload,
      };
    case constants.ACTION_SET_ACTIVE_TREE_NODE:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}
