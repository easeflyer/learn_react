import React from 'react'
import { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

/**
 * https://segmentfault.com/a/1190000017827094?utm_source=tag-newest
 * @param {*} props 
 * @param {*} ref 
 */

function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
/**
 * 括号中的 FancyInput 是一个渲染函数。并非函数组件。
 * 目的就是用于 forwardRef 的参数。 返回的 FancyInput 是具备 forwardRef 功能的。函数组件。
 * 也就是下面使用中可以 传递 refs 的 组件。
 */
FancyInput = forwardRef(FancyInput);




const App = props => {
    const fancyInputRef = useRef();
    return <div>
        <FancyInput ref={fancyInputRef} />
        <hr />
        <button onClick={() => fancyInputRef.current.focus()}>父组件调用子组件的 focus</button>
    </div>
}
ReactDOM.render(<App />, document.getElementById('root'));