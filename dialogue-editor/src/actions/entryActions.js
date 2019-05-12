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
