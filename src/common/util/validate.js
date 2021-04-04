/**
 * 数据验证
 */

/* 是否外链 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 用户名验证 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
/* 手机号 */
export function validTel(str) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(str)
}
/* 小写字母 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 表单输入框正则校
 * item 原属性
 * return 校验结果
 */
function checkItemByReg(item) {
  let result = {
    code: '0',
    resVal: '',
    msg: '校验通过'
  };

  if (item.checkModel === '0') {
    if (item.checkExpr) {
      // 进行正则校验
      const checkVal = item.propValue;
      if (checkVal && checkVal !== '') {
        const checkExpr = item.checkExpr;
        if (checkVal.match(checkExpr)) {
          const matchVal = checkVal.match(checkExpr)[0];
          if (checkVal.length !== matchVal.length) {
            result = {
              code: '1',
              resVal: matchVal,
              msg: item.propCnName + ':' + item.exrpRespMsg
            }
            item.propValue = '';
          }
        } else {
          result = {
            code: '1',
            resVal: '',
            msg: item.propCnName + ':' + item.exrpRespMsg
          }
          item.defaultValue = '';
        }
      }
    }
  }
  return result;
}

export default {
  checkItemByReg
}
