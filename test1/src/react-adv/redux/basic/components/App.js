import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />{/*这里是设置state的地方*/}
    <VisibleTodoList />{/*这里是响应更新的主要位置*/}
    <Footer />{/*这里是设置更新state的地方*/}
  </div>
)

export default App

/*
流程图（App.js开始）
第一步：reducers定义了两个state，渲染列表todos默认值为[]，过滤条件visibilityFilter默认值为show_all，这是redux第一次运行

输入内容 ==> AddTodo组件获取输入值（ref属性）==> AddTodo组件提交事件onSubmit ==> 触发dispatch(addTodo(input.value))更新todos
       ==>VisibleTodoList组件即将响应 ==> mapStateToProps参数获取todos和visibilityFilter，并对渲染列表进行筛选，同时传入mapDispatchToProps事件处理函数
       ==>TodoList组件正式响应更新，重新根据todos渲染
再次输入内容 ==>AddTodo组件获取输入值（ref属性）
              ==> AddTodo组件提交事件onSubmit 
                ==> 触发dispatch(addTodo(input.value))更新todos
                  ==>VisibleTodoList组件即将响应
                    ==>mapStateToProps参数获取todos和visibilityFilter，并对渲染列表进行筛选
                      ==>TodoList组件响应更新，重新根据todos渲染
点击列表某一项 ==> 触发传入TodoList组件的mapDispatchToProps事件处理函数 ==> 触发action-- toggleTodo ==>dispatch(toggleTodo(id))更新todos
              ==>TodoList组件响应更新，重新根据todos渲染
点击下方的渲染条件 ==> onClick事件dispatch(setVisibilityFilter(ownProps.filter))更新过滤条件state--visibilityFilter
                  ==> TodoList组件响应更新，重新根据todos渲染

如何重新计算todos呢？
1.增加todos：通过reducers重新计算
2.过滤条件筛选：筛选函数getVisibleTodos
*/