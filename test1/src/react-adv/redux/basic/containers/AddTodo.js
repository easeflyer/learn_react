import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

//props是dispatch函数，
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))//dispatch()用于更新state，参数是一个action函数，
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
//将addtodo组件与store组件关联
AddTodo = connect()(AddTodo)

export default AddTodo