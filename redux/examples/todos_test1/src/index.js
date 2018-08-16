/**
 * 概述：
 * ========
 * todos_test1 案例 是一个没有 ui 组件的案例。可以比较清晰的理解 redux 的工作流程
 * 
 * 1）引入 reducers 用来处理 action 返回新的 state
 * 2）引入 actions 描述各种 操作。action 描述了操作和参数。 reuducer 执行。
 * 3）store 通过 reducer  创建。 通过 dispatch 执行
 * 
 * 
 * action
 * ========
 * 1）就是一个对象{type：，.... } 必须有一个 type 属性
 * 
 * reducer
 * ========
 * 1）传入 state 和 action，返回新的 state
 *      function todoApp(state = initialState, action) {}
 * 2）保持reducer是一个纯函数，没有副作用。
 * 3）reducer 合并：每个reducer 对应局部state 的处理。多个reducer 合并返回最终
 *      的根state。合并方法，自己拼对象，或者用combineReducers 参考印象笔记。
 * 
 * 
 * 创建 store 
 * ===========
 * 注意按照 redux 文档 store 全局应用只有一个。
 * 参数：todoApp 是合并过的reducer 或者叫 根reducer
 * 
 * 分析：为什么通过 todoApp 创建 store ?
 * 我们知道 store 保存了 state。而reducer 返回的就是state。
 * 因此根reducer 返回的就是全局 state。
 */



import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
} from './actions/actions'

let store = createStore(todoApp)

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回 unsubscribe 一个函数用来注销监听器
// 如何 setState 呢？？ 里面的回调函数。就是用于更新 state 的可以在里面调用setState
// 参考 redux 官方文档 数据流讲解。
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

/**
 * 发起一系列 action
 * dispatch(action) action 可以是具体的action对象，也可以是返回action的函数
 * 这里用的是action函数:函数名可以看出action的 type 函数参数 则是更新state 的数据。
 */
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();