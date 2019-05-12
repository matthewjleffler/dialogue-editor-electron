import * as constants from '../constants';

const initialState = {
  entry: null,
  region: 'en',
  regionList: ['en'],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_ENTRY_SET_ACTIVE:
      return {
        ...state,
        entry: action.payload,
      };
    case constants.ACTION_ENTRY_SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case constants.ACTION_ENTRY_SET_REGION_LIST:
      return {
        ...state,
        regionList: action.payload,
      };
    default:
      return state;
  }
}
