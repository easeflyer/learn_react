/**
 * 这个例子对 redux 的 工作流程有个比较清晰的介绍。
 * 关键词：UI 组件，Action, reducer, store, mapStateToProps, mapDispatchToProps
 * 
 * 有不理解的地方或者细节，参考：http://www.redux.org.cn/docs/react-redux/api.html
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

/**
 * 纯 UI 组件
 * 从 this.props 获得数据，包括“值数据”和“事件数据”：value 和 onIncreaseClick 
 */
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
// 类型检查
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}
/**
 * Action 定义
 * Action 就是一个普通对象，必须有一个 type属性而已。其他数据随便定义
 * Action 也可以是一个函数，返回 Action 对象即可。
 */
const increaseAction = { type: 'increase' }

/**
 * Reducer 定义
 * Reducer 用来响应对 Action 的实际处理工作。
 * 参数1： 是状态数据，
 * 参数2： 是Action
 * 返回：新的 state
 */
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

/**
 * Store
 * 注意以上都是定义的普通对象和函数。是 Redux 设计的必要元素。
 * 这里引入 store 开始使用 redux。
 * 用 counter （reducer）作为参数，新建了store。这里的 reducer 应该是根 reducer
 * 根 reducer 返回根 state 保存在 store 里面
 */

const store = createStore(counter)

/**
 * mapStateToProps 函数。本质上是普通函数。
 * 作用是建立 state 和 子组件的Props 对应关系。 
 * 当 state 变化时，会调用本函数。刷新子组件。
 * 参数：state，[ownProps] 可选参数，是容器组件的 props 如果容器组件的 props 变化
 * 也会调用本函数。触发重新渲染。
 * 输出：对象{子组件prop名称:state参数}
 * 参考：Counter UI 组件具有 value props
 */
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

/**
 * mapDispatchToProps 函数。本质上也是普通函数。返回：object 或者 func
 * 作用是建立 Action 和 子组件的 props 的对应关系。也就是说：组件如何通过事件把
 * 信息发送出来。而mapStateToProps 是外部如何通过修改 state 输入到 子组件。
 */
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}
/**
 * 注意：
 * mapStateToProps
 * mapDispatchToProps
 * 是两个回调函数，因此参数是 预先定义好的。注意参考 api 
 */





/**
 * connect
 * 把 App （容器组件）和 UI 组件链接起来。生成 App 组件。因此这里 App
 * 组件仅仅为了输出而已。没有其他用途。是 connect 的返回值。
 * 注意语法：
 * connect 两个参数，返回值也是个函数，有一个参数是 UI组件Counter
 * connect(arg1,arg2)(com1)
 * 
 * 以上代码都是定义。
 * 特别注意：这里是 直接执行。返回值定义了常量 App。
 */
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
/**
 * 利用Provider 把 store 共享给全局
 * 
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
