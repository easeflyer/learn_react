import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';
//import Menu from './Menu'

class Navbar extends React.Component {
    render() {
        return (
                <NavBar
                    //style={{ backgroundImage: 'url()' }}
                    mode="dark"
                    icon={<Icon type="bars" style={{ fontSize: '24px' }} />}
                    onLeftClick={this.props.toggleMenuBar}
                    rightContent={[
                        <span key="1" style={{ fontSize: '12px' }}><Icon type="login" style={{ margin: '5px' }} />登录</span>,
                        <span key="2" style={{ fontSize: '12px' }}><Icon type="logout" style={{ margin: '5px' }} />注册</span>
                    ]}
                >中国桥牌</NavBar>
        );
    }
}

export default Navbar;