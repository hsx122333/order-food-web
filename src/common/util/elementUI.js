import { Loading, Message, MessageBox } from 'element-ui';
var elementUI = {
  /*
        消息提示
        type: success/warning/info/error
        msg: 提示信息
    */
  openMsg(type, msg) {
    if ($('.el-message').length == 0) {
      Message({
        showClose: true,
        message: msg,
        type: type,
        // 显示时间
        duration: 5000,
        // 解析为html代码
        dangerouslyUseHTMLString: true
      });
    }
  },

  /*
        加载遮罩层
        target: 可传入一个 DOM 对象或字符串
                若传入字符串 则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
        return: 会返回一个Loading Object 请在data中定义一个属性接收该对象
                需要关闭时调用close()方法取消加载遮罩层
    */
  openLoading(target) {
    if (target != 'full') {
      return Loading.service({
        target: target,
        text: '加载中'
      });
    } else {
      return Loading.service({
        text: '加载中'
      });
    }
  },

  /**
     *
     * @param {String} title 标题
     * @param {String} info 内容
     * @param {Object} func 关闭后执行的函数
     * @param {Number} delay 延时关闭(ms)
     */
  autoCloseMsgbox(title, info, func, delay) {
    MessageBox.confirm(info, title, {
      confirmButtonText: '确认',
      type: 'success',
      showClose: false,
      showCancelButton: false,
      showConfirmButton: false,
      closeOnClickModal: false
    }).catch(() => {
      func();
    });
    if (HTMLElement && !HTMLElement.prototype.pressKey) {
      HTMLElement.prototype.pressKey = function(code) {
        var evt = document.createEvent('UIEvents');
        evt.keyCode = code;
        evt.initEvent('keydown', true, true);
        this.dispatchEvent(evt);
      };
    }
    setTimeout(() => {
      document.body.pressKey(27);
    }, delay);
  }

}

export default elementUI;
