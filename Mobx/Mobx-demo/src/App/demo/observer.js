import {observer} from "mobx-react";
import React from "react";
import {observable,when,computed, autorun,action,reaction} from 'mobx';
/**
 * 参考 ：https://cn.mobx.js.org/refguide/observer-component.html
 * 如果 render 修改为：
 * <Timer timerData={timerData.secondsPassed} /> 则不会监测到变化因为 secondsPassed
 * 是一个原始类型，是不课 observable 的。可以用 observable.box 解决。
 */
var timerData = observable({
    secondsPassed: 0
});

setInterval(() => {
    timerData.secondsPassed++;
}, 1000);

@observer
class Timer extends React.Component {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
};

export default ()=>{
  return (<Timer timerData={timerData} />);
}