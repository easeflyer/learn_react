import { observer } from "mobx-react"
import { observable } from "mobx"
import React from 'react';

/**
 * 本地 state
 * 
 * 我们看到本地属性 secondsPassed 变化，触发了 重新render
 * 这个机制和 setState 非常类似。
 * 因此称之为 本地 state 参考：https://cn.mobx.js.org/refguide/observer-component.html
 * 可观察的局部状态。
 */


@observer
class Timer extends React.Component {
  @observable secondsPassed = 0

  componentWillMount() {
    setInterval(() => {
      this.secondsPassed++
    }, 1000)
  }

  render() {
    return (<span>Seconds passed2: {this.secondsPassed} </span>)
  }
}


export default Timer;