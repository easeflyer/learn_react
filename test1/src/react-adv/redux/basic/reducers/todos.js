
//这里是todos接收更新时所作的操作，包括初始化操作
//es6语法，state=[]表示state的默认值是[]
//最终返回的是新state或者旧的state
const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO'://添加todo
        return [
          ...state,//将旧的state解构，与新的todo组成新的state
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO'://切换todo，加横线的那个操作
        return state.map(todo =>//遍历，找到触发action的todo，改写complete属性
          (todo.id === action.id) 
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default todos