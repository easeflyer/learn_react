/**
 * App 仅仅是一个简单的 外层组件 包含了其他组件。
 * AddTodo 容器组件
 * VisibleTodoList 容器组件
 * Footer UI 组件
 */
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
