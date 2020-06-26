import Taro from '@tarojs/taro';

export const toolbox = { name: '123' };
export const toolbox2 = { name: '123' };

//去某个页面
export const goToPage = url => {
  Taro.navigateTo({ url });
};

export const numberOrDecimal = value => {
  const patternDecimal = /^\d+\.\d+$/;
  const patternNumber = /^\d{1,}$/;
  if (patternDecimal.test(value) || patternNumber.test(value)) {
    return Number(value).toFixed(2);
  } else {
    return false;
  }
};
