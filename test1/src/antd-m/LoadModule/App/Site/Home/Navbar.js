import React from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';
class Navbar extends React.Component {
    handleLeftClick = () => {
        // 点击时 显示左侧菜单。
        this.props.toggleMenuBar();
    }
    render() {
        return (
            <NavBar
                style={{ backgroundImage: 'url()' }}
                mode="dark"
                icon={<Icon type="bars" style={{ fontSize: '24px' }} />}
                onLeftClick={this.handleLeftClick}
                rightContent={[
                    <span style={{ fontSize: '12px' }}><Icon type="login" style={{ margin: '5px' }} />登录</span>,
                    <span style={{ fontSize: '12px' }}><Icon type="logout" style={{ margin: '5px' }} />注册</span>
                ]}
            >中国桥牌</NavBar>
        );
    }
}

export default Navbar;