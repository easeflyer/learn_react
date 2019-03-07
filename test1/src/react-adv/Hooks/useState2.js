import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import {Button,Modal} from 'antd';
import 'antd/dist/antd.css';
/**
 * 本例知识点：
 * 1) useState 的基本使用。
 * 2）hooks 解决的问题。renderProps 和 hooks 的比较。彻底理解 hooks 的价值和优点。
 * 
 * 
 * 本例出处：https://github.com/dt-fe/weekly/blob/master/79.%E7%B2%BE%E8%AF%BB%E3%80%8AReact%20Hooks%E3%80%8B.md
 * 
 * Toggle 是 react-powerplug 这个第三方库，就是一个 renderProps 工具库。可以参考：
 * http://rena.to/react-powerplug/#/docs-components-counter
 * https://github.com/dt-fe/weekly/blob/master/75.%E7%B2%BE%E8%AF%BB%E3%80%8AEpitath%20%E6%BA%90%E7%A0%81%20-%20renderProps%20%E6%96%B0%E7%94%A8%E6%B3%95%E3%80%8B.md
 * 在这里，我们自己实现他。
 */

class Toggle extends React.Component{
  state={on:false}
  constructor(props){
    super(props);
    this.state.on = this.props.initial;
  }
  toggle = () =>{
    this.setState({on:!this.state.on})
  }
  render(){
    return this.props.children(this.state.on,this.toggle);
  }
}



function App1() {
  return (
    <Toggle initial={false}>
      {(on, toggle) => (
        <React.Fragment>
          <Button type="primary" onClick={toggle}>
            Open Modal 
          </Button>
          <Modal
            visible={on}
            onOk={toggle}
            onCancel={toggle} />
        </React.Fragment>
      )}
    </Toggle>
  )
}

/* 
本例原文：
可以看到，React Hooks 就像一个内置的打平 renderProps 库，我们可以随时创建一个值，
与修改这个值的方法。看上去像 function 形式的 setState，其实这等价于依赖注入，
与使用 setState 相比，这个组件是没有状态的。

小白理解：
注意 useState 是一个“状态逻辑” 可以这么理解：首先你要明白前端或者在React 中什么是状态
不要仅仅和程序中的 state 以及 setState 对应。而是要明白什么是状态。然后 state 和 setState
只是 React 本身对状态的一个实现逻辑。Redux,mobx 等也是对状态这种数据的管理方式。
好了现在再看“状态逻辑” 就可以理解了：就是和这种“状态数据”变化相关的代码逻辑。

对 React 本身通过 setState 来实现。也就是需要实现一个 class。然后通过“渲染回调” 把逻辑注入给
子组件。 App1 实现的也没问题。再来看 hooks 的实现方法。

不需要外部的 包含 state 的组件。直接用 useState 就是实现了简单的 state 和 setOpen 的处理逻辑。
当然如果你有复杂的逻辑可以通过自定义 hooks 来实现。好的。
那么最重要的区别就是 减少了层级，减少了组件。并且可读性更好。封装性更好。并且可以对
“状态相关的逻辑”进行更好的重用和共享。

总结优点：
React Hooks 带来的好处不仅是 “更 FP，更新粒度更细，代码更清晰”，还有如下三个特性：

  1. 多个状态不会产生嵌套，写法还是平铺的（renderProps 可以通过 compose 解决，
      可不但使用略为繁琐，而且因为强制封装一个新对象而增加了实体数量）。
      我们可以看到 app1 中如果再有一个 "状态相关逻辑" ，则必须再嵌套一个 组件。
  1. Hooks 可以引用其他 Hooks。
  1. 更容易将组件的 UI 与状态分离。

*/
function App2() {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </React.Fragment>
  );
}



const App = props => <div>
  <App1 />
  <hr />
  <App2 />
</div>

ReactDOM.render(<App />, document.getElementById('root'));