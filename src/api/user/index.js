import { request } from '@/utils/request';

export const getUserInfo = (url, params, method) => {
  return request(url, params, method);
};
