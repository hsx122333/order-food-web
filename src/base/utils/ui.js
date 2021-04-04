import { Notification, Loading, MessageBox } from 'element-ui';

// element-ui/Message-消息提示封装
export function msgFactory(msg, flag, pos) {
  // top-right/top-left/bottom-right/bottom-left
  if (flag != 0 && !flag) {
    flag = 99;
  }
  if (pos != 0 && !pos) {
    pos = 99;
  }
  switch (pos) {
    case 0:
      pos = 'top-right';
      break;
    case 1:
      pos = 'top-left';
      break;
    case 2:
      pos = 'bottom-right';
      break;
    case 3:
      pos = 'bottom-left';
      break;
    default:
      pos = 'bottom-right';
  }
  switch (flag) {
    case 0:
      flag = 'success';
      break;
    case 1:
      flag = 'warning';
      break;
    case 2:
      flag = 'info';
      break;
    case 3:
      flag = 'error';
      break;
    default:
      flag = 'info';
  }

  Notification({
    duration: flag == 'error' ? 5000 : 3000,
    message: msg,
    type: flag,
    position: pos,
    offset: 80
  });
}

// element-ui/Message-消息提示封装
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
  },
  box: function(msg, cbEvent, title) {
    MessageBox.alert(msg, title || '信息', {
      showClose: false,
      confirmButtonText: '确定',
      callback: action => {
        cbEvent(action);
      }
    });
  }
};

// element-ui/load-加载提示封装
export function LOAD(msg, el) {
  const LOAD = Loading.service({
    target: el || document.body,
    lock: true,
    text: msg || '加载中...'
  });

  setTimeout(() => {
    // 3分钟延时自动关闭
    LOAD.close();
  }, 180000);

  return LOAD;
}

// element-ui/MessageBox-加载提示封装
export function confirmFactory(msg, cbEvent, title) {
  MessageBox.confirm(msg, title || '确认信息', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      cbEvent();
    })
    .catch((action) => {
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
