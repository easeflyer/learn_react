import React from 'react';
import ReactDOM from 'react-dom';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        // 注意这里 给 handleClick bind 了this 因为他是个
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 注意这里 传入 setState 一个箭头函数，目的是：
        // 1) 解决切换时的当前状态
        // 2) 通过箭头函数传入旧状态，可以保证状态更新的顺序，因为状态是异步更新的。
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        alert(this)
    }
    func1(){
        alert(this);
    }
    render() {
        return (
            <div>
                {/* 注意这里 使用 this.handleClick 则构造函数必须 bind(this) 否则 handleClick函数中无法获得正确的this引用
                    或者用下面 箭头函数的方式也可以。<a onClick="func()" >aaaa</a>
                */}
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                <button onClick={()=>this.func1()}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);

