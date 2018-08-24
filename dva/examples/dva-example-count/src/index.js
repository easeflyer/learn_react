import React from 'react';
import dva, { connect } from 'dva';
import './style.css';

// 1. Initialize
const app = dva();

console.log(2);

// 2. Model
/**
 * namespace 是 model 的 key，同时也是 action 的 type 组成部分。
 * state 就是 “count” 的 state;可以理解为：{count: 0}
 * 
 */
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add  (count) { return count + 1 },
    minus(count) { return count - 1 },
  },
});

/**
 * 这里是想说什么？
 */
class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    //throw new Error('a');
  }
  render() {
    return <div>TestError</div>
  }
}

/**
 * 这部分代码，包含比较多的技术 图形和 隐含语法。说明如下：
 * App 为 通过 redux 的  connect 生成的“容器组件”，也就是把 state 和 UI 组件连接在一起
 * connect 的参数：是 mapStateToProps 也就是 state 和 UI 组件的 props 的对应关系。
 *    需要注意的是 两侧的 count 都必须和 state 以及 props 命名一致。
 * connect()(参数) 这个参数就是被连接的 UI 组件。这里是一个纯函数。dispatch 和其他
 *    mapStateProps ，mapDispatchProps 过来的属性，都会合并到 UI 的 props 里面
 * 
 * dispatch({}) 注意这里面的 {} 应该是一个 action 。结合 redux 理解：Action 的样子和定义
 *    是和 reducer 相对应的。reducer 如何处理， Action 就是如何定义。相互关联。
 * 但是 dva 里面的 action 的 type 是 namespace/reducername 这样的格式。
 */
const App = connect(
  ({ count }) => ({ count })
)(function(props) {
  return (
    <div>
      <TestError />
      <h2>{ props.count }</h2>
      <button key="add" onClick={() => { props.dispatch({type: 'count/add'})}}>+</button>
      <button key="minus" onClick={() => { props.dispatch({type: 'count/minus'})}}>-</button>
    </div>
  );
});

// 4. Router
/**
 * App 是 Route Component 也就是 container componet
 * 这里虽然是一个 Route Componet 但是并没有使用 路由。
 * 关于 路由的使用参考其他案例。
 */
app.router(() => <App />);

// 5. Start
app.start('#root');
