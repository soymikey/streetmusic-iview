import {
  SETUSERINFO,
  RESETUSERINFO,
} from '../constants/user'
import { set } from '@/utils/localStorage';

export const setUserInfo = (data) => {
  set('userInfo', data)
  return {
    type: SETUSERINFO,
    data
  }
}
export const resetUserInfo = (data) => {
  set('userInfo', {})
  return {
    type: RESETUSERINFO,
    data
  }
}
// export const minus = () => {
//   return {
//     type: MINUS
//   }
// }

// // 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
