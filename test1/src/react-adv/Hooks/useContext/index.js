import React from "react";
import ReactDOM from 'react-dom'
import { ContextProvider } from "./reducer";
import Counter from "./Counter";
import CounterTest from "./CounterTest";

/**
 * 知识点：
 *   - 理解 context 是什么，简要介绍机制。也是redux mobx 这些状态管理框架的基础。
 *   - 自定义 ContextProvider 封装了 context 给子组件提供了 state 和 dispatch
 *   - 子组件 Counter 利用 useContext 获得了 state 和 dispatch 的能力。
 *   - 串联知识点：定义 myContext ，使用 useReducer 传递数据，useContext 接收数据
 * 
 */




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