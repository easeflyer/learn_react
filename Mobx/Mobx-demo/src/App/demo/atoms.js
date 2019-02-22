import { createAtom, autorun } from "mobx";
import React from 'react';
import { inject, observer, Provider } from 'mobx-react';

/**
 * Atoms 概念。
 * 
 * 利用 createAtom 函数，创建了 atom （一种mobx定义的特殊的被观察对象）
 * 当 this.getTime() 开始观察和调用 atom 的时候，自动启动。autorun 就是一个观察者。
 * 当不再有reaction观察 atom 的时候。也就是所有autorun 被回收的时候。atom 自动停止。
 * 
 * 关于本案例：
 * 
 * atom 是一个 Clock
 * 被观察时     startTicking()
 *    调用start() 调用 getTime()，getTime 中有对atom 的引用,引起atom 被观察事件。
 *    启动startTicking() 引起 tick() 定时执行，tick() 引起 atom 变化，触发getTime 再次被调用。
 * 不再被观察时 stopTicking()
 *    点击按钮，销毁两个 autorun 因此不再有对 atom 的引用。触发 stopTicking()执行。
 * 
 */


class Clock {
  atom;
  intervalHandler = null;
  currentDateTime;

  constructor() {
    // 创建一个 atom 用来和 MobX 核心算法交互
    this.atom = createAtom(
      // 第一个参数: atom 的名字，用于调试，识别区分组件
      "Clock",
      // 第二个参数(可选的): 当 atom 从未被观察到被观察时的回调函数
      () => this.startTicking(),
      // 第三个参数(可选的): 当 atom 从被观察到不再被观察时的回调函数
      // 注意同一个 atom 在这两个状态之间转换多次
      () => this.stopTicking()
    );
  }

  getTime() {
    // 让 MobX 知道这个 observable 数据源已经使用了
    // 如果 atom 当前是被某些 reaction 观察的，那么 reportObserved 方法会返回 true
    // 如果需要的话，reportObserved 还会触发 onBecomeObserved 事件处理方法(startTicking)
    if (this.atom.reportObserved()) {
      alert(111)
      return this.currentDateTime;
    } else {
      // 显然 getTime 被调用的同时并没有 reaction 正在运行
      // 所以，没有人依赖这个值，因此 onBecomeObserved 处理方法(startTicking)不会被触发
      // 根据 atom 的性质，在这种情况下它可能会有不同的表现(像抛出错误、返回默认值等等)
      return new Date();
    }
  }

  tick() {
    this.currentDateTime = new Date();
    // 让 MobX 知道这个数据源发生了改变
    console.log('tick');
    this.atom.reportChanged();
  }

  startTicking() {
    this.tick(); // 最初的运行
    this.intervalHandler = setInterval(
      () => this.tick(),
      1000
    );
  }

  stopTicking() {
    clearInterval(this.intervalHandler);
    this.intervalHandler = null;
  }

  start = () => {
    //this.getTime();
    this.disposer1 = autorun(() => console.log('getTime1:',this.getTime()));
    this.disposer2 = autorun(() => console.log('getTime2:',this.getTime()));
  }
  stop1 = () => {
    this.disposer1();
  }
  stop2 = () => {
    this.disposer2();
  }

}


const App = inject('store')(({ store }) => {
  return (
    <div>
      <input type='button' defaultValue='开始计时' onClick={store.start} />
      <input type='button' defaultValue='停止1' onClick={store.stop1} />
      <input type='button' defaultValue='停止2' onClick={store.stop2} />
    </div>
  );
})

export default () =>
  <Provider store={new Clock()}>
    <App />
  </Provider>

// 停止输出。如果没有人使用同一个 `clock` 的话，clock 也将停止运行。