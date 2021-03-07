import {
  SETUSERINFO
} from '../constants/user'

export const setUserInfo = (data) => {
  return {
    type: SETUSERINFO,
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
