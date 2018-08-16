import React from 'react'
import PropTypes from 'prop-types'

/**
 * 展示组件，函数组件 
 * 
 * props:
 * 回调：onClick
 * 是否完成：completed
 * 文本：text
 * 
 * 
 */
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo