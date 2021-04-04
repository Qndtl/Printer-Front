const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = (userData) => {
  return {
    type: LOGIN,
    userData,
    isLoggedIn: true
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    userData: {},
    isLoggedIn: false
  }
}
