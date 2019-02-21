import { withRouter } from 'react-router-dom';
import React from 'react';
import {observable,when,computed, autorun,action} from 'mobx';
import { inject, observer } from 'mobx-react';
import { runInThisContext } from 'vm';



/**
 * when 案例
 * 一旦 函数1 返回 true, 然后函数2 被执行。 这个监听只执行一次，when 就被清理。
 * 本例中 v2 再变化 都不在触发 dispose() 执行。
 * 
 * proxy object.defineproperty
 */
class MyResource {
  @observable v1 = 11;
  @observable v2 = 0;

  @action.bound
  async handleListen(){
    await when(()=>this.v2);
    alert('收到消息！');
  }
  @action.bound
  handleSend(){
    this.v2 = !this.v2;
  }
}
const mr = new MyResource();

@observer
class App extends React.Component {
  render(){
    return(
      <div>
        {mr.v1}

        <button onClick={mr.handleListen}>监听消息</button>
        <button onClick={mr.handleSend}>发送消息</button>
      </div>
    );
  }
}

export default App;