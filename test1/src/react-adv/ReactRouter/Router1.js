
/**
 * 参考印象笔记：React-Router
 Router             最外层容器，可选 BrowserRouter  浏览器路由，可记录历史，没有 /#/ 
Link 超链接：       浏览器导航到 to 参数。
Route 渲染组件：    浏览器Url 模式匹配 path 参数，就渲染本组件。注意有3个渲染参数。
Topics 路由UI 组件：被路由调用被渲染，注意“路由UI” 组件，因为组件和Route 耦合度高，
                    Route 将自动传入：match, location, history 等属性

match.url：         当前组件的 Url , 用于 Link
match.path:         当前组件的 path 用于 Route 的 path 是个模式
location            是个对象，当前位置对象，包含多个属性。见Api
history             注意 history 也是一个单独的组件，有单独的文档：https://github.com/ReactTraining/history
                                   history 的案例代码在 './examples/history/demo2'

history:
每个router组件创建了一个history对象，用来记录当前路径(history.location),上一步路径也存储在堆栈中。当前路径改变时，视图会重新渲染，给你一种跳转的感觉。当前路径又是如何改变的呢？history对象有history.push()和history.replace()这些方法来实现。当你点击<Link>组件会触发history.push()，使用<Redirect>则会调用history.replace()。其他方法 - 例如history.goBack()和history.goForward() - 用来根据页面的后退和前进来跳转history堆栈。
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link } from 'react-router-dom'

/**
 * Home, About 是简单的 纯UI组件
 */
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