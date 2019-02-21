import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

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
const App = props => <div>
  <Example />
</div>

ReactDOM.render(<App />, document.getElementById('root'));