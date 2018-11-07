/**
 * 构建大型可扩展可维护项目的最佳实践
 * 
 * 关于 MVC 以及程序如何更好的解耦的说明，参考：
 * https://cn.mobx.js.org/best/store.html
 * 
 * Stores(存储)
 * 
 * 用户界面UI状态的 store
 * 
 * 至少两个 store 可以让绝大多数应用从中受益。 一个用于 UI 状态，一个或多个用于领域状态。 
 * 分离这两个 store 的优点是可以重用和测试领域状态，并且可以很好地在其他应用中重用它。
 * 
 * UI 状态  ：就是负责 UI 显示的，和特定业务逻辑无关。
 * 领域状态 ：和业务逻辑相关，属于特定领域的状态。
 * 
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, asStructure} from 'mobx';
import {observer} from 'mobx-react';
import jquery from 'jquery';

function getWindowDimensions(){
  return {width:1920,height:1080};
}

class UiState {
    @observable language = "en_US";
    @observable pendingRequestCount = 0;

    // .struct 确保不会通知观察者，除非尺寸对象以深度相等的方式改变
    // .struct 用法　参考下面的　onclick
    @observable.struct windowDimensions = {
        width: jquery(window).width(),
        height: jquery(window).height()
    };

    constructor() {
        jquery(window).resize(() => {
            this.windowDimensions = getWindowDimensions();
        });
    }

    @computed get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}

const TestView = observer(({store})=>(
  <div>
    width:{store.windowDimensions.width}<br />
    height:{store.windowDimensions.height}
    <button onClick={()=>{
      // store.windowDimensions.width=300; 不触发渲染。
      store.windowDimensions = {width:300};
      }}>改变</button>
  </div>
  
));

ReactDOM.render(<TestView store={new UiState()} />, document.getElementById('root'));