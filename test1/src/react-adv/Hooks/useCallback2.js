import React from 'react';
import ReactDOM from 'react-dom';


let fnn1 = null;
let fnn2 = null;

const ExpensiveComponent = ({onClick})=><h1 onClick={onClick}>我是一个昂贵的组件！渲染耗时！</h1>
/**
 * 普通的函数组件
 * 如果要用回调，那么没有办法，只能重新生成。除非用类组件解决。因为类组件有状态。
 */
function Com1({p1,p2}){
  const fn1 = () => console.log("fn1");
  console.log("Com1:", Object.is(fnn1,fn1));
  fnn1 = fn1;
  return <ExpensiveComponent onClick={fn1}>p1:{p1} p2:{p2}</ExpensiveComponent>
}

/**
 * 采用 useCallback() 后 fn1 只在 p1 修改后才会新建。否则保持不变。
 */
function Com2({p1,p2}){
  const fn1 = React.useCallback(() => console.log("fn1"),[p1]);
  console.log("Com2:", Object.is(fnn2,fn1));
  fnn2 = fn1;
  return <div onClick={fn1}>fn1:{p1} p2:{p2}</div>
}





function App(){
  const [p1,setP1] = React.useState(0);
  const [p2,setP2] = React.useState(0);
  return(
    <div>
      <h2>每次点击 fn1 都是新的</h2>
      <Com1 p1={p1} p2={p2}/>
      <button onClick={()=>setP1(p1+1)}>p1 + 1</button>
      <hr />
      <h2>不用重复生成fn1</h2>
      <Com2 p1={p1} p2={p2}/>
      <button onClick={()=>setP2(p2+1)}>p2 + 1</button>
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));