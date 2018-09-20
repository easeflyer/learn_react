import React from 'react';
import ReactDOM from 'react-dom';

/*react采用js来表达html模板，用ReactDOM.render()来渲染元素输出到页面
    ReactDOM.render(
            element,//你将要渲染元素的模板,只要最后这一行返回的是正确的JSX，你都可以写在这里，变量，表达式，直接定义，函数，组件
            container,//渲染元素的位置，即插入位置，必须是正确的dom节点
            [callback] //回调函数。在渲染或更新之后调用
)
同一个页面只能出现一次ReactDOM.render(),或者出现多次，只有最后一次生效。
*/

//直接定义，
ReactDOM.render(
    <h2>直接定义模板</h2>,
    document.getElementById('root'),
    () => console.log(1)//渲染后被执行
)

//将html模板赋值给变量
const ele = <h2>赋值给变量</h2>
ReactDOM.render(
    ele,
    document.getElementById('root'),
)

//html模板的写法与普通有所区别，元素的属性名采用驼峰式写法,如何在原生js中访问HTML元素的属性，就如何写
var test = <h2 className="a" id="b">驼峰式命名</h2>
//实际上，这种叫JSX的语法会被babel转化为对象，上述定义实际上是
test = React.createElement(
    'h2',
    {
        className: 'a',
        id: 'b',
    },
    '驼峰式命名'
);


//与vue类似,在JSX语法中，你可以在元素属性，元素内容中放心的插入js表达式，引用作用域内的变量和对象,这些东西要用花括号包裹
const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
ReactDOM.render(
    <h1>Hello, {user.firstName}!</h1>,
    document.getElementById('root')
);
