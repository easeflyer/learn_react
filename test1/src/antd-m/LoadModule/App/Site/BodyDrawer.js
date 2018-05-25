import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import './BodyDrawer.css'
import Home from './Home/Index'
import Test from './Test/Index2'
import Navbar from './Navbar'

import { Drawer, List } from 'antd-mobile';
import { Icon } from 'antd'

/**
 * BodyDrawer 是整个网站的外层包裹。
 *  sidebar 抽屉菜单
 *  menu  菜单，包括 text菜单标题，icon 菜单图标，page 菜单对应的组件
 * 
 * children: 就是所有放入抽屉的内容。考虑应该和抽屉的菜单对应起来。
 * 
 */


class BodyDrawer extends React.Component {
    state = {
        page: 0, // 默认显示第一页
        open: false
    }
    onMenuClick = (id) => {
        //alert("点击菜单："+id);
        this.setState({
            page: id
        });
        this.toggleMenuBar();
    }
    toggleMenuBar = () => {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        // 根据点击的菜单不同，渲染不同的页面内容。这里考虑页面内容，应该动态加载。
        const menu = [
            { text: '主页',     icon: <Icon type="home" />,             page:<Home /> },
            { text: '加入会员', icon: <Icon type="user-add" />,         page:<Home /> },
            { text: '大型赛事', icon: <Icon type="trophy" />,           page:<h1>page1</h1> },
            { text: '积分赛',   icon: <Icon type="coffee" />,           page:<h1>page2</h1> },
            { text: '青年桥牌', icon: <Icon type="contacts" />,         page:<h1>page3</h1> },
            { text: '俱乐部',   icon: <Icon type="usergroup-add" />,    page:<h1>page4</h1> },
            { text: '学习资料', icon: <Icon type="solution" />,         page:<h1>page5</h1> },
            { text: '测试页',   icon: <Icon type="solution" />,         page:<Test /> },
        ]
        //if(!this.props.open) return null; // 如果 open=false 不渲染任何东西（没用了）
        // fix in codepen 这里定义了列表的内容。 注意下面的语法。List 标签之间就是一个数组。 数组又 map 构造。
        // 注意下面的 menu 前面的大括号。因为在 jsx 里面加入了表达式。因此需要用大括号。语法要注意。
        const sidebar = (<List>
            {menu.map((item, index) => {
                return (
                    <List.Item key={index}
                        thumb={item.icon}
                        multipleLine
                        onClick={() => this.onMenuClick(index)}
                    >{item.text}</List.Item>
                );
            })}
        </List>);
        // 这里定义屏幕整体效果。 包括顶部导航和抽屉菜单。其中抽屉菜单的sidebar 在上面用 list 定义。
        return (
            <div>
                <Navbar toggleMenuBar={this.toggleMenuBar} />
                <Drawer
                    className="my-drawer"

                    //enableDragHandle //是否开启拖拽打开
                    style={{ minHeight: document.documentElement.clientHeight-100 }}
                    //contentStyle={{ }}
                    //overlayStyle={{opacity:0.1,width:'0px'}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.toggleMenuBar}
                >
                    {menu[this.state.page].page}
                </Drawer>
            </div>
        );
    }
}

export default BodyDrawer;