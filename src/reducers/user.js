import { ADD, MINUS, SETUSERINFO, LOGOUT } from '../constants/counter'
import Taro from '@tarojs/taro'
import { remove } from '@/utils/localStorage';

const INITIAL_STATE = {
  id: '',
  role: '',//role是1 就是普通用户， 2注册的艺人
  nickName: '',
  realName: '',
  gender: '',
  country: '',
  province: '',
  city: '',
  region: '',
  avatar: '',
  address: '',
  registerDate: '',
  lastLogin: '',
  registerArtist: '',
  language: '',
  introduction: '',
  state: '',
  collectionCount: 0,
  followCount: 0,
  eventCount: 0,

}


export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {

    case SETUSERINFO:
      return {
        ...state,
        ...action.payload
      }

    case LOGOUT:
      remove('token')
      Taro.showToast({ title: '退出成功', icon: 'none' })
      return {
        id: '',
        role: '',//role是1 就是普通用户， 2注册的艺人
        nickName: '',
        realName: '',
        gender: '',
        country: '',
        province: '',
        city: '',
        region: '',
        avatar: '',
        address: '',
        registerDate: '',
        lastLogin: '',
        registerArtist: '',
        language: '',
        introduction: '',
        state: '',
        collectionCount: 0,
        followCount: 0,
        eventCount: 0,
      }



    default:
      return state
  }
}
