
const initialState = {
  entry: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ENTRY':
      return {
        ...state,
        entry: action.payload,
      }
    default:
      return state
  }
}
