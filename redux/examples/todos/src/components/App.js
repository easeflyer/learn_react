/**
 * App 仅仅是一个简单的 外层组件 包含了其他组件。
 * 
 * AddTodo          容器组件 包含用于添加 todo 的表单。
 * VisibleTodoList  容器组件 todo 列表
 * Footer           UI 组件
 * 
 * 
 * 
 * Footer UI 组件
 * 包含三个 FilterLink 用于对 todolist 进行过滤（完成，未完成，全部）
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
