import React from 'react';
import ReactDOM from 'react-dom';
import { useReducer } from 'react';

/**
 * 知识点：
 *  - useReducer 就是一个自定义 useState 执行了比较复杂的 state 更新。
 *  - 几个元素。Counter组件，reducer 函数。init函数，dispatch 函数 的作用。
 *  - 通过 dispatch 更新 state
 *  - 通过 init 计算最初的 state
 *  - 从此不在需要 redux 
 * 
 * 额外：讲个故事
 *  我们知道 redux 以及 mobx 都是并不依赖 React 在其他框架中依然能使用他们的思想。
 *  如果 React 官方没有提出自己的解决方案。
 *  那么这些状态管理可能会进一步发展壮大。 可以理解为 微信和短信之关系。
 *  假设有一天微信说：以后移动手机号码，无法登录微信，会怎么样？当然可以不用这么明显。
 *  相同的，如果有一天其他框架，发展的和 vue 或者其他框架更加适配：最佳搭档。
 *  那意味着什么？ 所以说一项技术必须根基要稳。因此 facebook 挖来了redux 开发者
 *  并让他 接手了facebook 的 hooks 项目，亲手解决了自己的亲儿子 redux 。
 *  这只是开个玩笑，从侧面可以理解Hooks 的重要性。
 * 
 * 
 * useState 的替代方案。 接受类型为 (state, action) => newState 的reducer，
 * 并返回与 dispatch 方法配对的当前状态。（如果你熟悉Redux，你已经知道它是如何工作的。）
 * 不熟悉也不用担心，照样会用，且可以说：我不需要redux。其实是一个人写的。
 * 
 */




const initialCountState = {count: 0};

/**
 * 输入旧state 根据 action 返回新 state。这就是 reducer 的作用。
 * @param {*} state   输入的 state
 * @param {*} action  根据action 返回新的 state
 */

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {count: action.payload};
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state;
  }
}

// useReducer 的第三个参数 是一个函数。输入初始的 state 输出一个新的 state
// 这个函数会最初被执行，替换了初始 state 值。
function init(initialCountState) {
  return {count: initialCountState.count+1};
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialCount,
    init
  );

  return (
    <React.Fragment>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount.count})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </React.Fragment>
  );
}
const App = props => <div>
  <Counter initialCount={{count:1}} />
</div>

ReactDOM.render(<App />, document.getElementById('root'));


// 当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState 
// 根据不同的 action 返回了不同的 新 state