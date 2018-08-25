import React from 'react';
import ReactDOM from 'react-dom';


/**jsx组件可以像对象的属性一样组合在一起，并用点来访问和引用*/
const Father = {
    Children: function Children(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}
function BlueDatePicker() {
    return <Father.Children color="blue" />;    //就像访问对象的属性一样，访问组件
}



//jsx组件的标签名可以是一个已经声明的变量，但是你不能把表达式作为标签名 ,运行请导入RuntimeComponnet.js
/*const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props) {
    // 正确！JSX 标签名可以为大写开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}*/



//字符串常量
function A() {
    return <Father.Children message="hello world" />   //这等价于<Father.Children message={'hello world'} />        
}
//jsx组件属性的默认值为true
function Aa() {
    return <Father.Children message />    //message默认为true   
}

//你可以使用...来传递整个props对象
function App1() {
    return <Father.Children firstName="Ben" lastName="Hector" />;
}

function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Father.Children {...props} />;
}

//子代，props.children特殊属性，是jsx包含标签下的所有节点
function MyText(props) {
    return props.children;//这个就是h1标签下的所有内容
}
const MyText1 = (
    <h1>
        <div>This is valid HTML &amp; JSX at the same time.</div>
    </h1>
);

//react组件可以返回数组的形式，而不用额外的元素包裹
class Ss extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        // 不需要使用额外的元素包裹数组中的元素
        return [
            // 不要忘记 key :)
            <li key="A">First item</li>,
            <li key="B">Second item</li>,
            <li key="C">Third item</li>,
        ];
    }
}


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