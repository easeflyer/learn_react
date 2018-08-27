import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    rootReducer,
    //redux-devtools调试工具
    devToolsEnhancer(),  
    //中间件的使用需要用到该函数
    applyMiddleware(
      //异步action中间件
      thunkMiddleware,
      //日志中间件，用于打印日志
      loggerMiddleware
    )
  )
}