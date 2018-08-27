import React from 'react';
import ReactDOM from 'react-dom'
/*如何定义组件 */


//通过函数定义组件

//函数名必须为大写开头，小写会被解析为普通函数
function add() {
    return <h2>hello wrold</h2>
}

//这才是正确的函数式组件
function Add() {
    return <h2>hello wrold</h2>   //返回渲染的内容
}

//组件的用法
ReactDOM.render(
    <Add />,//这种奇怪的写法就是JSX元素，是用户自定义的组件。/之前的空格不是必须的
    document.getElementById('root'),
)

//这种jsx元素与HTML元素的行为类似，可以添加特有属性，如：
//<Add user={...} data={...} /> 是不是和HTML类似？但是与HTML属性的获取方法是不同的，
//他的这些属性，会被赋值给props对象。props对象，在组件定义时是可以访问的

function App(props) {     //必须要在参数中传入props，这样就可以任意访问
    return <h2>hello wrold,props is {props.data}</h2>
}
ReactDOM.render(
    <App data={1} />,
    document.getElementById('root'),
)

//以上定义组件的方法都是构造函数，还有一种更为完善的方法就是es6的class继承
//es6学习参考：http://es6.ruanyifeng.com/
//这种定义方式，可以让组件有生命周期函数，功能更加丰富

class Apps extends React.Component {
    constructor(props) {  //基础构造函数，如果不定义它，会有一个默认的构造函数。props与函数组件中的相同
        super(props);//必须执行！！必须调用父类的构造函数！！
    }               //不要加逗号
    render() {        //渲染的内容，等价于函数组件的返回值，每当组件需要更新的时候，会触发该函数
        return (    //在这里，你可以返回jsx模板，rect组件，Fragment(片段)，Portals(插槽),你甚至可以返回字符转和数字，布尔值和null
            <h2>class关键字定义组件</h2>
        )
    }
}
ReactDOM.render(
    <Apps data={1} />,
    document.getElementById('root'),
)

//这种定义方式，组件会有生命周期函数，以及其他功能

