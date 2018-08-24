/**
 * FilterLink 是一个容器组件。
 * FilterLink 将会传入一个 filter props 属性。并且用来做比较，如下：
 *    active: ownProps.filter === state.visibilityFilter ownProps 就是容器组件自己的
 *    props ，注意容器的 props 变化，同样会触发。mapStateToProps 函数，且重新渲染
 * 
 * mapStateToProps
 * 通过 state 返回了 Link 组件的 active 值
 * 
 * mapDispatchToProps
 * 通过 容器组件的 props 给 UI 组件的 onClick 方法 绑定了处理函数.
 * 
 * 用容器组件的 filter 属性, 就是一个具体的 属性,取值范围:VisibilityFilters 和 redux 无关
 * setVisibilityFilter(ownProps.filter) 返回了具体的 Action,也就是 设定过滤器
 */

import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  console.log('state.....') // 从输出来看 state 接收到的是 全局根 state
  console.log(state);
  return ({
    active: ownProps.filter === state.visibilityFilter
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
