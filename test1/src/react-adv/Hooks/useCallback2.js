import React from 'react';
import ReactDOM from 'react-dom';


/*
本案例知识点：
    - 避免“昂贵的组件”重新渲染。
    - Com1 的 fn1 是个普通的函数。每次渲染 Com1 都是重新生成。
    - Com2 的 fn1 用了 useCallback 避免了重新生成。
      点击 p1+1 Com2 渲染但不会渲染昂贵组件。因为 fn1 没变。
    - 昂贵组件采用 PureComponent 或者 React.memo 生成。

Com1，Com2 是两个组件。
他们都渲染了一个 “昂贵的组件”。
通过 useCallback 避免了重新生成 Com2 的 fn1 callback 函数。因此避免了
昂贵组件的重新渲染。




*/



let fnn1 = null;
let fnn2 = null;

// 模拟一个昂贵的组件，也就是重新渲染需要消耗大量资源和时间。
// PureComponent 也可以用 React.memo 来改写
// https://www.cnblogs.com/chenjg/p/10327304.html
class ExpensiveComponent1 extends React.PureComponent{
  render(){
    const date = new Date();
    //const date = 334;
    return <h1 onClick={this.props.onClick}>{date.getSeconds()}我是一个昂贵的组件！渲染耗时！</h1>  
  }  
}

// React.memo 改写。
const ExpensiveComponent = React.memo(({onClick})=>{
  const date = new Date();
  //const date = 334;
  return <h1 onClick={onClick}>{date.getSeconds()}我是一个昂贵的组件！渲染耗时！</h1>  
})



/**
 * 普通的函数组件
 * 如果要用回调，那么没有办法，只能重新生成。除非用类组件解决。因为类组件有状态。
 */
function Com1({p1}){
  const fn1 = () => console.log("fn1");
  console.log("Com1:", Object.is(fnn1,fn1));
  fnn1 = fn1;
  return <ExpensiveComponent onClick={fn1} />
}

/**
 * 采用 useCallback() 后 fn1 只在 p1 修改后才会新建。否则保持不变。
 */
function Com2({p2}) {
  const fn1 = React.useCallback(() => console.log("fn1"),[p2]);
  console.log("Com2:", Object.is(fnn2,fn1));
  fnn2 = fn1;
  return <ExpensiveComponent onClick={fn1} />
}


class App extends React.Component{
  state = {
    p1:0,
    p2:0
  }
  render(){
    return(
      <div>
        <h2>每次点击 fn1 都是新的</h2>
        <Com1 p1={this.state.p1}/>
        <button onClick={()=>this.setState({p1:this.state.p1+1})}>p1 + 1</button>
        <hr />
        <h2>不用重复生成fn1</h2>
        <Com2 p2={this.state.p2}/>
        <button onClick={()=>this.setState({p2:this.state.p2+1})}>p2 + 1</button>
      </div>
    );    
  }
}




function App2(){
  const [p1,setP1] = React.useState(0);
  const [p2,setP2] = React.useState(0);
  return(
    <div>
      <h2>每次点击 fn1 都是新的</h2>
      <Com1 p1={p1}/>
      <button onClick={()=>setP1(p1+1)}>p1 + 1</button>
      <hr />
      <h2>不用重复生成fn1</h2>
      <Com2 p1={p1}/>
      <button onClick={()=>setP2(p2+1)}>p2 + 1</button>
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));