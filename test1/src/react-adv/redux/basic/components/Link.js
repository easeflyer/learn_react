import React from 'react'
import PropTypes from 'prop-types'

//该组件的props，包括，一个布尔值active，子节点，和一个事件函数
const Link = ({ active, children, onClick }) => {
  if (active) {//过滤条件一致时，节点被替换为span
    return <span>{children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()//点击事件函数，将会触发过滤state的改变，
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Link