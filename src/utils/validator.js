/**
使用姿势 调用validate函数 接收数组对象为参数
对象内 必须
value：被验证的值
rules:是一个数组可以有一个或者多个验证规则对象,对象内必须有指定的rule(验证方法)和可选的msg(验证失败消息)
type: 验证规则的参数(可选)

          [{
              value: '1234',
              rules: [{
                  rule: 'required',
                  msg: '关键词不能为空'
              }]
          }]
*/
const strategies = {
  required: function (val, errMsg) {
    if (val === '') {
      return errMsg || '必填项不能为空'
    }
  },
  arrLength: function (val, errMsg) {
    if (!val.length) {
      return errMsg || '数组长度不能为空'
    }
  },
  isFixedLength: function (val, len, errMsg) {
    if (val.length !== len) {
      return errMsg || `不能超过${len}位数`
    }
  },

  greater: function (val, len, errMsg) {
    if (val.length < len) {
      return errMsg || `不能小于${len}位数`
    }
  },
  is24Hours: function (val, errMsg) {
    // 24小时制时间（HH:mm:ss）
    const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
    if (!pattern.test(val)) {
      return errMsg || '时间格式为24小时制时间（HH:mm:ss）'
    }
  },
  is12Hours: function (val, errMsg) {
    // 12小时制时间（HH:mm:ss）
    const pattern = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/
    if (!pattern.test(val)) {
      return errMsg || '时间格式为12小时制时间（HH:mm:ss）'
    }
  },
  isBase64: function (val, errMsg) {
    // base64格式
    const pattern = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i
    if (!pattern.test(val)) {
      return errMsg || '图片格式只支持base64格式'
    }
  },
  isCurrency: function (val, errMsg) {
    // 数字/货币金额（支持负数、千分位分隔符）
    const pattern = /^-?\d+(,\d{3})*(\.\d{1,2})?$/
    if (!pattern.test(val)) {
      return errMsg || '格式只支持数字/货币金额（支持负数、千分位分隔符）'
    }
  },
  isMobile: function (val, errMsg) {
    // 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
    const pattern = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/

    if (!pattern.test(val)) {
      return errMsg || '请输入合法手机格式'
    }
  },
  isLandline: function (val, errMsg) {
    // 座机(tel phone)电话(国内),如: 0341-86091234
    const pattern = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/
    if (!pattern.test(val)) {
      return errMsg || '请输入合法座机格式'
    }
  },
  isDate: function (val, errMsg) {
    // date(日期)
    const pattern = /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/
    if (!pattern(val)) {
      return errMsg || '请输入正确的时间格式'
    }
  },
  isEmail: function (val, errMsg) {
    // 邮箱
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!pattern.test(val)) {
      return errMsg || '请输入正确的时间格式'
    }
  },
  isIdentityNumber: function (val, errMsg) {
    // 身份证号, 支持1/2代(15位/18位数字)
    const pattern = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

    if (!pattern.test(val)) {
      return errMsg || '请输入合法的身份证号码'
    }
  },
  isDecimal: function (val, errMsg) {
    // 小数
    const pattern = /^\d+\.\d+$/
    if (!pattern.test(val)) {
      return errMsg || '只支持小数'
    }
  },
  isNumber: function (val, errMsg) {
    // 数字
    const pattern = /^\d{1,}$/
    if (!pattern.test(val)) {
      return errMsg || '只支持数字'
    }
  },
  isAlphanumeric: function (val, errMsg) {
    // 数字和字母组成
    const pattern = /^[A-Za-z0-9]+$/
    if (!pattern.test(val)) {
      return errMsg || '只支持数字和字母组成'
    }
  },
  isAlphabet: function (val, errMsg) {
    // 英文字母
    const pattern = /^[a-zA-Z]+$/
    if (!pattern.test(val)) {
      return errMsg || '只支持字母'
    }
  },
  isPassword: function (val, errMsg) {
    // 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    const pattern = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    if (!pattern.test(val)) {
      return errMsg || '密码强度校验 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
    }
  },
  isUserName: function (val, errMsg) {
    // 用户名校验，4到16位（字母，数字，下划线，减号）
    const pattern = /^[a-zA-Z0-9_-]{4,16}$/
    if (!pattern.test(val)) {
      return errMsg || '用户名校验，4到16位（字母，数字，下划线，减号）'
    }
  },
  isPrice: function (val, errMsg) {
    // 任意非0的正整数，正小数（小数位不超过2位）
    const pattern = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
    if (!pattern.test(val)) {
      return errMsg || '金额格式错误'
    }
  },
  isPriceWith0: function (val, errMsg) {
    // 可以是0的正整数，正小数（小数位不超过2位）
    const pattern = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    if (!pattern.test(val)) {
      return errMsg || '金额格式错误'
    }
  }

}

const validator = function (arr) {
  let obj = {
    status: true
  }
  for (let i = 0, l1 = arr.length; i < l1; i++) {
    let item = arr[i]
    let stop = false
    for (let k = 0, l2 = item.rules.length; k < l2; k++) {
      let r = item.rules[k]
      let arg = r.rule.split(':')
      let rule = arg.shift()

      if (r.type) {
        arg.unshift(r.type)
      }
      arg.unshift(item.value)
      arg.push(r.msg)
      // debugger
      let status = strategies[rule].apply(null, arg)
      if (status) {
        obj = {
          value: item.value,
          status: false,
          msg: status
        }
        stop = true
        break
      }
    }
    if (stop) break
  }
  return obj
}


export default validator;
