import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

//将同时监听state和组件props的变动，一旦变动都会触发，mapstatetoprops函数就会调用，返回的纯对象会与组件的props合并
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
//传递两个参数，更新state的方法和组件的props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))//更新过滤参数，将自己的过滤条件，更新至state
    }
  }
}

//组件关联store，ownprops为该组件的props（实际上就是过滤条件）
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink