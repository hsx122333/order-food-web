## 介绍

项目技术栈基于 webpack、vue、vuex、vue-router 、vue-cli 、axios 和 element-ui。

## 快速开始


### yarn安装

```shell
npm install  -g yarn
```

### 模块安装

```shell
yarn install
```

### 启动项目

```shell
yarn start
```


### 生产发布

```shell
yarn run build
```

## 功能

- 全局功能
  - 国际化多语言

- 错误页面
  - 401
  - 404

- ElementUI 组件,使用说明： [ElementUI官方文档](https://element.eleme.cn/#/zh-CN/component/layout)

## 目录结构

```html
├── build                      # 构建相关
├── static                     # 静态资源
│   │── favicon.ico              # favicon图标
├── src                        # 源代码
│   ├── api  # 前端服务管理，公共接口api封装
│   ├── assets # 素材管理，包括 css、图片等资源
│   ├── base # Vue项目核心内容，包括 Vue-directive、vendor、Vue-plugin等内容。
│   ├── common # 公共js方法管理，包括api管理、公共js方法等。
│   ├── components # 存放Vue公共手写组件
│   ├── lang # 国际化资源管理，页面字段、提示内容等信息存放
│   ├── router # Vue Router 页面路由管理
│   ├── store # Vuex 缓存管理
│   ├── views # 业务页面编写
│   ├──  App.vue   # 入口页面
│   └── main.js  # 入口文件 加载组件 初始化等
├── index.html                  # html模板
├── .eslintrc.js                 # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── postcss.config.js             # postcss 配置
├── yarn.lock               # yarn 相关
└── package.json                # package.json
```

## 参考

- <https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#功能>
- <https://element.eleme.cn/#/zh-CN/component/changelog>
- <https://vuex.vuejs.org/zh/>
- <https://vuejs.org/>