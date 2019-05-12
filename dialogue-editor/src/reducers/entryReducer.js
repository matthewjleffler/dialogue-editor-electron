import * as constants from '../constants';

const initialState = {
  entry: null,
  region: '',
  region_list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_SET_ACTIVE_ENTRY:
      return {
        ...state,
        entry: action.payload,
      };
    case constants.ACTION_SET_ACTIVE_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case constants.ACTION_SET_AVAILABLE_REGIONS:
      return {
        ...state,
        region_list: action.payload,
      };
    default:
      return state;
  }
}
