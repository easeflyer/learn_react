import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import './Menu.css'

import { Drawer, List, NavBar, Icon } from 'antd-mobile';

class Menu extends React.Component {
  onMenuClick = (id) => {
      alert(id);
  }
  render() {
    //if(!this.props.open) return null; // 如果 open=false 不渲染任何东西
    // fix in codepen 这里定义了列表的内容。 注意下面的语法。List 标签之间就是一个数组。 数组又 map 构造。
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
            onClick={()=>this.onMenuClick(index)}
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png" 
          onClick={()=>this.onMenuClick(index)}
        >Category{index}</List.Item>);
      })}
    </List>);
    // 这里定义屏幕整体效果。 包括顶部导航和抽屉菜单。其中抽屉菜单的sidebar 在上面用 list 定义。
    return (
      <Drawer
        className="my-drawer"
        
        //enableDragHandle
        style={{ minHeight: document.documentElement.clientHeight }}
        //contentStyle={{ color: '#A6A6A6', textAlign: 'center', opacity:0.5,width:'0px',height:'0px' }}
        //overlayStyle={{opacity:0.1,width:'0px'}}
        sidebar={sidebar}
        open={this.props.open}
        onOpenChange={this.props.toggleMenuBar}
      >
      {this.props.content}
      </Drawer>);
  }
}

export default Menu;