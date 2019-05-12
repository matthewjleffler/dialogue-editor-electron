
export const ACTION_SET_ACTIVE_ENTRY = 'ACTION_SET_ACTIVE_ENTRY';
export const ACTION_MODIFY_TREE = 'ACTION_MODIFY_TREE';
export const ACTION_SET_ACTIVE_TREE_NODE = 'ACTION_SET_ACTIVE_TREE_NODE';
export const ACTION_SET_ACTIVE_REGION = 'ACTION_SET_ACTIVE_REGION';
export const ACTION_SET_AVAILABLE_REGIONS = 'ACTION_SET_AVAILABLE_REGIONS';

function enumToString(enumobject, value) {
  for (let k in enumobject) {
    if (enumobject[k] === value) {
      return k;
    }
  }
  return null;
}

export const ENTRY_TYPE = {
  NONE:       "Default",
  DIARY:      "Diary",
};

export function entryTypeToString(value) {
  return enumToString(ENTRY_TYPE, value);
}

export const HIGLIGHT_COLOR = {
  DEFAULT:    "transparent",
  RED:        '#ff8080',
  GREEN:      '#63ff53',
  BLUE:       '#8d9dff',
  YELLOW:     '#fff94e',
  ORANGE:     '#ff954e',
  BROWN:      '#c98151',
};

export function highlightColorToString(value) {
  return enumToString(HIGLIGHT_COLOR, value);
}