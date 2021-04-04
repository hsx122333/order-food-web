import { Toast, Notify, Dialog } from 'vant';

/**
 * 消息提示工厂
 * @param {*} msg 消息
 * @param {*} flag 标志
 * @param {*} pos 位置 top/bottom/middle
 */
export function msgFactory(msg, flag, pos) {
  // top/bottom/middle
  if (flag != 0 && !flag) {
    flag = 99;
  }
  if (pos != 0 && !pos) {
    pos = 99;
  }
  switch (pos) {
    case 0:
      pos = 'top';
      break;
    case 1:
      pos = 'middle';
      break;
    case 2:
      pos = 'bottom';
      break;
    default:
      pos = 'bottom';
  }
  switch (flag) {
    case 0:
      flag = 'success';
      break;
    case 1:
      flag = 'warning';
      break;
    case 2:
      flag = 'primary';
      break;
    case 3:
      flag = 'danger';
      break;
    default:
      flag = 'primary';
  }

  Notify({
    position: pos,
    type: flag,
    message: msg,
    duration: flag == 'danger' ? 4000 : 2000
  });
}

/**
 * 消息提示封装 接口
 */
export const _tiper = {
  error: function(msg, pos) {
    msgFactory(msg, 3, pos);
  },
  warn: function(msg, pos) {
    msgFactory(msg, 1, pos);
  },
  info: function(msg, pos) {
    msgFactory(msg, 2, pos);
  },
  success: function(msg, pos) {
    msgFactory(msg, 0, pos);
  },

  load: function(msg, el) {
    return LOAD(el, msg);
  },
  confirm: function(msg, cbEvent, title) {
    confirmFactory(msg, cbEvent, title);
  }
};

/**
 * 消息提示加载框
 * @param {*} msg 消息
 * @param {*} el 元素
 */
export function LOAD(msg, el) {
  const toast = Toast.loading({
    duration: 120000, // 持续展示 toast 2分钟自动关闭
    forbidClick: true,
    message: msg || '加载中...'
  });

  const LOAD = {
    close: function() {
      toast.clear();
    }
  };

  return LOAD;
}

export function confirmFactory(msg, cbEvent, title) {
  Dialog.confirm({
    title: title || '确认信息',
    message: msg
  })
    .then(() => {
      cbEvent();
    })
    .catch(action => {
      cbEvent(action);
    });
}

/**
 * 动态加载iframe，解决ie问题
 * @param {Object} targetEl vue属性
 * @param {String} url 目标链接
 */
export function loadFrame(url) {
  const newIframeObject = document.createElement('IFRAME');
  newIframeObject.src = url;
  newIframeObject.scrolling = 'yes';
  newIframeObject.frameBorder = 0;
  newIframeObject.width = '100%';
  newIframeObject.height = '900px';
  return newIframeObject.outerHTML;
}
