import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

/**
 * 展示用，纯函数组件
 * 
 * props:
 * todos    是一个 todo 对象数组 todo 包含complete 和 text 两个字段
 *          ...todo 展开了对象。
 */
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)

/**
 * PropTypes.shape  一种特定类型的对象。
 */
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