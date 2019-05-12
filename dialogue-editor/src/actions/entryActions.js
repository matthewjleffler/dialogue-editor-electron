import * as constants from '../constants';

export const setActiveEntryAction = (entry) => dispatch => {
  dispatch({
    type: constants.ACTION_SET_ACTIVE_ENTRY,
    payload: entry,
  });
}

export const setActiveEntryRegionAction = (region) => dispatch => {
  dispatch({
    type: constants.ACTION_SET_ACTIVE_REGION,
    payload: region,
  });
}

export const setAvailableRegionAction = (regions) => dispatch => {
  dispatch({
    type: constants.ACTION_SET_AVAILABLE_REGIONS,
    payload: regions,
  });
}
