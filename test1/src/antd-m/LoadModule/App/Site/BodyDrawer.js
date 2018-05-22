import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import './BodyDrawer.css'
import Index from './Home/Index'
import Navbar from './Navbar'

import { Drawer, List, NavBar, Icon } from 'antd-mobile';

/**
 * BodyDrawer 是整个网站的外层包裹。
 *  sidebar 抽屉菜单
 *  page    保存所有页面内容，和抽屉菜单对应
 * 
 * children: 就是所有放入抽屉的内容。考虑应该和抽屉的菜单对应起来。
 * 
 */


class BodyDrawer extends React.Component {
    state = {
        page: 0, // 默认显示第一页
        open:false
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
        const page = [
            <Index />,
            <h1>page1</h1>,
            <h1>page2</h1>,
            <h1>page3</h1>,
        ];
        //if(!this.props.open) return null; // 如果 open=false 不渲染任何东西
        // fix in codepen 这里定义了列表的内容。 注意下面的语法。List 标签之间就是一个数组。 数组又 map 构造。
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                        onClick={() => this.onMenuClick(index)}
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                    onClick={() => this.onMenuClick(index)}
                >Category{index}</List.Item>);
            })}
        </List>);
        // 这里定义屏幕整体效果。 包括顶部导航和抽屉菜单。其中抽屉菜单的sidebar 在上面用 list 定义。
        return (
            <div>
                <Navbar toggleMenuBar={this.toggleMenuBar} />
                <Drawer
                    className="my-drawer"

                    //enableDragHandle //是否开启拖拽打开
                    style={{ minHeight: document.documentElement.clientHeight }}
                    //contentStyle={{ color: '#A6A6A6', textAlign: 'center', opacity:0.5,width:'0px',height:'0px' }}
                    //overlayStyle={{opacity:0.1,width:'0px'}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.props.toggleMenuBar}
                >
                    {page[this.state.page]}
                </Drawer>
            </div>
        );
    }
}

export default BodyDrawer;