import axios from 'axios';
import { _tiper, LOAD } from '@/base/utils/ui';

/**
 * js获取url参数值
 * @param {String} name 关键词
 */
export function getUrlParams(name) {
  // 不传name返回所有值，否则返回对应值
  var url = window.location.href;
  if (url.indexOf('?') == 1) {
    return false;
  }
  url = url.split('?')[1];
  url = url.split('&');
  var name = name || '';
  var nameres;
  var tempobj = {};
  // 获取全部参数及其值
  for (var i = 0; i < url.length; i++) {
    var info = url[i].split('=');
    tempobj[info[0]] = decodeURI(info[1]);
  }
  // 如果传入一个参数名称，就匹配其值
  if (name) {
    for (var i = 0; i < url.length; i++) {
      for (const key in url[i]) {
        if (key == name) {
          nameres = url[i][key];
        }
      }
    }
  } else {
    nameres = tempobj;
  }
  // 返回结果
  return nameres;
}
/**
 * 判断客户端环境
 */
export function clientCheck() {
  const inBrowser = typeof window !== 'undefined';
  const UA = inBrowser && window.navigator.userAgent.toLowerCase();
  const CLIENT_VAR = new Object({
    inBrowser: typeof window !== 'undefined',
    UA: inBrowser && window.navigator.userAgent.toLowerCase(),
    isIE: UA && /msie|trident/.test(UA),
    isIE9: UA && UA.indexOf('msie 9.0') > 0,
    isEdge: UA && UA.indexOf('edge/') > 0,
    isAndroid: UA && UA.indexOf('android') > 0,
    isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),
    isChrome: UA && UA.indexOf('chrome') > 0
  });
  return CLIENT_VAR;
}
/**
 * 四舍五入保留num位小数
 * @param v
 * @param num 保留位数
 * @param isZeroFill 默认补0；false-不补
 * @returns {*}
 */
export function toDecimal(v, num, isZeroFill) {
  var f = parseFloat(v);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(v * Math.pow(10, num)) / Math.pow(10, num);
  var s = f.toString();
  if (isZeroFill !== false) {
    var rs = s.indexOf('.');
    if (num > 0 && rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + num) {
      s += '0';
    }
  }
  return s;
}
// 日期类工具-字符串到日期
export function string2Date(str, format) {
  var date = new Date();
  if (format == 'yyyyMM') {
    date = new Date(str.substring(0, 4), parseInt(str.substring(4, 6), 10) - 1);
  }
  if (format == 'yyyy-MM') {
    date = new Date(str.substring(0, 4), parseInt(str.substring(5, 7), 10) - 1);
  }
  if (format == 'yyyyMMdd') {
    date = new Date(
      str.substring(0, 4),
      parseInt(str.substring(4, 6), 10) - 1,
      parseInt(str.substring(6, 8), 10)
    );
  }
  return date;
}
/**
 * axios post 下载附件
 * @param {Object} param [请求参数]
 * @param {String} url [下载链接]
 */
export function postDownload(param, url) {
  const opInfo = {
    ip: '127.0.0.1',
    op_time: '2020-07-08 14:49:39'
  };
  const postParam = { body: param, opInfo: opInfo };
  const loader = LOAD();
  axios
    .post(url, postParam, {
      emulateJSON: false,
      responseType: 'blob' // 响应数据格式blob
    })
    .then(
      function(res) {
        loader.close();
        const blob = res.data;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          const a = document.createElement('a');
          const fileName = res.headers['content-disposition'].split('attachment;filename=')[1];
          a.download = decodeURI(fileName);
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      },
      function(res) {
        loader.close();
        _tiper.error('下载失败');
        console.log(res.status);
      }
    );
}

