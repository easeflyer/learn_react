import React from 'react';
import ReactDOM from 'react-dom';

function ListItem(props) {
    const value = props.value;
    return (
        // 错啦！你不需要在这里指定key:
        <li>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        //错啦！元素的key应该在这里指定：
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

