/**
 * 一个容器组件就是构造 mapStateToProps，mapDispatchToProps
 * 
 */

import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'


/**
 * 一个普通函数
 * 作用是从 state 计算得到新的 props
 */
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
/**
 * mapStateToProps
 * mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）
 * state对象到（UI 组件的）props对象的映射关系。所谓外部，就是容器组件。
 * 
 * 本函数这里利用上面的函数，把传入的 state 转换为 props （todos）
 * 
 */
const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
/**
 * id 会从 UI 组件发送过来。
 */
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
