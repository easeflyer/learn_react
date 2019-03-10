import React from 'react'
import ReactDOM from 'react-dom'

/*
知识点：

  - useMemo 保存了渲染的结果。
  - 分别改变 a,b 的值。观察变量 child1,child2 的变化。
  - 点击修改 a ,child1 child2 都重新计算，重新渲染。
  - 点击修改 b , child2 重新计算，Child1 渲染一次。


参考：https://www.codercto.com/a/42122.html

利用 useMemo 解决重复渲染的问题，优化性能。

可以看到我们改变 a,b 的值 两个组件的渲染情况。
如果 Child1 是个复杂的组件。则 child2 则会造成重复计算重复渲染。

可以理解为：child1 保存了，回调函数返回的结果。
除非 [a] 发生变化，才会重新保存这个结果。


*/

let ch;


// 比如是一个复杂的组件。
const Child1 = ({ a }) => {
  console.log("Child1 重新渲染！！！");
  return <h2>{a}</h2>
};


function Parent({ a, b }) {


  // Only re-rendered if `a` changes:
  const child1 = React.useMemo(() => <div>
    {console.log("这是一个复杂计算！！！")}
    <Child1 a={b} />
  </div>, [a]);
  
  console.log("是否相等：", child1 === ch)
  ch = child1;

  // 没有用 useMemo 因此每次都重新计算
  const child2 = <div>
    {console.log("child2重新计算！")}
    <Child1 a={b} />
  </div>
  // Only re-rendered if `b` changes:

  return (
    <React.Fragment>
      {child1}
      {child2}
    </React.Fragment>
  )
}



const App = props => {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  return (
    <div>
      <Parent a={a} b={b} />
      <button onClick={() => setA(a + 1)}>改变a</button>
      <button onClick={() => setB(b + 1)}>改变b</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));