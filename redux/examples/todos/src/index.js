/**
 * App 最外层的组件。
 * rootReducer 根 Reducer 组成完整 state, 以及对 state 的处理。
 * 这里没有引入action ， action 在容器组件里引入。用于下发执行
 */

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

// 建立全局 state 容器 store
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// 执行入口 把 App 挂载到 root
// Provider 参考 react context 为全局提供 store 
// 下一步 进入 App 
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
