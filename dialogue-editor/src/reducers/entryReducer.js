import * as constants from '../constants';

const initialState = {
  entry: null,
  region: 'en',
  regionList: ['en'],
  type: '',
  color: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_ENTRY_SET_ACTIVE:
      return {
        ...state,
        entry: action.payload,
        type: action.payload._attributes.type,
        color: action.payload._attributes.color,
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
    case constants.ACTION_ENTRY_SET_TYPE:
      if (state.entry === null) {
        // No entry to change
        return state;
      }
      return {
        ...state,
        type: action.payload,
      };
    case constants.ACTION_ENTRY_SET_COLOR:
      if (state.entry === null) {
        // No entry to change
        return state;
      }
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
}