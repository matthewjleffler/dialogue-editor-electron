import * as constants from '../constants';

export const actionEntrySetActive = (entry) => dispatch => {
  dispatch({
    type: constants.ACTION_ENTRY_SET_ACTIVE,
    payload: entry,
  });
}

export const actionEntrySetRegion = (region) => dispatch => {
  dispatch({
    type: constants.ACTION_ENTRY_SET_REGION,
    payload: region,
  });
}

export const actionEntrySetRegionList = (regions) => dispatch => {
  dispatch({
    type: constants.ACTION_ENTRY_SET_REGION_LIST,
    payload: regions,
  });
}

export const actionEntrySetType = (type) => dispatch => {
  dispatch({
    type: constants.ACTION_ENTRY_SET_TYPE,
    payload: type,
  });
}

export const actionEntrySetColor = (color) => dispatch => {
  dispatch({
    type: constants.ACTION_ENTRY_SET_COLOR,
    payload: color,
  });
}
