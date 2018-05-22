import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';
import Menu from './Menu'

class Navbar extends React.Component {
    state = {
        showMenu: false,
    }
    toggleMenuBar = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    render() {
        return (
            <div>
                <NavBar
                    //style={{ backgroundImage: 'url()' }}
                    mode="dark"
                    icon={<Icon type="bars" style={{ fontSize: '24px' }} />}
                    onLeftClick={this.toggleMenuBar}
                    rightContent={[
                        <span key="1" style={{ fontSize: '12px' }}><Icon type="login" style={{ margin: '5px' }} />登录</span>,
                        <span key="2" style={{ fontSize: '12px' }}><Icon type="logout" style={{ margin: '5px' }} />注册</span>
                    ]}
                >中国桥牌</NavBar>
                <Menu open={this.state.showMenu} toggleMenuBar={this.toggleMenuBar} content={this.props.content} />
            </div>
        );
    }
}

export default Navbar;