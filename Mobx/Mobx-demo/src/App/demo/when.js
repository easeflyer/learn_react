import { withRouter } from 'react-router-dom';
import React from 'react';
import { observable, when, computed, autorun, action } from 'mobx';
import { inject, observer, Provider } from 'mobx-react';



/**
 * when 案例
 * 一旦 函数1 返回 true, 然后函数2 被执行。 这个监听只执行一次，when 就被清理。
 * 本例中 v2 再变化 都不在触发 dispose() 执行。
 * 
 * 另外包含 inject 的使用。
 */
class MyResource {
  @observable v1 = 11;
  @observable v2 = 0;
  ha = autorun(() => alert('aurorun..' + this.v2));
  constructor() {
    when(
      // 一旦...
      () => !this.isVisible,
      // ... 然后
      () => this.dispose()
    );
  }

  @computed get isVisible() {
    // 标识此项是否可见
    return !this.v2;
  }
  @action.bound
  handleClick() {
    this.v1 = 22;
    this.v2 = !this.v2;
  }
  dispose() {
    // 清理
    alert('清理');
  }
}
//const mr = new MyResource();

@observer
@inject('store')
class App extends React.Component {
  render() {
    return (
        <div>
          {this.props.store.v1}
          <button onClick={this.props.store.handleClick}>点击</button>
        </div>
    );
  }
}

export default ()=>
  <Provider store={new MyResource}>
    <App />
  </Provider>;