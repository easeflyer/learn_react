/**入口文件 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import { devToolsEnhancer } from 'redux-devtools-extension';
//创建store，传入reducers
let store = createStore(todoApp,devToolsEnhancer())
//渲染组件
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
/*
actions文件：它是store树数据的唯一来源，每一次更新数据，都要有action来触发，由dispatch函数传给store，他就是数据更新的触发操作
reducers文件：数据更新触发，新数据如何与旧数据结合呢，是合并还是替换？这就是该文件要做的事，他规定了如何去整合新旧数据
store：store就是把上述两个连接起来的对象
数据流：触发action后，数据会由store传递给reducers整合，Redux store保存了根reducer返回的完整state树。
*/
