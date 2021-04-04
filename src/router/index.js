import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Router Modules */

/**
 * 路由分两种进行配置：
 * 1、通用路由，指所有角色的用户都有权限访问的路由
 * 2、异步路由，指需要根据用户角色进行过滤动态添加的路由
 * ==========
 * 路由配置中部分参数说明：
 * 必选配置：
 * @name  {String}，路由名
 * 可选配置：
 * @redirect  {String}，vue-router提供的重定向配置，这里约定对于有设置“meta.title”但无完整组件视图输出的父路由应设置为特殊值“noredirect”(用于页面搜索结果和面包屑显示筛选)
 * @alwaysShow  {Boolean}，是否始终显示该路由，即使其只有一个子路由（具有子路由的项有效，即控制只有一个子菜单时是否提升到上级菜单显示）
 * @meta.title  {String}，对应菜单标题文本（根据该标识在语言表中查找对应文本，要显示文本则必须）
 * @meta.icon  {String}，对应菜单栏图标（一级菜单有效）
 * @meta.roles  {Array}，角色要求，不设置则表示无需权限验证
 * @meta.affix  {Boolean}，是否总是固定在顶部标签栏（一般首页要求固定）
 * @meta.noCache  {Boolean}，不缓存对应页的状态（返回对应页时要求刷新）
 * @meta.breadcrumb {Boolean}，如果设置为false，则不会在breadcrumb面包屑中显示
 * */

/** 通用路由 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
    meta: {
      title: '登录首页'
    }
  },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter
];

/** 异步路由 */
export const asyncRoutes = [];
const router = new Router({
  mode: 'hash',
  base: '/order-food-web/',
  routes: constantRoutes

});

export default router
