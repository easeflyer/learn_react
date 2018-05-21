

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link } from 'react-router-dom'

// 简单的 Home 组件
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) =>{ 
    console.log(match);
    return (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)}
/**
 * 参考链接：https://segmentfault.com/a/1190000010174260#articleHeader14
 * 路由功能分析：
 * 1）从 Router 组件开始。
 * 2）Router 组件的子组件可以有 Linke 链接到具体的 Url
 * 3）子组件 Route 设置了具体的 Url 由那个组件来渲染显示。  
 * 
 * 
 */


const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

ReactDOM.render(<BasicExample />, document.getElementById('root'));