const initState = [];

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return {
        ...state,
        getMessages: action.payload
      }
    case "CREATE_MESSAGE":
      return {
        ...state,
        message: action.message
      }
    case "DELETE_MESSAGE":
      return {
        ...state,
      }
    case "ADD_COMMENT":
      return {
        ...state,
      }
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload
      }
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload
      }
    default:
      return state;
  }
}

export default messageReducer;