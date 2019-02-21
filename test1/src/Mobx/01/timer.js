/**
 * 注意修改：experimentalDecorators vscode 设置为 true 避免语法错误提示
 * 
 * Mobx 入门案例 1
 * 
 * 知识点：
 * @observable    用来定义 状态，也就是传统react 的 state
 * @computed      装饰一个函数（纯函数），state 变了，这个函数自动执行计算结果
 *                加不加这个装饰器 都会改变啊？？？
 * 
 * @action.bound  修饰一个函数，这个函数用来修改 state 触发 state 改变
 * 
 * observer()     属于一个高阶函数，传一个纯UI组件作为参数，返回另外一个组件（有状态）。  
 */

import React from "react";
import { render } from "react-dom";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";


/**
 * 注意这个类的定义 AppState  应用的 State
 * 1）单纯的 class
 * 2) 由 state 和 action 组成，没有react 组件。
 */
class AppState {


  // 1  定义 state，定义 计算列（随state 自动改变）
  @observable timer = 0;
  @computed get timerM(){
    return this.timer / 60;
  }

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }


/**
 * 2  定义 action 函数，用来修改 state, 貌似：@action.bound 就是起到了一个 this 的 bind 作用。
 *    这里如果用 reset = () => {} 可以不用 @action.bound ，没错。官方也有介绍。
 *    如果函数 reset 不是作为一个事件处理函数，则用 @action 不需要 bound
 */
  @action.bound
  reset() {
    this.timer = 0;
  }
}

/**
 * observer  
 * 分析理解：server 就是服务。因此这里可以理解为：
 * 把上面的定义的状态管理，服务与一个普通的 UI 组件（observer 的参数。）
 * 返回的就是一个：可以自动更新状态的 有状态组件。
 */

// 1 纯 UI 组件
const TimerUi = ({ appState }) => (
    <button onClick={appState.reset}>Seconds passed: {appState.timer}, M:{appState.timerM}</button>
);

// 2 用 observer 变为一个 有状态的组件
const TimerView = observer(TimerUi);

render(
  <div>
    <TimerView appState={new AppState()} />
    <DevTools />
  </div>,
  document.getElementById("root")
);



/**
 * 核心概念理解
 * 
 * 看完上面的例子后，我们可以对 MobX 的核心概念有个理解。
 * 
 * 1）Observable state(可观察的状态) 
 *    为现有数据结构添加可观察（observable）功能。
 * 
 * MobX 为现有的数据结构(如对象，数组和类实例，并不限于 React )添加了可观察的功能。
 * 通过使用 @observable 装饰器来给你的类属性添加注解就可以简单地完成这一切。
 * 可观察的：此数据的变化，触发其他观察者跟随变化。
 * 
 * 2）Computed values(计算值)
 *    当 state 变化时，@computed 装饰的 geter 函数 自动更随变化。
 * 
 * 3）Reactions(反应)
 *    产生副作用，比如网络请求等。需要补充。
 *    autorun, when 的函数。就是当 State 发生变化后。做出的反应。
 * 
 * 4）Actions(动作)
 *    就是修改 State 的方法。MobX 并不要求一定用 Actions ，只需直接修改 state 即可。
 * 
 * 参考：
 * https://cn.mobx.js.org/intro/overview.html （MobX 要点）。
 * https://cn.mobx.js.org/intro/concepts.html（概念与原则）讲的非常好。
 */