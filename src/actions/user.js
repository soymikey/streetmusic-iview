import {
  ADD,
  MINUS,
  SETUSERINFO,
  LOGOUT,
  SETWSSTATE,
} from '../constants/counter'

export const setUserInfo = (data) => {
  return {
    type: SETUSERINFO,
    payload: data
  }
}
export const setWSState = (data) => {
  return {
    type: SETWSSTATE,
    payload: data
  }
}
export const logout = () => {
  return {
    type: LOGOUT,

  }
}
