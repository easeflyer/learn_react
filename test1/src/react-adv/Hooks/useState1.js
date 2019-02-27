import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
/**
 * 结合官网看这个例子。
 * http://react.html.cn/docs/hooks-overview.html
 */



/**
 *   - Example 是一个函数组件。
 *   - useState 是一个 Hooks React 内部提供，0是初始值
 *   - count 是 state; setCount 可以理解为 setState 传入的参数结果就是新的 State 值
 */
function Example() {
  // 声明一个新的状态变量，我们将其称为 "count" 
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function Example1() {
  // 声明一个新的状态变量，我们将其称为 "count" 
  const [count, setCount] = useState(0);
  const countAction = (preCount,b) => preCount + b;

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(countAction(count,2))}>
        Click me
      </button>
    </div>
  );
}



const App = props => <div>
  <Example />
  <hr />
  <Example1 />
</div>

ReactDOM.render(<App />, document.getElementById('root'));