import React from 'react';
import ReactDOM from 'react-dom';

const numbers = [1, 2, 3, 4, 5];

// 更好的方法 numbers.map 遍历 numbers 每个元素都应用后面的函数做处理。
const listItems = numbers.map((number) =>
    <li>{number}</li>
);

// 传统 循环的方法
const listItems1 = []
for (var i in numbers) {
    listItems1.push(<li>{i + i}</li>)
}


// 把列表做成组件，方便复用
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}




ReactDOM.render(
    <div>
        <ul>{listItems}</ul>
        <ul>{listItems1}</ul>
        List component：
        <NumberList numbers={numbers} />
    </div>,
    document.getElementById('root')
);