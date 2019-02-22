import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import {observable, toJS, autorun,reaction, action } from 'mobx';

/**
 * 测试案例：
 * 1 如果修改一小部分 props 组件是否刷新？
 * 实验结果：会刷新，但是要注意传递给 props 的必须是一个对象，不能是一个普通数据。
 */

class App extends React.Component{
  @observable v1 = {
    a:1,
    b:2,
    c:{d:3,e:4}
  }
  @action.bound
  handleClick(){
    this.v1.c.d = 33;
  }
  render(){
    return(<div>
      <Com1 v1={this.v1.c.d} /> {/* 这里如果传递普通数据 this.v1.c.d 则不会触发刷新 */}
      <button onClick={this.handleClick}>确认</button>
    </div>)
  }
}

@observer
class Com1 extends React.Component{
  render(){
    return(
      <div>{this.props.v1}</div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));