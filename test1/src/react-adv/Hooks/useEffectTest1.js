import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

/*
useEffect(effect)   告诉 React 在渲染后要做些什么。 
类似与：componentDidMount，componentDidUpdate

React（代码内部）将记住传递的函数(我们将把它称为 “effect” )，然后在执行DOM更新后调用它。在这种情况下，
我们设置了文档标题，但我们也可以执行数据获取或调用其他命令式API。

关注点：useEffect（匿名函数，或者命名函数） 有什么不同？
本例没有写出不同点，需要更新。
*/



function Example() {
    const [count, setCount] = useState(0);

    const effect1 = () => {
        console.log(`You clicked ${count} times`)
    }
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    /*
    参考官网，如何理解这句话？
    有经验的JavaScript开发人员可能会注意到，传递给 useEffect 的函数在每次渲染时
    都是不同的。这是故意的。实际上，这就是让我们从 effect 内部读取计数值的原因，
    而不用担心它是旧值。每次我们重新渲染，我们安排一个不同的 effect 来替换前一个。
    在某种程度上说，这使得 effect 更像是渲染结果的一部分，每个effect都属于特定的渲染。 
    在本页后面部分 我们将更清楚地看到为什么这样是有用的。
    */

    useEffect(effect1);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
      </button>
        </div>
    );
}



const App = props => <div>
    <h3>useEffect 练习1</h3>
    <Example />
</div>

ReactDOM.render(<App />, document.getElementById('root'));