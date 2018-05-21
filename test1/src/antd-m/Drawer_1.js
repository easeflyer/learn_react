import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import './Drawer.css'

import { Drawer, List, NavBar, Icon } from 'antd-mobile';

class App1 extends React.Component {
  state = {
    open: true,
  }
  // 点击的时候 执行。
  onMenuClick = (id) => {
      alert(id);
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    // fix in codepen 这里定义了列表的内容。 注意下面的语法。List 标签之间就是一个数组。 数组又 map 构造。
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
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
    return (<div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>桥牌协会官方网站</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        //enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        Click upper-left corner
      </Drawer>
    </div>);
  }
}

ReactDOM.render(<App1 />, document.getElementById('root'));