import React from 'react'
import { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

/**
 * 知识点：
 *   - forwardRef 的基础概念，返回一个组件。
 *   - 把他收到的 ref 转发给 子组件。
 * 
 * 转发refs 不常用
 * Ref 转发是一种自动将 ref 通过组件传递给子组件的技术
 * 
 * Ref 转发是一种选择性加入的功能，可让某些组件接收他们收到的 ref，
 * 并将其向下传递（换句话说，“转发”）给孩子。
 * http://react.html.cn/docs/forwarding-refs.html
 * 
 * 
 * 
 */


/**
 * 可以转发
 */
const FancyButton1 = React.forwardRef((props, ref) => (
    <div>
        <input ref={ref} />
        <button className="FancyButton">
            {props.children}
        </button>
    </div>
));

// 普通组件做不到。
const FancyButton = props => (
    <div>
        <input ref={props.ref} />
        <button className="FancyButton">
            {props.children}
        </button>
    </div>
)



function App() {
    const ref = React.createRef();
    const handleClick = React.useCallback(
        () => ref.current.focus(),[])
    return <div>
        <FancyButton ref={ref}>Click me!</FancyButton>
        <button onClick={handleClick}>获得焦点</button>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));