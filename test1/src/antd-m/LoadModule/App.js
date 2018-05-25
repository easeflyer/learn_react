import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import 'antd/dist/antd.css'; // 这一句是从哪里引入的？
import './App.css'
import { TabBar } from 'antd-mobile';
import { Site,App2 } from './App/Loadable';
import { Icon } from 'antd'
/**
 * 本页面是将来程序的入口，功能包括：
 * １）加载　loadable.js 也就是需要动态载入的所有　子程序。
 * ２）搭建一个程序最外层的框架。功能只是负责调度　子程序。
 * ３）框架由　TabBar 来搭建。注意　state 设置。
 * ４）State: 当前子程序，上一级页面等。
 */




class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true,  // 是否全屏显示
    };
  }

  renderContent(app) {
    return app;
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494" // 未选中文字颜色
          tintColor="#33A3F4"           // 选中的文字颜色
          barTintColor="white"          // 整体部分背景色
          hidden={this.state.hidden}    // 是否隐藏
        >
          <TabBar.Item                  // 子元素
            title="主页"
            key="home"
            // 未选中图标
            icon={<Icon type="home" style={{fontSize:'22px'}} />}
            // 选中图标样式
            selectedIcon={<Icon type="home" style={{fontSize:'22px'}} />}
            // 是否选中状态
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}  // 红色数字提示
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.state.selectedTab=='blueTab'?this.renderContent(<Site />):null}
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon type="rocket" style={{fontSize:'22px'}} />}
            selectedIcon={<Icon type="rocket" style={{fontSize:'22px'}} />}
            title="比赛"
            key="match"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {/*动态加载 应该考虑 在这里执行。*/}
            {this.state.selectedTab=='redTab'?this.renderContent(<App2 />):null}
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon type="form" style={{fontSize:'22px'}} />}
            selectedIcon={<Icon type="form" style={{fontSize:'22px'}} />}
            title="学习"
            key="study"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.state.selectedTab=='greenTab'?this.renderContent(<Site />):null}
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon type="user" style={{fontSize:'22px'}} />}
            selectedIcon={<Icon type="user" style={{fontSize:'22px'}} />}
            title="我"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
             {this.state.selectedTab=='yellowTab'?this.renderContent(<App2 />):null}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


ReactDOM.render(<TabBarExample />, document.getElementById('root'));