/**
 * 容器组件 AddTodo connect 生成的和暴露的组件
 * UI组件 AddTodo 是下面定义的
 * connect 用于链接？？？
 * addTodo 是一个 action 函数，接收用户的输入。然后返回一个 action 用于 dispatch 执行
 */
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'


/**
 * 这是个 混合 UI 组件
 * 纯 UI 组件,应该只有 props 也就是单纯的接收 新值,或者是 事件处理方法。
 * 纯 UI 组件一句话：不含有 redux 元素。但这个组件包含。
 * 
 */

const AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
/**
 * 这里可以看到 connect 会把dispatch 给到 UI 组件
 */
export default connect()(AddTodo)



//----------------------------------------------------------------------------
// 下面 把这个混合组件写成纯 UI 组件
// ref 回调解释：回调的参数 就是 dom 组件 这里就是 node 
// 代码开始

/**
 * 改进后的 纯 UI 组件  AddTodo
 */

// const AddTodo = ({ onSubmit }) => {
//   let input
//   return (
//     <div>
//       <form onSubmit={e => {
//         e.preventDefault()
//         if (!input.value.trim()) {
//           return
//         }
//         onSubmit(input.value)
//         input.value = ''
//       }}>
//         <input ref={node => input = node} />
//         <button type="submit">
//           Add Todo
//         </button>
//       </form>
//     </div>
//   )
// }
// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (value) => dispatch(addTodo(value))
// })


// export default connect(null,mapDispatchToProps)(AddTodo)

// 代码结束
//----------------------------------------------------------------------------