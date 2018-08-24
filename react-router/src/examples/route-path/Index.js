/**
 * 本案例是对 basic 案例的逐步完善。
 * 添加了 Products 组件。包含产品列表，和产品详情。
 * 
 * 分析理解：
 * 
 * 从这个案例可以看出。react-router 和传统的浏览器路径路由既相同又有区别。
 * 相同的是：每个路径对应了浏览器的一个历史。
 * 不同的是：react 利用渲染的机制。实现了局部渲染。因此页面只有局部被刷新了。
 */

import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Products from './Products'


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)



/**
 * 嵌套路由
 * 写在子组件里面。原理和外层 是递归关系，逻辑一样。
 * match.path 和 patch.url 的使用区别。
 *    简单来说 path 用在 Route path 属性里。 url 用在 Link to 属性里
 * :name 是一个模式，并不参与匹配，而是把 对应位置的 url 当做变量保存起来，match.params.name1
 *    从 :name1 可以看出 他并不参与匹配，只用作保存。
 * 这里 Switch 似乎没用。Switch 是只渲染第1个匹配的路由。
 */
const Category = ({ match }) => {
  console.log('category:',match)
  return (<div> <ul>
    <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
    <li><Link to={`${match.url}/boots`}>Boots</Link></li>
    <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>

  </ul>
    {/* match.url : /category/boots  match.path : /category/:name 注意区分用途 */}
    {/* <Route path={`${match.path}/:name`} render={({ match }) => (<div> <h3> {match.params.name} </h3></div>)} /> */}
    <Route path={`${match.path}/:name`} render={(props) => {
      console.log('name:',props.match)
      console.log('props:',props)
      return(<div> <h3> {props.match.params.name} </h3></div>)
    }} />
    <Route path={`${match.path}/:name1`} render={({ match }) => (<div> <h3> {match.params.name1} </h3></div>)} />
  </div>)
}


/**
 * 
 */
class App extends Component {
  render() {

    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
        {/* Switch 和 switch 语句类似，只有第一个匹配的 路由被渲染。其他的不会被渲染。 */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/category" component={Category} />
          <Route path="/products" component={Products} />
        </Switch>

      </div>
    );
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