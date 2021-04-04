/**
 * 日期格式化工具
 * @param {String} fmt 时间格式
 */
export function dateFormat (fmt,thisdate) {
  var chweeks = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  var enweeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  var o = {
    'M+': thisdate.getMonth() + 1, // 月份
    'd+': thisdate.getDate(), // 日
    'D+': thisdate.getDate(), // 日
    'h+': thisdate.getHours(), // 24小时
    'H+': thisdate.getHours() > 12 ? thisdate.getHours() - 12 : thisdate.getHours(), // 12小时
    'm+': thisdate.getMinutes(), // 分
    's+': thisdate.getSeconds(), // 秒
    'q+': Math.floor((thisdate.getMonth() + 3) / 3), // 季度
    Q: '第' + Math.floor((thisdate.getMonth() + 3) / 3) + '季度', // 季度
    S: thisdate.getMilliseconds(), // 毫秒
    E: chweeks[thisdate.getDay()], // 中文星期
    e: enweeks[thisdate.getDay()], // 英文星期
    n: thisdate.getHours() > 12 ? 'AM' : 'PM', // 上午下午搭配HH使用
    N: thisdate.getHours() > 12 ? '上午' : '下午' // 上午下午搭配HH使用
  };
  if (/([y,Y]+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (thisdate.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};
