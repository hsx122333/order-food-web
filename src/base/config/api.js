const opsvcCtx = '/order-food-svc/';
// 接口请求统一管理
const api = {
  loginStaff: opsvcCtx + 'staff/login',
  insertStaff: opsvcCtx + 'staff/insertStaff',
  sendPassCode: opsvcCtx + 'staff/sendPassCode',
  forgetPassword: opsvcCtx + 'staff/forgetPassword',
};

export { api };
