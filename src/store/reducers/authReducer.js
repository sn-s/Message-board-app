const initState = []

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_CHECK":
      return {
        ...state,
        isUserSignedIn: action.payload
      }
    case "GET_AUTH":
      return {
        ...state,
        userData: action.payload
      }
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        signedUpData: action.payload,
        initials: action.initials
      }
    case "SIGNUP_ERROR":
      return {
        ...state,
        signUpError: action.err.message
      }
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        signedInData: action.payload,
        initials: action.initials
      }
    case "SIGNIN_ERROR":
      return {
        ...state,
        signInError: action.err.message
      }
    case "SIGNOUT_SUCCESS":
      return {
        ...state,
        signOutMessage: action.payload
      }
    case "EMAIL_ERROR":
      return {
        ...state,
        emailError: action.err.message
      }
    case "PASSWORD_ERROR":
      return {
        ...state,
        passwordError: action.err.message
      }
    default:
      return state;
  }
}

export default authReducer;