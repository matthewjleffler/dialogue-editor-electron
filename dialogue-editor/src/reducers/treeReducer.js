
const initialState = {
  tree: { module: "Content Test", children:[ { module: "test" }, { module: "test2" } ] }
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
