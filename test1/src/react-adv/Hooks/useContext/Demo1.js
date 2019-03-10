import React from "react";
import ReactDOM from 'react-dom'



/**
 * 知识点： useContext 简单案例
 * 通过 useContext 不需要用 context.consumer 就可以获得 context 传递的数据。
 */


const myContext = React.createContext()


const Com1 = props => {
    const { count, setCount } = React.useContext(myContext);
    return <div>
        {count}<br />
        <button onClick={() => setCount(count + 1)}>count+1</button>
    </div>
}




const App = props => {
    const [count, setCount] = React.useState(0);
    return (
        <myContext.Provider value={{ count, setCount }}>
            <div>
                <Com1 />
            </div>
        </myContext.Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);