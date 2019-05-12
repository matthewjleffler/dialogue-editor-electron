// Redux Actions

// Entry Actions
export const ACTION_ENTRY_SET_ACTIVE          = 'ACTION_ENTRY_SET_ACTIVE';
export const ACTION_ENTRY_SET_REGION          = 'ACTION_ENTRY_SET_REGION';
export const ACTION_ENTRY_SET_REGION_LIST     = 'ACTION_ENTRY_SET_REGION_LIST';
export const ACTION_ENTRY_SET_TYPE            = 'ACTION_ENTRY_SET_TYPE';
export const ACTION_ENTRY_SET_COLOR           = 'ACTION_ENTRY_SET_COLOR';

// Tree actions
export const ACTION_TREE_MODIFY               = 'ACTION_TREE_MODIFY';
export const ACTION_TREE_SET_ACTIVE           = 'ACTION_TREE_SET_ACTIVE';

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
export function getRegionFromEntry(entry, region) {
  const entries = getArrayProperty(entry.region);
  if (entries === null) {
    return null;
  }
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry._attributes.id === region) {
      return entry;
    }
  }
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
