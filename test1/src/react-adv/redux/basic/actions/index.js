
//action创建函数把数据应用到store
//传入的是新数据，返回的是新的数据结构（对象，会经由reducers合并到state树）
let nextTodoId = 0
//输入框输入值action
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,//每一次添加输入todo，都会伴随这一个唯一的id
    text//这才是主体的输入内容state
  }
}
//过滤条件action
export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}