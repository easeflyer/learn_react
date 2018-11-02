/**
 * 这个例子是 对 redux 的一个模拟。
 * 核心概念。
 * 单独保存 Model 用于保存整个应用的 状态数据。
 * 用 connect 本例叫 ctx 函数包装一个组件。并返回新组件。
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import App1 from './controller/App1'
import App2 from './controller/App2'
import { ctx } from './model/Model';
import Model from './model/Model';

class App extends React.Component {
  render() {
    const Appctx = ctx(  (props)=><App1 model={Model.App1Model} {...props} />   );
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/app1">应用1</Link></li>
            <li><Link to="/app2">应用2</Link></li>
          </ul>
        </nav>
            <Route path="/" exact={true} render={() => <h3>home</h3>} />
            {/* <Route path="/app1" render={(props)=><App1 model={Model.App1Model} {...props} />} /> */}
            <Route path="/app1" render={()=><Appctx />} />
            <Route path="/app2" render={(props)=><App2 model={Model.App2Model} {...props} />} />
      </div>
    )
  }
}



ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root'));