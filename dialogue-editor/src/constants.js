// Redux Actions

// Entry Actions
export const ACTION_ENTRY_SET_ACTIVE          = 'ACTION_ENTRY_SET_ACTIVE';
export const ACTION_ENTRY_SET_REGION          = 'ACTION_ENTRY_SET_REGION';
export const ACTION_ENTRY_SET_REGION_LIST     = 'ACTION_ENTRY_SET_REGION_LIST';
export const ACTION_ENTRY_SET_TYPE            = 'ACTION_ENTRY_SET_TYPE';
export const ACTION_ENTRY_SET_COLOR           = 'ACTION_ENTRY_SET_COLOR';
export const ACTION_ENTRY_RERENDER            = 'ACTION_ENTRY_RERENDER';

// Tree actions
export const ACTION_TREE_SET_ACTIVE           = 'ACTION_TREE_SET_ACTIVE';
export const ACTION_TREE_SET_INPUT_TYPE       = 'ACTION_TREE_SET_INPUT_TYPE';
export const ACTION_TREE_SET_INPUT_STRING     = 'ACTION_TREE_SET_INPUT_STRING';

// TODO doc
function enumToString(enumobject, value) {
  for (let k in enumobject) {
    if (enumobject[k] === value) {
      return k;
    }
  }
  return null;
}

// TODO doc
export const ENTRY_TYPE = {
  NONE:       "Default",
  DIARY:      "Diary",
};

// TODO doc
export function entryTypeToString(value) {
  return enumToString(ENTRY_TYPE, value);
}

// TODO doc
export const HIGLIGHT_COLOR = {
  DEFAULT:    "transparent",
  RED:        '#ff8080',
  GREEN:      '#63ff53',
  BLUE:       '#8d9dff',
  YELLOW:     '#fff94e',
  ORANGE:     '#ff954e',
  BROWN:      '#c98151',
};

// TODO doc
export function highlightColorToString(value) {
  return enumToString(HIGLIGHT_COLOR, value);
}

// TODO doc
export const INPUT_TYPE = {
  NONE:           'NONE',
  GROUP_NAME:     'GROUP_NAME',
  ENTRY_NAME:     'ENTRY_NAME',
  RENAME_ENTRY:   'RENAME_ENTRY',
  RENAME_GROUP:   'RENAME_GROUP',
  READ_TEXT:      'READ_TEXT',
};

// TODO doc
export function inputTypeToString(value) {
  return enumToString(INPUT_TYPE, value);
}

// TODO doc
export function getRegionFromEntry(entry, regionId) {
  if (!entry) {
    return null;
  }
  const regionList = entry.region;
  if (regionList === null) {
    return null;
  }
  for (let i = 0; i < regionList.length; i++) {
    const region = regionList[i];
    if (region.id === regionId) {
      return region;
    }
  }
  return null;
}

// TODO doc
export function getArrayProperty(property) {
  if (property === undefined) {
    return null;
  }
  if (Array.isArray(property)) {
    return property;
  }
  return [property];
}

// TODO doc
export function arrayRemove(array, value) {
  if (!array || array.length < 1) {
    return;
  }
  let index;
  while ((index = array.indexOf(value)) > -1) {
    array.splice(index, 1);
  }
}
