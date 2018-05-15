import React from 'react';
import ReactDOM from 'react-dom';

function MyText(props) {
    return props.children;
}

const MyText1 = (
    <h1>
        <div>This is valid HTML &amp; JSX at the same time.</div>
    </h1>
);
// 注意 变量和 组件是不一样的。这一点，需要特别关注一下。


// 函数可以是普通函数，也可以是一个 react 组件，还可以同时具备。
function GetGreeting(props) {

    if (1) {
        return <h1>Hello, 1!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

// 展示回调函数作为 children 
// 传递到自定义组件的 children(子元素) 可以是任何内容，只要在渲染之前组件可以将其转化为 
// React 能够处理的东西即可。这种用法并不常见，但是如果你需要扩展 JSX 的话，则会非常有用。
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        // 注意这里 children 是一个回调函数。children(i) 则函数被调用，返回了一个<div 组件。
        items.push(props.children(i));
    }
    return <div name="parent">{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div name="children" key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}


ReactDOM.render(<ListOfTenThings />, document.getElementById('root'));