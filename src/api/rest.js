import { request } from '@/base/utils/request';
import { api } from '@/base/config/api';
import { _tiper } from '@/base/utils/ui';

export function dictQuery(dictObj, cbEvent) {
  request.postJson(api.dictQuery, dictObj).then(res => {
    if (res.code == '0') {
      cbEvent(res.data);
    } else {
      _tiper.error(res.msg);
    }
  }).catch(err => {
    _tiper.error('查询码表信息过程出现异常。');
  });
}
