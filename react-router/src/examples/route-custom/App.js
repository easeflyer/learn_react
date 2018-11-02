import React, { Component } from "react";
import { Redirect, Link, Route, Switch } from "react-router-dom";
import Category from "./Category";
import Products from "./Products";
import Login, { fakeAuth } from "./Login";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/admin">Admin area</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/category" component={Category} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/products" component={Products} />
        </Switch>
      </div>
    );
  }
}

/**
 * 私有路由 （受权限保护的路由，没有权限无法访问）
 * 封装了 Route
 * 
 * 注意对象解构语法：
 * { component: Component, ...rest } = 对象
 * 则对象中必须有一个同名属性 component 值赋值给 Component，其余复制给 ...rest
 * 所有属性 传递给 Route 通过 ...rest component 属性特殊处理。
 *    如果 fakeAuth.isAuthenticated === true 渲染 Component 否则渲染 重定向
 * 
 * 分析理解：
 *    PrivateRoute 就是对 Route 的一个封装。可以认为他就是 Route。
 *    只是做了一些判断：根据 fakeAuth.isAuthenticated 渲染不同的组件。
 *    那么跳转 /login 的时候 肯定是从 /admin 来的。
 * 
 * <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
 *    用 pathname 替换 history 的当前路径。
 *    用 state 保存 从哪里来的。 /login 页面可以通过 props.location.state 获得。
 * 
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (<Component {...props} />) :
          (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
      }
    />
  );
};


// 以下是两个纯 UI 组件
//Home component
const Home = props => (
  <div>
    <h2>Home {console.log(props)}</h2>
  </div>
);

//Admin component
const Admin = (props) => {
  console.log('Admin.props:', props)
  return (
    <div>
      {" "}
      <h2>Welcome admin </h2>
    </div>
  );
};


export default App;
