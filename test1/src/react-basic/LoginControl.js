import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 条件渲染：根据状态变化只渲染其中一部分
 * 
 * 
 */


// 定义两个 问候子组件
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}
// 问候父组件 根据 isLoggedIn 判断显示那个 问候子组件
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

// 登录按钮
// onClick handle 由自己的属性提供
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
// 登出按钮 
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}


// 登录控制组件 整个逻辑的父组件控制部分
class LoginControl extends React.Component {
    /**
     * 构造函数
     * 注意两个事件处理函数用 bind 绑定this 否则组件无法获得 this
     */
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false }; // 组件状态，用于切换登录状态
    }

    handleLoginClick() {
        // 注意这里 this 就是 LoginControl 组件，需要在构造函数中 bind
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        // Greeting 组件 根据组件状态 现实不同的子组件。
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);

