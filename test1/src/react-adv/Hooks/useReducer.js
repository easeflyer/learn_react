import React from 'react';
import ReactDOM from 'react-dom';
import { useReducer } from 'react';

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
  return {count: initialCountState};
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
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </React.Fragment>
  );
}
const App = props => <div>
  <Counter initialCount={0} />
</div>

ReactDOM.render(<App />, document.getElementById('root'));


// 当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState 
// 根据不同的 action 返回了不同的 新 state