const initState = {
  user: {},
  isLoggedIn: false
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.userData,
        isLoggedIn: action.isLoggedIn
      }
    case "LOGOUT":
      return {
        ...state,
        user: action.userData,
        isLoggedIn: action.isLoggedIn
      }
    default:
      return state;
  }
}

export default userReducer;