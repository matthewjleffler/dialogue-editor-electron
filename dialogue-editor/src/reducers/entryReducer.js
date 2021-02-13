import * as constants from '../constants';

const initialState = {
  entry: null,
  region: 'en',
  regionList: ['en'],
  type: '',
  color: '',
  reRenderIndex: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_ENTRY_SET_ACTIVE:
      if (action.payload === null) {
        return {
          ...state,
          entry: null,
          type: '',
          color: '',
        };
      }
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
    case constants.ACTION_ENTRY_RERENDER:
      return {
        ...state,
        reRenderIndex: state.reRenderIndex + action.payload,
      };
    default:
      return state;
  }
}
