import React from 'react'
import { useState, useCallback, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

/**
 * https://segmentfault.com/a/1190000017827094?utm_source=tag-newest
 * @param {*} props 
 * @param {*} ref 
 */

function FancyInput(props, ref) {
    const [fresh,setFresh] = useState(0)
    const attRef = useRef(0);
    useImperativeHandle(ref, () => {
        return {
            attRef,  //attRef:attRef, 
            fresh,
        }
    }, [fresh]);
    const handleClick = useCallback(() => {
        attRef.current = attRef.current + 1;
    }, []);
    return <div>
        {attRef.current}
        <button onClick={handleClick}>Fancy</button>
        <button onClick={()=>setFresh(!fresh)}>刷新</button>
    </div>
}

FancyInput = forwardRef(FancyInput);

const App = props => {
    const fancyInputRef = useRef();
    return <div>
        <FancyInput ref={fancyInputRef} />
        <hr />
        <button onClick={() => console.log(fancyInputRef.current)}>
            父组件访问子组件的实例属性</button>
    </div>
}
ReactDOM.render(<App />, document.getElementById('root'));