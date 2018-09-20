import React from 'react';
import ReactDOM from 'react-dom'
/*
我们已经知道了如何用class 定义组件，那么这样的组件有什么好处呢？
*/

//组件的状态
//在vue中，一个根实例有状态，一旦属性发生变化，vue就会自动更新页面，react也有这样功能


//想想我们想在页面中一直刷新事件怎么做呢？

//Clock组件
function Clock(props) {
    return (
        <div>
            <p>这是定时执行渲染函数的方法</p>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

//利用ReactDOM.render()的覆盖作用，定时重新渲染元素。缺点：与普通js设计没区别，无法体现react的强大
//setInterval(tick, 1000);
//想想我们的页面是一个庞大的组件，如果仅仅为了一个时间显示，而要刷新所有与之关联的组件，成本太大了！
//而用组件的生命周期函数可以很好的解决，思路是，把这个日期显示作为属性赋值给组件，然后再用计时器改变属性
//所以，这种属性，就是组件的状态，改变属性的方法就要写在生命周期函数里面。

class Clocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };  //这就是我们所说的属性date，组件的状态对象就是state，只可以用setState更新该对象
    }

    componentDidMount() {             //顾名思义，就是已经挂载，挂载后用计时器定时更新data属性
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {      //即将卸载
        clearInterval(this.timerID);
    }

    tick() {      //该组件中需要用到方法，就直接定义在class中
        this.setState({
            date: new Date()
        });
    }

    render() {      //date更新了，如何反应到dom上？react内部会重新独立地触发组件的render函数，而不是触发ReactDOM.render()
        return (   //这里引用state对象的date属性
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.id}:{this.state.date.toLocaleTimeString()}.</h2> 
            </div>
        );
    }
}
class App extends React.Component{
    render(){
        return (     //状态的更新是相互独立的，互不影响
            <div>
                <Clocks id='1' />     
                <Clocks id='2' />
                <Clocks id='3' />
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

/*完整的组件周期 函数
componentWillMount：组件挂载之前执行，只执行一次

componentDidMount: 组件渲染完成，只执行一次

componentWillRecevieProps: 组件将要接收新的props执行

shouldComponentUpdate: 判断组件是否应该重新渲染，默认是true

componentWillUpdate: 组件将要重新渲染

componentDidUpdate: 组件重新渲染完成

componentWillUnmount: 卸载组件
*/