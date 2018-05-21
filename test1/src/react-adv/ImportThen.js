import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

// import App1 from "./ImportThen1"
// console.log(App1);

/**
 * 参考官方
 * 这个语法是 官方代码拆分的新语法范畴。
 */

import("./ImportThen1").then(App => {
    //alert(333);
    const App1 = App.default;
    ReactDOM.render(<App1 />, document.getElementById('root'));
});

//ReactDOM.render(<App />, document.getElementById('root'));
  


