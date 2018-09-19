import React from 'react';
import ReactDOM from 'react-dom';

/**
 * setState()可以多个同时调用以提高性能,
 因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

*/
//看如下一个点击加法例子，重点在log输出位置
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            counter:0,
        }
    }
    add(){
        this.setState({
            counter:this.state.counter+1           
        })
        this.setState({
            counter:this.state.counter+this.props.num        //你无法对同一个状态属性多次改变，只能最后一次生效
        })        
        console.log(this.state.counter)        //当点击触发的时候，这个时候，counter已经改变了，但是打印的仍然是以前的值
    }
    render(){
        return (
            <div>
                {this.state.counter}
                <button onClick={this.add.bind(this)}></button>
            </div>
        )
    }
}
ReactDOM.render(
    <App num={2} />,
    document.getElementById('root')
)



class Apps extends React.Component{
    constructor(props){
        super(props);
        this.state={
            counter:0,
        }
    }
    add(){
        this.setState(function(prestate,props){
            return {
                counter:prestate.counter+this.props.num 
            }
        })
        this.setState(function(prestate,props){
            console.log(prestate.counter)           //现在已经正常，也就是说，我们可以用这种函数的方式，获得setState上步更新后的状态
        })
              
    }
    render(){
        return (
            <div>
                {this.state.counter}
                <button onClick={this.add.bind(this)}></button>
            </div>
        )
    }
}
ReactDOM.render(
    <Apps num={2} />,
    document.getElementById('root')
)