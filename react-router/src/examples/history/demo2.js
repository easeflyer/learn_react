/**
 * 本例 结合 react-router 案例 Router2 学习理解 history 对象。
 * 注意 react-router 已经集成了 history 因此不需要再单独创建。
 */

/* Import statements */
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import createHistory from "history/createBrowserHistory"

/**
 * 监听 listen
 * 在 Home 组件中 设置了监听。当检测到history 发生变化的时候，执行回调。
 * 回调方法中输出了当前的 action 以及 当前的 location。
 * 点击除了 Home 之外的，其他链接可以看到变化。点击浏览器前进后退，也可以。
 */
const Home = (props) => {
  const history = props.history;
  const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log('listen:', action, location.pathname, location.state)
  })

  return <div>
    {console.log('history category:', props.history)}
    {/* {history.push(history.location)} */}
    <h2>Home</h2>
  </div>
}

/* Category component */
const Category = (props) => (
  <div>
    {console.log('history category:', props.history)}
    {/* {history.push(history.location)} */}
    <h2>Category</h2>
  </div>
)

/* Products component */
const Products = (props) => (
  <div>
    {console.log('history category:', props.history)}
    {/* {history.push(history.location)} */}
    <h2>Products</h2>
  </div>
)



/* App component */
class App extends React.Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">

            /* Link components are used for linking to other views */
            <li><Link to="/">Homes</Link></li>
            <li><Link to={{ pathname: "/category", state: { from: this.props.location } }}>Category</Link></li>
            <li><Link to="/products">Products</Link></li>


          </ul>
        </nav>

        {/* 下面就是定义了3个和路由相关的组件。
          如果浏览器路径匹配 path，就渲染对应的组件。仅此而已。 
          exact={true} 避免其他路由也匹配到 / (考虑模式匹配) */}
        <Route path="/" exact={true} component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/products" component={Products} />
        {/* 请注意下面的路由组件，不应该被渲染，Router2 将会用到 Switch 解决这个问题 */}
        <Route path="/:id" render={() => (<p> I want this text to show up for all routes other than '/', '/products' and '/category' </p>)} />
      </div>
    )
  }
}
/**
 * BrowserRouter
 * 浏览器路由，不是锚路由，没有 /#/ 。
 */
export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);