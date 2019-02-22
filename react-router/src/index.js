import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

//import App from './examples/basic/Router-basic'             // 基础案例
//import App from './examples/basic/Router1'                    // 基础案例2
//import App from './examples/basic/Router2'                    // 嵌套路由
//import App from './examples/route-path/Index'                    // 嵌套路由
//import App from './examples/route-custom/Index'               // 受保护路由，需要授权
//import App from './examples/history/demo1'                    // history 基本概念
import App from './examples/history/demo2'                    // history 基本概念



import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
