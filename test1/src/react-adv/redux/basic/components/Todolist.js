import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

//两个参数，过滤后的todos，以及点击函数，
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {/*列表渲染，Todo组件的props是，key（id），todo的全部属性（type，id，complete），点击事件函数*/}
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList