import React from 'react';
import ReactDOM from 'react-dom'

//见到组件中出现props，就去该组件的jsx语法元素中找jsx属性，一一对应
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

//利用ReactDOM.render()的覆盖作用，定时重新渲染元素。缺点：与普通js设计没区别，无法体现react的强大
setInterval(tick, 1000);

