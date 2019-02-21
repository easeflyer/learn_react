/**
 * 注意运行本代码需要 安装 antd
 * 
 * 
 * 基本流程：
 * 
 * index.html 引入 index.js
 * index.js 也就是本文件，引入了 router 也就是控制器（容器组件）入口文件。
 * 容器入口文件（配置文件）通过配置路由，引入了其他相关的组件
 * 
 * 1）修改 router.js 添加 Users 路由组件， Users 组件引入 三个UI组件 UserList 等。
 * 2）UserList 是一个用户列表组件。
 * 
 */


import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/users').default);

// 4. Router
/**
 * 引入 container 组件。在 dva 中 也就是 Router 组件。
 * Router 组件负责控制是 UI 组件的外层容器，同时和路由一一对应。
 * 在 Python 的后台框架中，通常 controller 也是和 路由一一对应的。
 */
app.router(require('./router').default);

// 5. Start
app.start('#root');
