import React from 'react'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'


function TextInputWithFocusButton() {
    //const inputEl = React.createRef();
    const inputEl = React.useRef();
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };
    return (
        <React.Fragment>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </React.Fragment>
    );
}

const App = props => {
    const [count,setCount] = useState(0)
    return <div>
        {count}
        <TextInputWithFocusButton />
        <button onClick={()=>setCount(count+1)}>count+1</button>
    </div>
}
ReactDOM.render(<App />, document.getElementById('root'));