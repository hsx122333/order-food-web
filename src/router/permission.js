import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });

// 删除permission逻辑
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done(); // 若当前页本就是首页则不会触发afterEach钩子，所以手动调用进度条完成
});

router.afterEach(() => {
  NProgress.done()
});
