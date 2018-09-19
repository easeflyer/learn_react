import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

//reducers的意义在于，接受从action每个函数里面返回的对象作为state
//reduces返回的是新的state。
const todoApp = combineReducers({
  todos,//输入内容state，默认传入的state.todos和action
  visibilityFilter//过滤条件state
})

export default todoApp