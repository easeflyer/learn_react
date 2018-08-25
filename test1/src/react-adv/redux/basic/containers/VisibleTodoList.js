import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/Todolist'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)//对todo.complete属性进行过滤
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

//传入整个state
const mapStateToProps = state => {
  return {
    //state获取，todos是添加的列表数组，visibilityFilter是过滤条件，最终是过滤后的todos
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

//将redux store与react组件连接，执行两步，第一步设置参数，第二步连接，会将参数注入react组件
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList