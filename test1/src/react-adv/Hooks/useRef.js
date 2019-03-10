import React from 'react'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'


/**
 * 知识点 useRef
 * 
 * useRef 就是函数组件中的实例属性。 和类组件的实例属性几乎完全一致。
 * 组件生命周期中，Ref 属性始终保留。
 * 参考：https://segmentfault.com/a/1190000017827094?utm_source=tag-newest
 */

function Counter() {
    const [count, setCount] = useState(0);

    const prevCountRef = useRef(0);
    useEffect(() => {
        prevCountRef.current = count;
        console.log("我后执行")
    });
    const prevCount = prevCountRef.current;

    return <div>
        <h1>Now: {count}, before: {prevCount}</h1>
        {console.log("我先执行")}
        <button onClick={() => setCount(count + 1)}>更新count</button>
    </div>;
}

class Counter1 extends React.Component {
    state = { count: 0 };
    prevCount = 0;
    componentDidUpdate() {
        console.log("我后执行")
        this.prevCount = this.state.count;
    }
    render() {
        return <div>
            <h1>Now: {this.state.count}, before: {this.prevCount}</h1>
            {console.log("我先执行")}
            <button onClick={() => this.setState({count:this.state.count+1})}>
            更新count</button>
        </div>;

    }
}





const Ref = { current: null };

function Counter2() {
    const [count, setCount] = useState(0);

    const prevCountRef = Ref;
    useEffect(() => {
        prevCountRef.current = count;
        console.log("我后执行")
    });
    const prevCount = prevCountRef.current;

    return <div>
        <h1>Now: {count}, before: {prevCount}</h1>
        {console.log("我先执行")}
        <button onClick={() => setCount(count + 1)}>更新count</button>
    </div>;
}




/**
 * 
 * 注意：Counter 中 useRef 保留在函数组件的整个生命周期中。
 * 而Counter1 中 Ref 是个全局变量。组件卸载数值依然不变。
 * 总结useRef
 * 
 * 在函数组件的生命周期中，始终始终保留。可以理解为 类的实例属性。如果不实用useRef 函数组件刷新。
 * 则所有函数内变量都被更新。
 */

const App = props => {
    const [show, setShow] = useState(1)
    return <div>
        {show ? <Counter /> : null}
        <hr />
        {show ? <Counter1 /> : null}
        <hr />
        {show ? <Counter2 /> : null}
        <hr />
        <button onClick={() => setShow(!show)}>重新挂载</button>
    </div>
}
ReactDOM.render(<App />, document.getElementById('root'));