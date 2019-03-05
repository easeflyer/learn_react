import React from 'react'
import { useState, useEffect, useLayoutEffect,useDebugValue } from 'react'
import ReactDOM from 'react-dom'

/**
 * 知识点
 * 1） useLayoutEffect
 * 2） useDebugValue
 */



/**
 * 可以把 useLayoutEffect 理解为函数组件的 componentDidMount 和 componentDidUpdate
 * 因为他们的执行时机，是一致的。
 */

function Com1() {
    useEffect(() => {
        console.log('useEffect执行....')
        return () => {
            console.log('useEffect执行 销毁....')
        }
    });
    useLayoutEffect(() => {
        console.log('useLayoutEffect执行...')
        return () => {
            console.log('useLayoutEffect执行 销毁...')
        }
    });

    return <div>
        {console.log('Com1 渲染')}
        <h2>Com1</h2>
    </div>
}



class App1 extends React.Component {
    state = { count: 0 }
    setCount = () =>{
        this.setState({count:this.state.count+1})
    }
    componentDidMount() {
        console.log('App componentDidMount')
    }
    componentDidUpdate() {
        console.log('App componentDidUpdate')
    }
    render() {
        return <div>
            <Com1 />
            {this.state.count}
            <button onClick={this.setCount}>count+1</button>
            {console.log('App 渲染')}
        </div>

    }
}
// Com1 渲染
// useLayoutEffect执行...
// App componentDidMount
// useEffect执行....


// Com1 渲染
// useLayoutEffect执行 销毁...
// useLayoutEffect执行...
// App componentDidUpdate
// useEffect执行 销毁....
// useEffect执行....



function myHook(){
    const [count, setCount] = useState(0);
    useDebugValue(count>5 ? 'count>5' : 'count<=5'); // 显示在 devtools 上面。
    const mySetCount = () =>{
        setCount(count+2);
    }
    return [count,mySetCount];
}



function App() {
    const [count, setCount] = myHook()
    return <div>
        <Com1 />
        {count}
        <button onClick={() => setCount(count + 1)}>count+1</button>
    </div>
}




ReactDOM.render(<App />, document.getElementById('root'));