
const initialState = {
  tree: { module: "Content" }
};

export default (state = initialState, action) => {
  switch (action.type) {
   case 'MODIFY_TREE':
    return {
      result: action.payload
    }
   default:
    return state
  }
}
