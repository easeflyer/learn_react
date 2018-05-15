import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import { NavBar, Icon } from 'antd-mobile';

/**
 * NavBar 案例
 * 主要了解 左右两侧如何添加图标或文字。参考案例。
 * 左右两侧可以 放置任何 React 组件。
 */


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MyNavBar />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const MyLink = ()=>(<a style={{'color':'#FFFFFF'}} href="http://www.baidu.com">back</a>);

const MyNavBar = ()=>(
  <div>
    {/* 注意：数组元素 要有一个唯一的 key */}
    <NavBar
      mode="light"  // 浅色
      icon={<Icon type="left" />}
      onLeftClick={() => console.log('onLeftClick')}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>

    <NavBar
      mode="dark" // 深色
      leftContent={<MyLink />}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));