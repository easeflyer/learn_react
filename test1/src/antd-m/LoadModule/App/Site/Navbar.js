import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';
import {session, SiteLogin} from './Common/Login'
//import Menu from './Menu'

class Navbar extends React.Component {
    
    state={
        hasLogin:false
    }
    constructor(){
        super();
        if(session.get_sid()) this.state.hasLogin = true;
    }
    handleLogout = () => {
        session.destroy();
        this.setState({hasLogin:false})
    }
    handleLogin = () => {
        const login = new SiteLogin( ()=>this.setState({hasLogin:true}) );  // 注册进来一个 callback 函数，下面登录后会调用这个回调函数。
        login.login();
        //console.log('login1111:'+JSON.stringify(l))
    }
    rightContent(){
        console.log('haslogin2.............')
        console.log(this.state.hasLogin)
        return this.state.hasLogin ? 
            <span key="2" style={{ fontSize: '12px' }}><Icon onClick={this.handleLogout} type="logout" style={{ margin: '5px' }} />退出</span> :
        [
            <span key="1" style={{ fontSize: '12px' }}><Icon onClick={this.handleLogin} type="login" style={{ margin: '5px' }} />登录</span>,
            <span key="2" style={{ fontSize: '12px' }}><Icon type="logout" style={{ margin: '5px' }} />注册</span>
        ]
    }
    render() {
        return (
                <NavBar
                    //style={{ backgroundImage: 'url()' }}
                    mode="dark"
                    icon={<Icon type="bars" style={{ fontSize: '24px' }} />}
                    onLeftClick={this.props.toggleMenuBar}
                    rightContent={this.rightContent()}
                >中国桥牌</NavBar>
        );
    }
}

export default Navbar;