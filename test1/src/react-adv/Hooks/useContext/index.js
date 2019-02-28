import React from "react";
import ReactDOM from 'react-dom'
import { ContextProvider } from "./reducer";
import Counter from "./Counter";
import CounterTest from "./CounterTest";



const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <Counter />
        <CounterTest />
      </ContextProvider>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);



/*
总结：
useReducer 就是引入类似 redux 的一种机制，实质上是 useState 的封装。
*/