import {
  ADD,
  MINUS,
  SETUSERINFO,
  LOGOUT,
} from '../constants/counter'

export const setUserInfo = (data) => {
  return {
    type: SETUSERINFO,
    payload: data
  }
}
export const logout = () => {
  return {
    type: LOGOUT,

  }
}
