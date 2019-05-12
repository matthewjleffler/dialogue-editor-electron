
const initialState = {
  tree: { module: "Content" },
  active: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MODIFY_TREE':
      return {
        ...state,
        tree: action.payload,
      };
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}
