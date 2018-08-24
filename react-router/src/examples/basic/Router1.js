/**
 * 本案例演示了 React-Router 的基本用法。
 * 概要介绍：
 * 三个UI组件 Home, Category, Products
 * 父组件 App 里进行了路由设置。
 * 每个路径Url 对应了不同的 UI 组件。按照 React 的概念。每次渲染的仍然是 App
 * 只是根据路由组件的机制，选择渲染了不同的 UI 子组件而已。
 */

/* Import statements */
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
)

/* Products component */
const Products = () => (
  <div>
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
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
            

          </ul>
         </nav>

          {/* 下面就是定义了3个和路由相关的组件。
          如果浏览器路径匹配 path，就渲染对应的组件。仅此而已。 
          exact={true} 避免其他路由也匹配到 / (考虑模式匹配) */}
           <Route path="/" exact={true} component={Home}/>
           <Route path="/category" component={Category}/>
           <Route path="/products" component={Products}/>
           {/* 请注意下面的路由组件，不应该被渲染，Router2 将会用到 Switch 解决这个问题 */}
           <Route path="/:id" render = {()=> (<p> I want this text to show up for all routes other than '/', '/products' and '/category' </p>)}/>
      </div>
    )
  }
}
/**
 * BrowserRouter
 * 浏览器路由，不是锚路由，没有 /#/ 。
 */
export default ()=>(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);