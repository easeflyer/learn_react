import React from 'react'
import { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

/**
 * 转发refs 不常用
 * http://react.html.cn/docs/forwarding-refs.html
 */


/**
 * 可以转发
 */
const FancyButton = React.forwardRef((props, ref) => (
    <div>
        <input ref={ref} />
        <button className="FancyButton">
            {props.children}
        </button>
    </div>
));

// 普通组件做不到。
const FancyButton1 = props => (
    <div>
        <input ref={props.ref} />
        <button className="FancyButton">
            {props.children}
        </button>
    </div>
)



function App() {
    const ref = React.createRef();
    return <div>
        <FancyButton ref={ref}>Click me!</FancyButton>
        <button onClick={() => console.log(ref.current)}>获得焦点</button>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));