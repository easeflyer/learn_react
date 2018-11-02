/**
 * controller  mvc 模式中的 c
 * 
 * 控制器 在 react 对应：“路由组件”或者“容器组件”
 * “路由组件”是 react-router 中的概念。用来控制应用间的页面逻辑。也就是组件间的关系。
 * “容器组件”是 react-redux 中引入的概念。目的是管理state，和控制逻辑。相对应的UI组件
 * UI组件则只负责 UI 展示。这样做有2个优势：可以对业务逻辑做单元测试。可以让UI组件更好的复用。
 * 
 * 在这里我们的 controller 部分，兼顾二者的功能。即是路由组件，也是容器组件。
 * index.js 中定义了 主路由（主菜单）
 * app1.js 子应用中定义其他路由。不集中定义路由，目的是尽可能拆分应用。除非无法拆分
 * 才会考虑把路由提升到父组件中。
 * 
 */

import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import Module1 from './Module1'
import {ctx} from '../model/Model'
class App2 extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    console.log('app2.props',this.props)
    const match = this.props.match;
    return (
      <div>
        <nav>
          <ul>
            <li><Link to={`${match.url}/module1`}>模块1</Link></li>
            <li><Link to={`${match.url}/module2`}>模块2</Link></li>
          </ul>
        </nav>
        <Route path={match.path} exact={true} render={() => <h3>App2</h3>} />
        <Route path={`${match.url}/module1`} component={()=><Module1 {...this.props}/>} />
        <Route path={`${match.url}/module2`} render={() => <h3>module2</h3>} />
      </div>
    )
  }
}


export default ctx(App2);