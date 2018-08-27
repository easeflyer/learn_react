//过滤条件的处理函数
//默认值是SHOW_ALL，
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
  export default visibilityFilter