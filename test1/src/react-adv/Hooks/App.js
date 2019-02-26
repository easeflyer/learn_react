import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import {Button,Modal} from 'antd';
import 'antd/dist/antd.css';



/*
本例知识点：
useState 的简单使用。快速上手入门。
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
  // 利用 useState 引入 状态相关逻辑
  const [open, setOpen] = useState(false);
  
  return (
    <React.Fragment>
      {/* onClick 对状态进行修改 */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        visible={open}
        onOk={() => setOpen(false)} // 对状态进行修改
        onCancel={() => setOpen(false)}
      />
    </React.Fragment>
  );
}



const App = props => <div>
  <Example />
  <hr />
  <Example1 />
</div>

ReactDOM.render(<App />, document.getElementById('root'));


// function DataProvider(props){
//   return (
//     props.render(333)
//   )
// }


// <DataProvider render={data => (
//   <h1>Hello {data.target}</h1>
// )}/>