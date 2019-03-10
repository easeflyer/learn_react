import React from 'react'
import { useCallback, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

/**
 * 知识点：
 *   - 官方概念：自定义要开放给父组件的实例值。
 *   - 简要理解就是通过父组件访问子组件的实例，包括状态也可以。
 *   - 第三个个参数的作用。
 * 
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