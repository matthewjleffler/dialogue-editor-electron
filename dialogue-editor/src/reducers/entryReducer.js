
const initialState = {
  entry: null,
  pages: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
   case 'SET_ENTRY':
    return {
      entry: action.payload,
      ...state,
    }
   default:
    return state
  }
}
