import { SETUSERINFO } from '../constants/user'

// { value: '1', label: '接单中' },
// { value: '2', label: '休息中' },
// { value: '0', label: '下线' },
const INITIAL_STATE = {
  DOB: '',
  address: '',
  avatar: '',
  city: '',
  cityCode: '',
  collectionCount: '',
  country: '',
  eventCount: '',
  followCount: '',
  gender: '',
  id: '',
  introduction: '',
  language: '',
  lastLogin: '',
  lastOffline: '',
  lastOnline: '',
  lastPause: '',
  nickName: '',
  phone: '',
  province: '',
  provinceCode: '',
  realName: '',
  referenceCode: '',
  region: '',
  regionCode: '',
  registerArtistDate: '',
  registerDate: '',
  residentId: '',
  role: '',
  state: '',
  token: '',
  views: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETUSERINFO:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
