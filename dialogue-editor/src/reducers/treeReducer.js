import * as constants from '../constants';

const initialState = {
  active: null,
  inputType: constants.INPUT_TYPE.NONE,
  inputString: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_TREE_SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case constants.ACTION_TREE_SET_INPUT_TYPE:
      return {
        ...state,
        inputType: action.payload,
      };
    case constants.ACTION_TREE_SET_INPUT_STRING:
      return {
        ...state,
        inputString: action.payload,
      };
    default:
      return state;
  }
}
